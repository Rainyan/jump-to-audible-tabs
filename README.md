[![Download from AMO](https://img.shields.io/amo/v/jump-to-audible-tabs)](https://addons.mozilla.org/en-US/firefox/addon/jump-to-audible-tabs/)

# Jump to Audible Tabs
Firefox add-on. Quickly jump to a tab that is making noise. Convenient if you have many tabs/windows open.

## Features
* Jump to a tab that is making noise
* Mute all tabs that are making noise
* Jump to a tab that is muted

## Installation
### Firefox
* Download the add-on [from the AMO](https://addons.mozilla.org/en-US/firefox/addon/jump-to-audible-tabs/)
### Chrome/Chromium
* [Currently unsupported](https://github.com/Rainyan/jump-to-audible-tabs/issues/1), but if you are a developer you may be able to load it manually by following [the dev docs](https://developer.chrome.com/docs/extensions/), and substituting Chromium specific calls with Polyfill.

## Usage
Right-click on any browser page or a tab (Firefox only), and choose the corresponding action from the "Jump to Audible Tabs" context menu:

![Example image of the context menu](https://user-images.githubusercontent.com/6595066/234595280-1a239852-5c34-4db2-a8c3-8a4152e7c33f.png)

The context menu only appears when there are tabs playing audio, and/or tabs that are muted.

## Licenses
* The browser add-on code by <a href="https://github.com/Rainyan">Rain</a>, MIT License.
* Vectors and icons by <a href="https://github.com/ionic-team/ionicons?ref=svgrepo.com" target="_blank">Ionicons</a> in MIT License via <a href="https://www.svgrepo.com/" target="_blank">SVG Repo</a>.
  * Specifically using the "[Volume Mute Outline](https://www.svgrepo.com/svg/326454/volume-mute-outline)" icon, recolored.
* Any includes of [Polyfill](https://github.com/mozilla/webextension-polyfill): used under [Mozilla Public License, v. 2.0](https://github.com/mozilla/webextension-polyfill/blob/master/LICENSE).

## Contribution/dev stuff
* PRs welcome (please open an issue/discussion before submitting any substantial changes)
* Currently using Manifest v2
