# Translatable-FF: Translatable and Printable with Font Features (*a work in progress*)

## Project Goals
- Edit and print existing [usfm](https://ubsicap.github.io/usfm/) files
- Empower users to choose their font, font-size, line-height, and other font-features where applicable.
- Take advantage of [Graphite](https://graphite.sil.org/)-enabled smart font features in *Firefox<sup id="a1">[[1]](#f1)</sup>* including collision avoidance, spacing, and other adjustable font-specific display features.
- Engage both [Graphite](https://graphite.sil.org/) in *Firefox<sup id="a1">[[1]](#f1)</sup>* and [Open Type](https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings) character variant settings.

## Font Selection
- Font selection is offered in good faith. Please *honor* the end-user license agreements (EULA) of your fonts and ensure the font you have in mind is appropriate *for the way you plan to use it*. Here is [How To Tell If A Font Is Copyrighted & Why You Should Always Check](https://logosbynick.com/how-to-tell-if-a-font-is-copyrighted/).
- While you can type in the name of any [unicode](https://en.wikipedia.org/wiki/Unicode) font that you have locally, a dropdown list of many detected locally installed fonts will also be presented.
- Some embedded graphite-enabled fonts are also provided, which fall under [SIL's Open Font License](https://openfontlicense.org/how-to-use-ofl-fonts/).
- Line Height can be specified.
- Font Size can be specified in general, with the presented ratio of differently sized elements maintained.

## [Graphite](https://graphite.sil.org/)-enabled Smart Font Features
- When the Awami Nastaliq font is in use in Firefox, user customization of smart font features is enabled. This allows selection of collision avoidance, spacing, and other adjustable font-specific display features.
- Selections for other Graphite-enable fonts are planned.

## Character Variant Settings
- Character variant settings for Awami Nastaliq are available in Firefox
- Additional character variant settings for both [Graphite](https://graphite.sil.org/) and [Open Type](https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings) are planned.

## Print
- With selected font, features, size and line height.
- Portrait or Landscape
- Page sizes: A4, A5, US Letter, Trade, or Crown Quarto
- Columns: 1, 2, or 3

## USFM Editor
- **Make a backup first!**
- In the current version, upon save all words will be wrapped with placeholders for alignment markers, and any saved work will also include these in the usfm. 
- This feature is **experimental**. It exists because there is not a way to edit elements driven by usfm tags in the editor.
- Improvements for right-to-left (RTL) editing are envisioned. USFM tags are mostly left-to-right (LTR), though those start with a neutral character (/). When this character (/) is at the first character of a line, it takes on the RTL direction characteristics. In those cases it renders on the opposite side of the USFM tag from which it is written (e.g., "\v 1" for verse 1 renders as "1 \v"). The "Forced LTR USFM" buttons [here](https://codesandbox.io/p/sandbox/font-detect-rhl-usedetectdir-default-regex-2sdsmt?file=%2Fsrc%2Fcomponents%2FHighlightMatches.jsx) show room for display improvement, and the other RTL buttons show examples of the challenges of editing USFM in RTL.
- See [USFM 3.0 Specs](https://ubsicap.github.io/usfm/).

## Limitations
- Currently only a single usfm file can be opened at a time.
- USFM tags support is limited to tags supported by [oce-editor-tools-mui-core](https://oce-editor-tools-mui-core.netlify.app/) and the javascript libraries that it utilizes.
- Print does not prevent subheadings from being the last line of a column or page.
- General font-size and line-height percent settings are applied, with the relative difference between elements of different sizes fixed, and not currently customizable (e.g., titles, headings, chapter numbers, verse numbers, etc.).
- Arabic numerals (0123456789) are the only numbering system offered for chapters and verses.
- *Backup your work before using the USFM Editor and consider it to be experimental.*
- Wrapper markers are currently added by default around each word for alignment purposes. This will be included in any saved usfm files, though may not be what you want.
- Please overlook the "Edit a Graft" pop-ups over element like subheadings in read-only mode. These are only editable in edit mode.  A "graft" is a technical term here for element that is not a part of chapter and verse content.
- Not fully functional on iPadOS, iOS, or Android

## On the Drawing Board:
- Make available as a Progressive Web App
- Open a project of multiple books at at a time, rather than just a single book
- Upgrade to a Multi-lingual / localized interface

## Getting Started
- There are many good translation apps and ongoing translation app projects (e.g., [Scribe Scripture Editor](https://scribe.bible/), [Paratext](https://paratext.org/), and others). Start your projects with such an app and use them if available font features and accompanying ecosystems can work for your reality, cultural context, and writing style. For any cases where there still is a remaining gap, export your work, then open it here in Firefox to access smart font features, and see if this fits your context or augments needs.

## Endnotes <sub><sup>... [↩](#toc)</sup></sub>
[<b id="f1">1</b>] ... [Firefox](https://www.mozilla.org/) supports [Graphite](https://graphite.sil.org/). Other browsers do not yet do so, including Google Chrome, Safari, Microsoft Edge, Brave, Opera, DuckDuckGo, Vivaldi, with the notable exception of some Firefox browser forks such as [Pale Moon](https://www.palemoon.org/) though that one is not currently supported by the [OCE Editor Tools](https://github.com/RUN-Collaborations/translatable) utilized. ... [↩](#a1)