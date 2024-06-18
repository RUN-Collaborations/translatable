# Translatable-FF: Translatable and Printable with Font Features

## Project Goals
- Edit and print existing usfm files
- Let users choose their font, font-size, line-height, and other font-features where applicable.
- Leverage [Graphite](https://graphite.sil.org/)-enabled smart font features in *Firefox<sup id="a1">[[1]](#f1)</sup>* including character variants, collision avoidance, spacing, and other adjustable font-specific display features.

## Font Selection
- Font selection is offered in good faith. Please honor the end-user license agreements (EULA) of your fonts and confirm the font you have in mind is appropriate the way you plan to use it. Here is [How To Tell If A Font Is Copyrighted & Why You Should Always Check](https://logosbynick.com/how-to-tell-if-a-font-is-copyrighted/).
- While you can type in the name of any unicode font that you have locally, a dropdown list of many detected locally installed fonts will also be presented.
- Some embedded graphite-enabled fonts are also provided, which fall under [SIL's Open Font License](https://openfontlicense.org/how-to-use-ofl-fonts/).
- Line Height can be specified.
- Font Size can be specified with the presented ratio of differently sized elements maintained.

## Smart Font Features
- When the Awami Nastaliq font is in use in Firefox, user customization of smart font features is enabled. This allows selection of character variants, collision avoidance, spacing, and other adjustable font-specific display features.
- More of the same for other Graphite-enable fonts are planned.

## Print
- With selected font, features, size and line height.
- Portrait or Landscape
- Page sizes: A4, A5, US Letter, Trade, or Crown Quarto
- Columns: 1, 2, or 3

## USFM Editor
- **Make a backup first!**
- In the current version all words will be wrapped with placeholders for alignment markers, and any saved work will also include these in the usfm. 
- This feature is **experimental**. It exists because there is not a way to edit elements driven by usfm tags in the editor.
- Improvements for editing in RTL are planned. USFM tags are mostly LTR, though those start with a neutral character (/). This character (/) takes on the RTL direction characteristics thus get rendered on the opposite side of the USFM tag from which it is written. The "Forced LTR USFM" buttons [here](https://codesandbox.io/p/sandbox/font-detect-rhl-usedetectdir-default-regex-2sdsmt?file=%2Fsrc%2Fcomponents%2FHighlightMatches.jsx) show room for display improvement, and the other RTL buttons show examples of the challenges of editing USFM in RTL.
- See [USFM 3.0 Specs](https://ubsicap.github.io/usfm/).

## Limitations:
- Currently only a single usfm file can be opened at a time.
- USFM tags support is limited to tags supported by [oce-editor-tools-mui-core](https://oce-editor-tools-mui-core.netlify.app/) and the javascript libraries that it utilizes.
- Alignment marker placeholders will be added in the USFM around words that do not yet have them. This will not be what you want unless you are working with USFM that is already aligned to the original language using this method of alignment.
- Print does not prevent subheadings from being the last line of a column or page.
- General font-size and line-height percent settings are applied, with the relative difference between elements of different sizes fixed, and not currently customizable (e.g., titles, headings, chapter numbers, verse numbers, etc.).
- Arabic numerals (0123456789) are the only numbering system offered for chapters and verses.
- *Backup you work before using the USFM Editor.* It is the only way to make edits related to USFM markers such as spanning verses or adjusting paragraphs. However, there are some aspects for which usability needs to be improved, especially as it pertains to RTL translations. Please consider the USFM Editor to be experimental.
 - Wrapper markers are currently added by default around each word for alignment purposes. This will be changed in a future release to support usfm files that are not meant to be aligned.
- Undo/redo icons are currently presented in LTR order for RTL languages.

## Endnotes <sub><sup>... [↩](#toc)</sup></sub>
[<b id="f1">1</b>] ... [Firefox](https://www.mozilla.org/) supports [Graphite](https://graphite.sil.org/). Other browsers do not yet do so, including Google Chrome, Safari, Microsoft Edge, Brave, Opera, DuckDuckGo, Vivaldi, with the notable exception of some Firefox browser forks such as [Pale Moon](https://www.palemoon.org/). ... [↩](#a1)