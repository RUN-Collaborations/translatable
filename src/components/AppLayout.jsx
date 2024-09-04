import { useState, useEffect, useCallback } from 'react';
import SimpleEditor from './SimpleEditor';
import { fileOpen } from 'browser-fs-access';
import Header from './Header';
import { Box, Grid, Paper } from '@mui/material';
import { scrollbarWidth } from "../helpers/ScrollbarWidth";
import { useLocation } from "react-router-dom";
import WordAttributesAndAlignment from './WordAttributesAndAlignment';

export default function AppLayout() {

  const location = useLocation();
  const editorData = location.state ? location.state : {
    "usfmText": "",
    "quoteOrNot": "",
    "selectedFontName": "monospace",
    "selectedFontId": "monospace",
    "selectedFontSize": "125%",
    "selectedLineHeight": "2.5",
    "fontSettingsCss": "",
    "fontSettings": null,
    "featureFont" : "",
    "filePath": "",
  };
  const returnedUsfmText = editorData.usfmText;
  const returnedFileLoaded = (location.state ? true : false)
  const returnedQuoteOrNot = editorData.quoteOrNot;
  const returnedSelectedFontName = editorData.selectedFontName;
  const returnedSelectedFontId = editorData.selectedFontId;
  const returnedFontSize = editorData.selectedFontSize;
  const returnedLineHeight = editorData.selectedLineHeight;
  const returnedFontSettingsCss = editorData.fontSettingsCss;
  const returnedFontSettings = editorData.fontSettings;
  const returnedFeatureFont = editorData.featureFont;
  const returnedFilePath = location.state ? editorData.filePath : 'temp.usfm';

  const [usfmText, setUsfmText] = useState(returnedUsfmText)
  const [loading, setLoading] = useState(false)
  const [usfmFileLoaded, setUsfmFileLoaded] = useState(returnedFileLoaded)
  const [filename, setFilename] = useState(returnedFilePath);
  const [dialogType, setDialogType] = useState("");
  const [wEmptyNum, setWEmptyNum] = useState(0);
  const [wEmptyLemmaOnlyNum, setWEmptyLemmaOnlyNum] = useState(0);
  const [stripAlignment, setStripAlignment] = useState(false);

  const [Dialog, decision] = WordAttributesAndAlignment(dialogType, filename, wEmptyNum, wEmptyLemmaOnlyNum,);
  
  const loadingStatus = (boolean) => {
    setLoading(boolean)
    };

  const handleFilename = (name) => {
    setFilename(name);
  }
  const handleUsfmText = (usfmContent) => {
    setUsfmText(usfmContent)
  };
  const handleUsfmFileLoaded = (boolean) => {
    setUsfmFileLoaded(boolean);
  };
  const handleGetUsfm = (boolean) => {
    setOpen(boolean);
  };

  const handleOpen = async () => {
    setLoading(true);
    const file = await fileOpen([
      {
        description: 'USFM - text files',
        mimeTypes: ['text/*'],
        extensions: ['.usfm'],
      }
    ])
    
    const xalnStartCheckRegex = /\\zaln-s /gm; // Milestone start marker
    const xalnEndCheckRegex = /\\zaln-e\\\*/gm; // Milestone end marker
    const wStartCheckRegex = /\\w /gm;
    const wEndCheckRegex = /\\w\*/gm;
    const wEmptyCheckRegex = /\|\\w\*/gm; // Empty word attribute wrappers
    const wEmptyLemmaOnlyCheckRegex = /\|lemma="" \\w\*/gm; // Empty lemma as the only word attribute.

    const filePath = file?.name
    if (filePath !== null) {
      const extStr = filePath?.substring(filePath?.lastIndexOf("."))
      if (extStr === ".usfm") {
        const contents = await file.text()
        const xalnStartMatches = contents.match(xalnStartCheckRegex);
        const xalnStartCount = xalnStartMatches?.length || 0;
        const xalnEndMatches = contents.match(xalnEndCheckRegex);
        const xalnEndCount = xalnEndMatches?.length || 0;
        const wStartMatches = contents.match(wStartCheckRegex);
        const wStartCount = wStartMatches?.length || 0;
        const wEndMatches = contents.match(wEndCheckRegex);
        const wEndCount = wEndMatches?.length || 0;
        const wEmptyMatches = contents.match(wEmptyCheckRegex);
        const wEmptyCount = wEmptyMatches?.length || 0;
        const wEmptyLemmaOnlyMatches = contents.match(wEmptyLemmaOnlyCheckRegex);
        const wEmptyLemmaOnlyCount = wEmptyLemmaOnlyMatches?.length || 0;    
        setDialogType("");
        if (xalnStartCount !== 0 || xalnEndCount !== 0) {
          // console.log("has alignment");
          setDialogType("alignment");
          setStripAlignment(false);// Consider prompting on save for an option to change to true.
        } else if ((xalnStartCount === 0 && xalnEndCount === 0) && (wStartCount !== 0 || wEndCount !== 0) && (wEmptyCount + wEmptyLemmaOnlyCount === wStartCount) && (wEmptyCount + wEmptyLemmaOnlyCount === wEndCount)) {
          // console.log("Identified " + wEmptyCount + " empty word attribute wrappers (|\\w*), " + wEmptyLemmaOnlyCount + " empty lemma attributes (|lemma=\"\" \\w*), and 0 meaningful word attribute wrappers (\\w), with no alignment");
          setDialogType("empty word attributes"); // Prompt onOpen for user to determine stripAlignment boolean.
          setWEmptyNum(wEmptyCount);
          setWEmptyLemmaOnlyNum(wEmptyLemmaOnlyCount);
          // setOpenDialog(true); // The user will determine whether to strip word attributes.
        } else if ((xalnStartCount === 0 && xalnEndCount === 0) && (wStartCount !== 0 || wEndCount !== 0)) {
          // console.log("has word attribute wrappers with no alignment");
          setDialogType("word attributes");
          setStripAlignment(false); // Consider prompting on save for an option to change to true.
        } else {
          // console.log("no word attribute wrappers or alignment");
          setDialogType("none"); // Set to stripAlignment=true onOpen without prompt; consider prompting on save.
          setStripAlignment(true); // This is to prevent the Editor component from adding empty word attributes wrappers or empty lemmas on save.
        }
        setFilename(filePath);
        const answer = await decision();
          if (answer) {
            // console.log("Yes");
            setStripAlignment(true);
            proceed(contents, filePath);
          } else {
            // console.log("No");
            setStripAlignment(false);
            proceed(contents, filePath);
          }
      } else {
        console.log("invalid file extension")
      }
    } else {
      console.log("invalid file")
    }
  };
  
  const proceed = (contents) => {
    setUsfmText(contents);
    setUsfmFileLoaded(true);
    handleGetUsfm(false);
    setLoading(false);
  };

  const handleCancel = () => {}

  const [open, setOpen] = useState(false);
  
  const simpleEditorProps = {
    docSetId: 'abc-xyz',
    usfmText,
    filePath: filename,
    handleUsfmText,
    handleUsfmFileLoaded,
    loadingStatus,
    handleFilename,
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
    setOpen,
    open,
    defaultOptions:{
      editable: false,
      sectionable: false,
      blockable: false,
      preview: true,
      stripAlignment: stripAlignment,
    },
  }
 
  const [windowSize, setWindowSize] = useState(window.innerWidth - scrollbarWidth()-2);
  // eslint-disable-next-line no-unused-vars
  const handleWindowResize = useCallback(event => {
    setWindowSize(window.innerWidth - scrollbarWidth()-2);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
        window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  const appBarAndWorkSpace = 
    <div style={{ width: windowSize }}>
      { usfmFileLoaded && <SimpleEditor {...simpleEditorProps } />}
    </div>

  const headerProps ={
    title:"Translatable-FF",
    handleGetUsfm,
    onOpenClick:handleOpen,
    handleFilename,
    handleUsfmText,
    usfmText,
    setFilename,
    loadingStatus,
    handleUsfmFileLoaded,
    setOpen,
    open,
  }

  return (
      <Box sx={{ flexGrow: 1 }}>
        <Paper
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0
          }}
          elevation={3}
        >
        {!usfmFileLoaded && !loading && 
          (<Header {...headerProps} />)}
        </Paper>
        <Grid
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            display:'block',
            margin: 0,
            padding: 0
          }}
        >
            {!loading ? appBarAndWorkSpace : (
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  paddingTop: '150px',
                }}
              >
                <Header {...headerProps} />
              </Box>
            )}
        </Grid>
        <Dialog />
      </Box>
  )
}