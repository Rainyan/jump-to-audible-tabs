[![Download from AMO](https://img.shields.io/amo/v/jump-to-audible-tabs?style=flat-square)](https://addons.mozilla.org/en-US/firefox/addon/jump-to-audible-tabs/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Jump to Audible Tabs
Firefox add-on. Quickly jump to a tab that is making noise. Convenient if you have many tabs/windows open.

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
* [Currently unsupported](https://github.com/Rainyan/jump-to-audible-tabs/issues/1), but if you are a developer you may be able to load it manually by following [the dev docs](https://developer.chrome.com/docs/extensions/), and substituting Chromium specific calls with Polyfill.

## Usage
### Toolbar icon
For Firefox, the main toolbar button is available from the *Extensions* button:

![jat_example](https://github.com/Rainyan/jump-to-audible-tabs/assets/6595066/306a4860-dbde-4561-83f7-97e9192da620)

From this list, you can pin it to your browser toolbar if you'd like. Pressing the button will focus on the latest audible tab.

### Context menu
For more control, the addon also offers a context menu with some additional options.

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
* Code style must adhere to [Prettier](https://prettier.io/) formatting. If you don't wanna bother with installing any tooling for it, just be sure to run your final submission code through the [web playground](https://prettier.io/playground/) in order to pass the tests for your PR.
