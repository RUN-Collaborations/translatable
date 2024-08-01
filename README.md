# Translatable-FF: Translatable and Printable with Font Features (*a work in progress*)

## Project Goals
- Edit and print existing [usfm](https://ubsicap.github.io/usfm/) files
- Empower users to choose their font, font-size, line-height, and other font-features where applicable.
- Take advantage of [Graphite](https://graphite.sil.org/)-enabled smart font features in *Firefox<sup id="a1">[[1]](#f1)</sup>* including collision avoidance, spacing, and other adjustable font-specific display features.
- Engage both [Graphite](https://graphite.sil.org/) in *Firefox<sup id="a1">[[1]](#f1)</sup>* and [Open Type](https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings) character variant settings.

## Font Selection
- Font selection is offered in good faith. Please *honor* the end-user license agreements (EULA) of your fonts and ensure the font you have in mind is appropriate *for the way you plan to use it*. Here is [How To Tell If A Font Is Copyrighted & Why You Should Always Check](https://logosbynick.com/how-to-tell-if-a-font-is-copyrighted/).
- While you can type in the name of any [unicode](https://en.wikipedia.org/wiki/Unicode) font that you have locally, a dropdown list of many detected locally installed fonts will also be presented.
- Some embedded graphite-enabled fonts are also included, which fall under [SIL's Open Font License](https://openfontlicense.org/how-to-use-ofl-fonts/), or you can use your own locally installed versions.
- Line Height can be specified.
- Font Size can be specified in general, with the presented ratio of differently sized elements maintained.

## [Graphite](https://graphite.sil.org/)-enabled Smart Font Features
When Firefox is in use, user customization of smart font features is enabled with each option displayed for user selection. This allows user preferences for collision avoidance, spacing, regional character variation, and other adjustable font-specific display features when any of the following fonts are selected:
- Abyssinica SIL - many of the languages of Ethiopia and Eritrea
- Alkalami - the Kano region of Nigeria and in Niger
- Andika - comprehensive support for thousands of languages around the world written with  Latin and Cyrillic letters and their many variants, including a wide range of additional characters and symbols useful for linguistic and literacy work.
- Annapurna SIL - writing systems that use the Devanagari script
- Awami Nastaliq - wide variety of languages of South Asia, including but not limited to Urdu
- Charis SIL - wide range of languages that use the Latin and Cyrillic scripts.
- Doulos SIL - wide range of languages that use the Latin and Cyrillic scripts
- Gentium Plus - Latin, Cyrillic, and Greek scripts
- Harmattan - languages using the Arabic script in West Africa.
- Kanchenjunga - Kirat Rai script of South Asia.
- Lateef - Sindhi and other languages of southern Asia
- Ruwudu - style of writing is used by the Manga people in Niger, West Africa
- Scheherazade New - a “simplified” rendering of Arabic script, using basic - connecting glyphs but not including a wide variety of additional ligatures or contextual alternates (only the required lam-alef ligatures)
- Padauk - writing systems that use the Myanmar script.
- Tagmukay - a Shifinagh script font with support for the Tawallammat Tamajaq language

## Character Variant Settings
- Additional character variant settings for [Open Type](https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings) fonts are also planned.

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