import { useState, useEffect, useMemo, useRef } from "react";
import { Editor } from '@oce-editor-tools/mui-core';
import EpiteleteHtml from "epitelete-html";
import { usfm2perf } from "../helpers/usfm2perf";
import fileDownload from 'js-file-download';
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import PropTypes from 'prop-types';
import Header from './Header';
import { hasUnsavedData } from "../helpers/hasUnsavedData";
import ToolbarCustom from "./ToolbarCustom";
import { useDetectDir } from "font-detect-rhl";
import { Redo, Undo } from '@mui/icons-material';
import { useAssumeGraphite } from "font-detect-rhl";
import { renderToString } from 'react-dom/server';

const SaveFile = (fileName,text) => {
    fileDownload(text, fileName);
}

export default function SimpleEditor(simpleEditorProps) {
  const {
    filePath,
    reference,
    onReferenceSelected,
    docSetId,
    usfmText,
    handleOpen: {handleOpen},
    handleCancel: {handleCancel},
    returnedQuoteOrNot,
    returnedSelectedFontName,
    returnedSelectedFontId,
    returnedFontSize,
    returnedLineHeight,
    returnedFontSettingsCss,
    returnedFontSettings,
    returnedFeatureFont,
    handleGetUsfm,
    handleUsfmText,
    handleFilename,
    setOpen,
    open,
    loadingStatus,
    handleUsfmFileLoaded,
    defaultOptions:{
      editable,
      sectionable,
      blockable,
      preview,
      stripAlignment: stripAlignment,
    },
    ...props
   } = simpleEditorProps;
   
  const verbose = true;
  const [ready, setReady] = useState(false);
  const epiteleteHtml = useMemo(
    () =>
      new EpiteleteHtml({
        proskomma: undefined,
        docSetId,
        options: { historySize: 100 },
        filePath,
      }),
    [docSetId, filePath]
  );

  const [usfmTextSaved, setUsfmTextSaved] = useState(usfmText);

  const onSave = (bookId, usfmText) => {
    console.log("stripAlignment before save: " + stripAlignment);
    SaveFile(filePath,usfmText);
    setUsfmTextSaved(usfmText);
    console.log("stripAlignment after save: " + stripAlignment);
  };

  useEffect(() => {
    async function loadUsfm() {
      const tempPerf = usfm2perf(usfmText)
      await epiteleteHtml.sideloadPerf('XYZ', tempPerf)
      setReady(true)
    }
    if (epiteleteHtml) loadUsfm()
  }, [epiteleteHtml, usfmText])

  const isFirefoxDetected = useAssumeGraphite({});
  const [assumeGraphite, setAssumeGraphite] = useState(isFirefoxDetected);
  const dir = useDetectDir({ text: usfmText, isMarkup: true, ratioThreshold: .51 });
  const [textAlign, setTextAlign] = useState("left");
  const [sortRedo, setSortRedo] = useState(isFirefoxDetected ? -1 : 0);
  const [sortOthers, setSortOthers] = useState(0);

  const handleGraphiteClick = () => { setAssumeGraphite(!assumeGraphite); };

  useEffect(() => {
    if (dir === "rtl") {
      setTextAlign("right");
      setSortRedo(isFirefoxDetected ? -1 : 0);
      setSortOthers(isFirefoxDetected ? 1 : -1);
    }
  }, [dir, isFirefoxDetected])

  const [isDisabled, setIsDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const bookId = 'XYZ';

  const navigate = useNavigate();

  const [selectedFontName, setSelectedFontName] = useState(returnedSelectedFontName);
  const [selectedFontId, setSelectedFontId] = useState(returnedSelectedFontId);
  const [quoteOrNot, setQuoteOrNot] = useState(returnedQuoteOrNot);
  const [selectedFontSize, setSelectedFontSize] = useState(returnedFontSize);
  const [selectedLineHeight, setSelectedLineHeight] = useState(returnedLineHeight);
  const [fontSettingsCss, setFontSettingsCss] = useState(returnedFontSettingsCss);
  const [fontSettings, setFontSettings] = useState(returnedFontSettings);
  const [featureFont, setFeatureFont] = useState(returnedFeatureFont);

  useEffect(() => {
    if (fontSettings !== null) {
      const fontSettingsJsx = fontSettings.map((obj, index) => (
        <div key={index}> ~{obj.name}~ {obj.value},</div>
      ));
      // convert jsx return to string and remove html tags and attributes (e.g., div's)
      const fontSettingsStr = renderToString(fontSettingsJsx).replace(/(<([^>]+)>)/ig, '').replace(/~/gm, '"');
      // remove the last comma, change ~ to "
      setFontSettingsCss(fontSettingsStr.substring(0, fontSettingsStr.length - 1).replace(/~/gm, '"'));
    } else {
      setFontSettingsCss("");
    }
  },[fontSettings])

  const printData = {
    usfmText: usfmTextSaved,
    quoteOrNot: quoteOrNot,
    selectedFontName: selectedFontName,
    selectedFontId: selectedFontId,
    selectedFontSize: selectedFontSize,
    selectedLineHeight: selectedLineHeight,
    fontSettingsCss: fontSettingsCss,
    fontSettings: fontSettings,
    featureFont: featureFont,
    filePath,
    stripAlignment: stripAlignment,
  }

  const handleNotSavedClick = (epiteleteHtml, bookId, link) => {
    setIsOpen(!isOpen)
    if (hasUnsavedData(epiteleteHtml, bookId)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
      if (link === 'print') navigate('print', { state: {printData} });
      if (link === 'usfm') navigate('usfm', { state: {printData} });
      if (link === 'getusfm') {
        // handleOpen(); // This is triggering file-open and the new dialog behind it.
        handleGetUsfm(true);
      }
    }
  }

  const handlePreventClick = async(event) => {
    event.preventDefault();
    const link = event.currentTarget.id;
    handleNotSavedClick(epiteleteHtml, bookId, link);
  }

  const ref = useRef(null);

  const handleClick = () => {
    // Gets "Edit a Graft" div on the 2nd click. Is there a way to get it on the 1st click so as to re-write "Edit a Graft"
      const graftEdit = document.getElementById("draggable-dialog-title");
        console.log(graftEdit)
    handleNotSavedClick(epiteleteHtml,bookId, null);
  };

  const toolbarCustomProps = {
    selectedFontName,
    setSelectedFontName,
    selectedFontId,
    setSelectedFontId,
    quoteOrNot,
    setQuoteOrNot,
    selectedFontSize,
    setSelectedFontSize,
    selectedLineHeight,
    setSelectedLineHeight,
    assumeGraphite,
    handleGraphiteClick,
    isDisabled,
    handlePreventClick,
    fontSettings,
    setFontSettings,
    returnedFontSettings,
    featureFont,
    setFeatureFont,
    returnedFeatureFont,
    onOpenClick:handleOpen,
    handleGetUsfm,
    handleUsfmText,
    handleFilename,
    open,
    setOpen,
    loadingStatus,
    handleUsfmFileLoaded,
    ...props,
  };

  const onRenderToolbar = ({items: toolbarItems}) =>
    [ toolbarItems
      .filter((item) => item?.key !== "alignmentBroken" ).filter((item) => item?.key !== "print")
      .sort((item) => (item?.index === 4) ? sortRedo : sortOthers)
      .map((item) => {
      if(item.key === "undo") {
        return {
          ...item,
          props: {
            ...item.props,
            children: [dir === 'ltr' ? <Undo key="undo" /> : <Redo key="undo" />]
          }
        }
      }
      if(item.key === "redo") {
        return {
          ...item,
          props: {
            ...item.props,
            children: [dir === 'ltr' ? <Redo key="redo" /> : <Undo key="redo" />]
          }
        }
      }
      return item
    }),
    <ToolbarCustom key="custom toolbar" {...toolbarCustomProps} />
  ];

  const editorProps = {
    epiteleteHtml,
    bookId: 'XYZ',  
    reference,
    onReferenceSelected,
    filePath,
    onSave,
    onRenderToolbar,
    verbose,
    handleOpen: {handleOpen},
    handleCancel: {handleCancel},
    defaultOptions:{
      editable,
      sectionable,
      blockable,
      preview,
      stripAlignment: stripAlignment,
    },
    ...props,
  }

  const headerProps ={
    title:"Translatable-FF",
    handleGetUsfm,
    onOpenClick:handleOpen,
    handleUsfmText,
    usfmText,
    handleFilename,
    loadingStatus,
    handleUsfmFileLoaded,
    setOpen,
    open,
  }

  return <>{ready ? <div ref={ref} onClick={handleClick} style={{
      fontFamily: quoteOrNot + selectedFontId + quoteOrNot,
      fontFeatureSettings: fontSettingsCss,
      MozFontFeatureSettings: fontSettingsCss,
      WebkitFontFeatureSettings: fontSettingsCss,
      fontSize: selectedFontSize,
      lineHeight: selectedLineHeight,
      width: "100%",
      borderColor: "blue",
      textAlign: textAlign,
    }}
  ><Editor {...editorProps} /></div> : <Box 
    sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      paddingTop: '150px',
    }}>
    <Header {...headerProps} />
    <CircularProgress size={200} sx={{color: '#124116'}} />
  </Box> }</>
}

