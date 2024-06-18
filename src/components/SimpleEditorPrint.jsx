import React, { useState, useEffect } from "react";
import { PrintDrawer } from '@oce-editor-tools/mui-core';
import DOMPurify from 'dompurify';
import { 
    useUsfmPreviewRenderer, 
    renderStyles as renderStylesLtr, 
    renderStylesRtl 
  } from "@oce-editor-tools/base"
import { useLocation, Link } from 'react-router-dom';
import { useDetectDir } from "font-detect-rhl";
import { CircularProgress } from "@mui/material";

const pagedJsSource = `paged.polyfill.min.js`;
// const pagedJsSource = `https://unpkg.com/pagedjs/dist/paged.polyfill.js`;
// To use asset hosted here change pagedJsSource to 'paged.polyfill.min.js'

const openNewWindow = true;
// To keep print preview in the same window change to false (needed for Graphite rendering in Firefox)

export default function SimpleEditorPrint() {
  // const { } = simpleEditorPrintProps;

  const location = useLocation();
  const printData = location.state.printData;
  const usfmText = printData.usfmText;
  const quoteOrNot = printData.quoteOrNot;
  // const selectedFontName = printData.selectedFontName;
  const selectedFontId = printData.selectedFontId;
  const displayFont =  quoteOrNot + selectedFontId + quoteOrNot;
  const displayFontSize = printData.selectedFontSize;
  const displayLineHeight = printData.selectedLineHeight;
  const hehk = printData.hehk;
  const hedo = printData.hedo;
  const lamv = printData.lamv;
  const cv85 = printData.cv85;
  const cv78 = printData.cv78;
  const hamz = printData.hamz;
  const punc = printData.punc;
  const wdsp = printData.wdsp;
  const shrt = printData.shrt;
  const agca = printData.agca;

  const displayFontFeatureSettings = '"hehk"' + hehk + ', "hedo"' + hedo + ', "lamv"' + lamv + ', "cv85"' + cv85 + ', "cv78"' + cv78 + ', "hamz"' + hamz + ', "punc"' + punc + ', "wdsp"' + wdsp + ', "shrt"' + shrt + ', "agca"' + agca;

  const useDetectDirProps = { text: usfmText, isMarkup: true, ratioThreshold: 0.5 };

  const textDir = useDetectDir( useDetectDirProps );
  // To hardcode the text direction, change useDetectDir( useDetectDirProps ); above to 'ltr'; or 'rtl'; as applicable.

  const [textAlign, setTextAlign] = React.useState("left");
  useEffect(() => {
    if (textDir === "rtl") setTextAlign("right");
    // console.log(dir);
    // console.log(textAlign);
  }, [textDir, textAlign])

  const renderStyles = (textDir === 'ltr' ? renderStylesLtr : renderStylesRtl);
  
  const [isOpen,setIsOpen] = useState(false)

  const handleClick = () => setIsOpen(!isOpen)

  const renderFlags = {
    showWordAtts: false,
    showTitles: true,
    showHeadings: true,
    showIntroductions: true,
    showFootnotes: false, // explore this
    showXrefs: false, // explore this
    showParaStyles: true,
    showCharacterMarkup: false,
    showChapterLabels: true,
    showVersesLabels: true,
  }

  const { renderedData, ready } = useUsfmPreviewRenderer({ 
    usfmText,
    renderFlags,
    htmlRender: true,
    renderStyles,
  })

  // const verbose = true;

  const previewProps = {
    openPrintDrawer: isOpen && ready,
    onClosePrintDrawer: () => {
      // console.log('closePrintDrawer')
      setIsOpen(false)
    },
    onRenderContent: () => renderedData,
    canChangeAtts: false,
    canChangeColumns: true,
    pagedJsSource: pagedJsSource,
    printFont: displayFont,
    printFontSize: displayFontSize,
    printLineHeight: displayLineHeight,
    openNewWindow: openNewWindow,
  }

  return (
    <div style={{
      fontFamily: displayFont,
      fontSize: displayFontSize,
      lineHeight: displayLineHeight,
      fontFeatureSettings: displayFontFeatureSettings,
      MozFontFeatureSettings: displayFontFeatureSettings,
      WebkitFontFeatureSettings: displayFontFeatureSettings,
      textAlign: textAlign
      }}>
      { ready && (<Link to="/" state={printData}><button style={{ margin: "0 1.25em", padding: "0.75em" }}>Return to Editor</button></Link>)}
      { ready && (<button onClick={handleClick} style={{ padding: "0.75em" }}>Print preview</button>)}
      { ready ? <PrintDrawer {...previewProps} /> : <CircularProgress size={200} sx={{color: '#124116'}} />}
      { ready && (<div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(renderedData)}}/>)}
    </div>
  )
} 
