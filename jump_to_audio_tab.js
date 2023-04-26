"use strict";

let AUDIBLE_TABS = [];
let MUTED_TABS = [];
let RECENT_TAB_IDS = new Set();
const EXT_TAB_ID = "jumpToAudibleTab-";
let CONTEXTS = ["page"];

function errorLog() {
  console.error(arguments);
}

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (!info.menuItemId.startsWith(EXT_TAB_ID)) {
    return;
  }
  if (AUDIBLE_TABS.length === 0 && MUTED_TABS.length === 0) {
    return;
  }

  // "Mute all tabs audible tabs" functionality
  if (info.menuItemId === `${EXT_TAB_ID}muteall`) {
    for (const aTab of AUDIBLE_TABS) {
      browser.tabs
        .update(aTab.id, {
          muted: true,
        })
        .catch((e) => {
          console.error(e);
        });
    }
    return;
  }

  let targetTabs = [];
  browser.tabs
    .query({
      active: true,
      currentWindow: true,
    })
    .catch((e) => {
      console.error(e);
      return;
    })
    .then((currentTabs) => {
      // Skip any currently active tab(s)
      targetTabs = AUDIBLE_TABS.filter((a) => {
        return currentTabs.some((b) => {
          return a.id !== b.id;
        });
      });

      const label = info.menuItemId.slice(EXT_TAB_ID.length);
      // Get last accessed audio tab
      if (label === "latest") {
        targetTabs = targetTabs.sort((a, b) => b.lastAccessed - a.lastAccessed);
      }
      // Get specific audio (or muted) tab by its tab id
      else {
        // Gotta add the muted tabs to our target pool, first.
        targetTabs = targetTabs.concat(MUTED_TABS);

        targetTabs = targetTabs.filter((a) => {
          return a.id == label;
        });
        console.assert(targetTabs.length === 0 || targetTabs.length === 1);
      }

      if (targetTabs.length === 0) {
        return;
      }

      let promises = [];
      for (const currentTab of currentTabs) {
        console.assert(typeof currentTab.id === "number");
        promises.push(
          browser.tabs.update(currentTab.id, {
            active: false,
          })
        );
      }

      let targetTabId = -1;
      Promise.all(promises)
        .catch((e) => {
          console.error(e);
        })
        .then(() => {
          for (const targetTab of targetTabs) {
            console.assert(typeof targetTab.id === "number");
            console.assert(targetTab.id > 0);
            if (!RECENT_TAB_IDS.has(targetTab.id)) {
              targetTabId = targetTab.id;
              break;
            }
          }

          browser.tabs
            .update(targetTabId, {
              active: true,
            })
            .catch((e) => {
              for (
                let i = 0, errored = false, ready = false;
                i < targetTabs.length && !ready;
                ++i
              ) {
                if (!RECENT_TAB_IDS.has(targetTabs[i])) {
                  browser.tabs
                    .update(targetTabs[i], {
                      active: true,
                    })
                    .catch((e) => {
                      errored = true;
                      RECENT_TAB_IDS.delete(targetTabs[i]);
                      AUDIBLE_TABS = AUDIBLE_TABS.filter((a) => {
                        return a.id != targetTabs[i];
                      });
                    })
                    .then(() => {
                      if (!errored) {
                        targetTabId = targetTabs[i];
                        ready = true;
                      }
                    })
                    .finally(() => {
                      console.assert(ready);
                      RECENT_TAB_IDS.add(targetTabId);
                      populateMenu();
                    });
                }
              }
            });
        })
        .then(() => {
          console.assert(targetTabId !== -1);
          browser.tabs
            .get(targetTabId)
            .catch((e) => {
              console.error(e);
            })
            .then((tab) => {
              browser.windows
                .getAll()
                .catch((e) => {
                  console.error(e);
                })
                .then((windows) => {
                  for (const [_, wnd] of Object.entries(windows)) {
                    if (wnd.id === tab.windowId) {
                      browser.windows
                        .update(wnd.id, {
                          drawAttention: true,
                          focused: true,
                        })
                        .catch((e) => {
                          console.error(e);
                        });
                      break;
                    }
                  }
                });
            });
        });
    }, errorLog);
});

