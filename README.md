[![Download from AMO](https://img.shields.io/amo/v/jump-to-audible-tabs?style=flat-square)](https://addons.mozilla.org/en-US/firefox/addon/jump-to-audible-tabs/)
[![Number of users](https://img.shields.io/amo/users/jump-to-audible-tabs?style=flat-square)](https://addons.mozilla.org/en-US/firefox/addon/jump-to-audible-tabs/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Jump to Audible Tabs
Web browser add-on. Quickly jump to a tab that is making noise. Convenient if you have many tabs/windows open.

## Features
* Jump to a tab that is making noise
* Mute all tabs that are making noise
* Jump to a tab that is muted

## Bug reports/feature requests
* Feel free to [open a new issue](https://github.com/Rainyan/jump-to-audible-tabs/issues)!

## Installation
### Firefox
* Download the add-on [from the AMO](https://addons.mozilla.org/en-US/firefox/addon/jump-to-audible-tabs/)
### Chrome/Chromium
* There is currently no Chrome Web Store page for this add-on, but you can load it manually by [downloading the latest release](https://github.com/Rainyan/jump-to-audible-tabs/releases/latest), and [following these docs](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).
* Tested on Brave and Edge, but Chrome and any other Chromium based browser should most likely work.

## Usage
### Hotkeys
This addon exposes hotkeys for cycling the recently audible tabs:
* `Alt+J` - cycle audible tabs, from the most recently audible to the least recently audible tab.
* `Shift+Alt+J` - cycle audible tabs, from the least recently audible to the most recently audible tab.

These hotkeys are modifiable from the browser's addon options.

### Toolbar icon
For Firefox, the main toolbar button is available from the *Extensions* button:

![jat_example](https://github.com/Rainyan/jump-to-audible-tabs/assets/6595066/306a4860-dbde-4561-83f7-97e9192da620)

Pressing the button will cycle backwards through the recently audible tabs. You may also pin this button to your browser toolbar for quick access, if you'd like.

### Context menu
For more control, the addon also offers a context menu with some additional options.

Right-click on any browser page or a tab (the tab context menu is currently supported by Firefox only), and choose the corresponding action from the "Jump to Audible Tabs" context menu:

![Example image of the context menu](https://user-images.githubusercontent.com/6595066/234595280-1a239852-5c34-4db2-a8c3-8a4152e7c33f.png)

The context menu only appears when there are tabs playing audio, and/or tabs that are muted.

## FAQ/Troubleshooting
* The keyboard hotkey doesn't work from Reddit tabs!
  * If you're using [RES](https://github.com/honestbleeps/Reddit-Enhancement-Suite), the default keyboard hotkeys might conflict each other. Consider rebinding either RES or this addon's hotkeys where relevant.

## Licenses
Please see the [LICENSES.md](LICENSES.md) file.

## Contribution/dev stuff
* PRs welcome (please open an issue/discussion before submitting any substantial changes)
* Currently using Manifest v2
* Code style must adhere to [Prettier](https://prettier.io/) formatting. If you don't wanna bother with installing any tooling for it, just be sure to run your final submission code through the [web playground](https://prettier.io/playground/) in order to pass the tests for your PR.
