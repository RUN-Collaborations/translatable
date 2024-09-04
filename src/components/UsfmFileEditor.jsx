import React, {
    useState, useEffect,
  } from 'react';
//import PropTypes from 'prop-types';
  
import { UsfmEditor } from 'simple-text-editor-rcl';
import { useLocation, Link  } from 'react-router-dom';
import { useDetectDir } from "font-detect-rhl";
  
  // import OpenFile from './OpenFile';
  // import ExportFile from './ExportFile';
  // import { styles } from './UsfmFileEditor.styles';
  // import FontDropdown from './FontDropdown';
  // import FontSizeDropdown from './FontSizeDropdown';
  // import LineHeightDropdown from './LineHeightDropdown';

  export default function UsfmFileEditor() {

    const location = useLocation();
    const usfmDataIn = location.state.printData;

    const usfmTextIn = usfmDataIn.usfmText;
    const quoteOrNot = usfmDataIn.quoteOrNot;
    const selectedFontName = usfmDataIn.selectedFontName;
    const selectedFontId = usfmDataIn.selectedFontId;
    const displayFont =  quoteOrNot + selectedFontId + quoteOrNot;
    const displayFontSize = usfmDataIn.selectedFontSize;
    const displayLineHeight = usfmDataIn.selectedLineHeight;
    const fontSettingsCss = usfmDataIn.fontSettingsCss;
    const fontSettings = usfmDataIn.fontSettings;
    const featureFont = usfmDataIn.featureFont;
    const filePath = usfmDataIn.filePath;
    const stripAlignment = usfmDataIn.stripAlignment;

    const [usfmText, setUsfmText] = useState(usfmTextIn);
    
    const usfmDataOut = {
      usfmText: usfmText,
      quoteOrNot: quoteOrNot,
      selectedFontName: selectedFontName,
      selectedFontId: selectedFontId,
      selectedFontSize: displayFontSize,
      selectedLineHeight: displayLineHeight,
      fontSettingsCss: fontSettingsCss,
      featureFont: featureFont,
      fontSettings: fontSettings,
      filePath,
      stripAlignment: stripAlignment,
    }
  
    const useDetectDirProps = { text: usfmText, isMarkup: true, ratioThreshold: 0.5 };
  
    const textDir = useDetectDir( useDetectDirProps );
    // To hardcode the text direction, change useDetectDir( useDetectDirProps ); above to 'ltr'; or 'rtl'; as applicable.
  
    const [textAlign, setTextAlign] = React.useState("left");
    useEffect(() => {
      if (textDir === "rtl") setTextAlign("right");
    }, [textDir, textAlign])
  
    const [sectionIndex, setSectionIndex] = useState(1);
    const [sectionable, setSectionable] = useState(true);
    const [blockable, setBlockable] = useState(true);
    const [editable, setEditable] = useState(true);
    const [preview, setPreview] = useState(false);
  
    const onSectionable = () => { setSectionable(!sectionable); };
    const onBlockable = () => { setBlockable(!blockable); };
    const onEditable = () => { setEditable(!editable); };
    const onPreview = () => { setPreview(!preview); };
  
    const getSectionChapter = (_content) => {
      const match = /\\c *(\d+)/.exec(_content);
      const chapter = match && match[1];
      return chapter;
    };
  
    const onSectionClick = ({content: _content, index}) => {
      setSectionIndex(index);
      const chapter = getSectionChapter(_content);
      console.log('chapter: ', chapter);
    };
  
    const getBlockVerse = (_content) => {
      const match = /\\v *(\d+-?\d*)/.exec(_content);
      const verse = match && match[1];
      return verse;
    };
  
    const onBlockClick = ({content: _content, index}) => {
      const verse = getBlockVerse(_content);
      console.log('verse: ', verse);
      console.log('index: ', index);
    };
  
    const props = {
      content: usfmText,
      onContent: setUsfmText,
      options: {
        sectionable,
        blockable,
        editable,
        preview,
      },
      handlers: {
        onSectionClick,
        onBlockClick,
      },
      sectionIndex,
    };
  
    const buttons = (
      <>
        <button style={(sectionable ? {borderStyle: 'inset'} : {})} onClick={onSectionable}>Chapters (Sectionable)</button>
        <button style={(blockable ? {borderStyle: 'inset'} : {})} onClick={onBlockable}>Paragraphs (Blockable)</button>
        <button style={(editable ? {borderStyle: 'inset'} : {})} onClick={onEditable}>Editable</button>
        <button style={(preview ? {borderStyle: 'inset'} : {})} onClick={onPreview}>Preview</button>
        {(<Link to="/" state={usfmDataOut}><button style={{ margin: "0 1.25em", padding: "0.75em" }}>Return to Editor</button></Link>)}
      </>
    );
  
    return (
      <div style={{
        fontFamily: displayFont,
        fontSize: displayFontSize,
        lineHeight: displayLineHeight,
        fontFeatureSettings: fontSettingsCss,
        MozFontFeatureSettings: fontSettingsCss,
        WebkitFontFeatureSettings: fontSettingsCss,
        textAlign: textAlign
        }}>
        {buttons}
        <UsfmEditor {...props} />
        {buttons}
      </div>
    );
  }