function populateMenu() {
  browser.contextMenus.removeAll().then(() => {
    if (AUDIBLE_TABS.length === 0 && MUTED_TABS.length === 0) {
      return;
    }
    browser.contextMenus.create({
      id: `${EXT_TAB_ID}latest`,
      title: "Jump to latest audible tab",
      contexts: CONTEXTS,
    });
    browser.contextMenus.create({
      id: `${EXT_TAB_ID}muteall`,
      title: "Mute all audible tabs",
      contexts: CONTEXTS,
    });
    browser.contextMenus.create({
      id: `${EXT_TAB_ID}separator-1`,
      type: "separator",
      contexts: CONTEXTS,
    });

    for (const tab of AUDIBLE_TABS) {
      browser.contextMenus.create({
        id: `${EXT_TAB_ID}${tab.id}`,
        title: `${tab.title} (${tab.url})`,
        contexts: CONTEXTS,
      });
    }

    if (MUTED_TABS.length > 0) {
      browser.contextMenus.create({
        id: `${EXT_TAB_ID}mutedtabs`,
        title: "Muted tabs",
        contexts: CONTEXTS,
      });
      for (const tab of MUTED_TABS) {
        browser.contextMenus.create({
          id: `${EXT_TAB_ID}${tab.id}`,
          title: `${tab.title} (${tab.url})`,
          contexts: CONTEXTS,
          parentId: `${EXT_TAB_ID}mutedtabs`,
        });
      }
    }
  });
}

browser.runtime.onInstalled.addListener(() => {
  let promises = [];
  // As of writing this (2022/12), only Firefox supports the "tab" context,
  // so we're testing if the context works in our environment,
  // and only adding it to our menu context if so.
  //
  // TODO: could use the .catch chain syntax here(?)
  const test_contexts = ["tab"];
  for (const context of test_contexts) {
    try {
      // Wrapping in promises because we need to wait for completion.
      promises.push(
        browser.contextMenus.create({
          id: `${EXT_TAB_ID}placeholder`,
          title: "Test menu support",
          contexts: [context],
        })
      );
      CONTEXTS.push(context);
    } catch (error) {
      continue;
    }
  }

  Promise.all(promises).then(() => {
    // First remove any test menus we created while trying the test context.
    browser.contextMenus.removeAll().then(() => {
      // Then figure out any tabs already making sound.
      browser.tabs
        .query({
          audible: true,
        })
        .then((tabs) => {
          for (var tab of tabs) {
            updateAudibleTab(tab);
          }
          // Then figure out any muted tabs.
        })
        .then(() => {
          browser.tabs
            .query({
              muted: true,
            })
            .then((tabs) => {
              for (var tab of tabs) {
                updateMutedTab(tab, true);
              }
            });
          // And finally populate the real context menu.
        }, errorLog)
        .then(() => populateMenu());
    });
  });
});

function updateAudibleTab(tab) {
  // devtool tabs etc. may have the id 0, at least on Firefox
  if (tab.id === 0) {
    return;
  }
  AUDIBLE_TABS = AUDIBLE_TABS.filter((x) => {
    return x.id !== tab.id;
  });

  if (tab.audible) {
    AUDIBLE_TABS.push(tab);
  } else {
    RECENT_TAB_IDS.delete(tab.id);
  }
}

function updateMutedTab(tab, isMuted) {
  // devtool tabs etc. may have the id 0, at least on Firefox
  if (tab.id === 0) {
    return;
  }
  MUTED_TABS = MUTED_TABS.filter((x) => {
    return x.id !== tab.id;
  });

  if (isMuted) {
    MUTED_TABS.push(tab);
  }
}

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // changeInfo.audible seems unreliable, so we check with the function...
  updateAudibleTab(tab);
  // ...and on the contrary, changeInfo.mutedInfo seems more reliable
  // for this detection.
  if (changeInfo.mutedInfo) {
    updateMutedTab(tab, changeInfo.mutedInfo.muted);
  }

  populateMenu();
});

browser.tabs.onRemoved.addListener((tabId, removeInfo) => {
  AUDIBLE_TABS = AUDIBLE_TABS.filter((x) => {
    return x.id !== tabId;
  });
  RECENT_TAB_IDS.delete(tabId);
  populateMenu();
});

// browser.tabs.onReplaced.addListener((addedTabId, removedTabId) => {
//     console.log("onReplaced", addedTabId, removedTabId);
//     // TODO: does this happen anywhere relevant for us? Chromium only?
// });
