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
    returnedHehk,
    returnedHedo,
    returnedLamv,
    returnedCv85,
    returnedCv78,
    returnedHamz,
    returnedPunc,
    returnedWdsp,
    returnedShrt,
    returnedAgca,
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
    SaveFile(filePath,usfmText);
    setUsfmTextSaved(usfmText);
  };

  useEffect(() => {
    async function loadUsfm() {
      const tempPerf = usfm2perf(usfmText)
      await epiteleteHtml.sideloadPerf('XYZ', tempPerf)
      setReady(true)
    }
    if (epiteleteHtml) loadUsfm()
  }, [epiteleteHtml, usfmText])

  const dir = useDetectDir({ text: usfmText, isMarkup: true, ratioThreshold: .51 });
  const [textAlign, setTextAlign] = useState("left");
  useEffect(() => {
    if (dir === "rtl") setTextAlign("right");
  }, [dir, textAlign])

const [isDisabled, setIsDisabled] = useState(false);
const [isOpen,setIsOpen] = useState(true);
const bookId = 'XYZ';

const navigate = useNavigate();

const [selectedFontName, setSelectedFontName] = useState(returnedSelectedFontName);
const [selectedFontId, setSelectedFontId] = useState(returnedSelectedFontId);
const [quoteOrNot, setQuoteOrNot] = useState(returnedQuoteOrNot);
const [selectedFontSize, setSelectedFontSize] = useState(returnedFontSize);
const [selectedLineHeight, setSelectedLineHeight] = useState(returnedLineHeight);

const [hehk, setHehk] = useState(returnedHehk);
const [hedo, setHedo] = useState(returnedHedo);
const [lamv, setLamv] = useState(returnedLamv);
const [cv85, setCv85] = useState(returnedCv85);
const [cv78, setCv78] = useState(returnedCv78);
const [hamz, setHamz] = useState(returnedHamz);
const [punc, setPunc] = useState(returnedPunc);
const [wdsp, setWdsp] = useState(returnedWdsp);
const [shrt, setShrt] = useState(returnedShrt);
const [agca, setAgca] = useState(returnedAgca);

const selectedFontFeatureSettings = '"hehk"' + hehk + ', "hedo"' + hedo + ', "lamv"' + lamv + ', "cv85"' + cv85 + ', "cv78"' + cv78 + ', "hamz"' + hamz + ', "punc"' + punc + ', "wdsp"' + wdsp + ', "shrt"' + shrt + ', "agca"' + agca;

const printData = {
  usfmText: usfmTextSaved,
  quoteOrNot: quoteOrNot,
  selectedFontName: selectedFontName,
  selectedFontId: selectedFontId,
  selectedFontSize: selectedFontSize,
  selectedLineHeight: selectedLineHeight,
  hehk: hehk,
  hedo: hedo,
  lamv: lamv,
  cv85: cv85,
  cv78: cv78,
  hamz: hamz,
  punc: punc,
  wdsp: wdsp,
  shrt: shrt,
  agca: agca,
  filePath,
}

const handleNotSavedClick = (epiteleteHtml, bookId, link) => {
  setIsOpen(!isOpen)
  if (hasUnsavedData(epiteleteHtml, bookId)) {
    setIsDisabled(true);
  } else {
    setIsDisabled(false);
    if (link === 'print') navigate('print', { state: {printData} });
    if (link === 'usfm') navigate('usfm', { state: {printData} });
    if (link === 'open') {
      handleOpen();
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
  isDisabled,
  handlePreventClick,
  hehk,
  setHehk,
  hedo,
  setHedo,
  lamv,
  setLamv,
  cv85,
  setCv85,
  cv78,
  setCv78,
  hamz,
  setHamz,
  punc,
  setPunc,
  wdsp,
  setWdsp,
  shrt,
  setShrt,
  agca,
  setAgca,
  ...props,
};

  const onRenderToolbar = ({ items }) => [
    ...items.filter((item) => item?.key !== "alignmentBroken" ).filter((item) => item?.key !== "print"), // lock is already not applicable
    <ToolbarCustom key="custom toolbar" {...toolbarCustomProps} />
  ]

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
    ...props,
  }

  return <>{ready ? <div ref={ref} onClick={handleClick} style={{
      fontFamily: quoteOrNot + selectedFontId + quoteOrNot,
      fontFeatureSettings: selectedFontFeatureSettings,
      MozFontFeatureSettings: selectedFontFeatureSettings,
      WebkitFontFeatureSettings: selectedFontFeatureSettings,
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
    <Header 
      title={"Translatable-FF"}      
      onOpenClick={handleOpen}
    />
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
  usfmText: PropTypes.string,
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
};