SimpleEditor.propTypes = {
  /** File Path */
  filePath: PropTypes.string.isRequired,
  /** Reference */
  reference: PropTypes.string,
  /** Reference Selected Function */
  onReferenceSelected: PropTypes.func,
  /** Doc Set Id */
  docSetId: PropTypes.string,
  /** USFM Text */
  usfmText: PropTypes.string.isRequired,
  /** Open Object */
  handleOpen: PropTypes.object.isRequired,
  /** Cancel Object */
  handleCancel: PropTypes.object.isRequired,
  /** Quote or Not Returned from Print  */
  returnedQuoteOrNot: PropTypes.string,
  /** Selected Font Name Returned from Print  */
  returnedSelectedFontName: PropTypes.string,
  /** Selected Font ID Returned from Print  */
  returnedSelectedFontId: PropTypes.string,
  /** Font Size Returned from Print  */
  returnedFontSize: PropTypes.string,
  /** Line Height Returned from Print */
  returnedLineHeight: PropTypes.string,
  /** Font Settings CSS Returned from Print */
  returnedFontSettingsCss: PropTypes.string,
  /** Font Settings Array of Objects Returned from Print */
  returnedFontSettings: PropTypes.array,
  /** Feature Font Returned from Print */
  returnedFeatureFont: PropTypes.string,
  /** handleGetUsfm */
  handleGetUsfm: PropTypes.func.isRequired,
  /** handleUsfmText */
  handleUsfmText: PropTypes.func.isRequired,
  /** handleFilename */
  handleFilename: PropTypes.func.isRequired,
  /** setOpen */
  setOpen: PropTypes.func.isRequired,
  /** open */
  open: PropTypes.bool,
  /** loadingStatus */
  loadingStatus: PropTypes.func.isRequired,
  /** handleUsfmFileLoaded */
  handleUsfmFileLoaded: PropTypes.func.isRequired,
  /** Default Options for OCE Editor */
  defaultOptions: PropTypes.shape({
    editable: PropTypes.bool,
    sectionable: PropTypes.bool,
    blockable: PropTypes.bool,
    preview: PropTypes.bool,
    stripAlignment: PropTypes.bool,
  }),

};

SimpleEditor.defaultProps = {
  open: false,
  defaultOptions: {
    editable: false,
    sectionable: false,
    blockable: false,
    preview: true,
    stripAlignment: false,
  },
};
