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
    "hehk": 1,
    "hedo": 0,
    "lamv": 0,
    "cv85": 0,
    "cv78": 1,
    "hamz": 0,
    "punc": 0,
    "wdsp": 2, 
    "shrt": 3,
    "agca": 3,
    "filePath": "",
  };
  const returnedUsfmText = editorData.usfmText;
  const returnedFileLoaded = (location.state ? true : false)
  const returnedQuoteOrNot = editorData.quoteOrNot;
  const returnedSelectedFontName = editorData.selectedFontName;
  const returnedSelectedFontId = editorData.selectedFontId;
  const returnedFontSize = editorData.selectedFontSize;
  const returnedLineHeight = editorData.selectedLineHeight;
  const returnedHehk = editorData.hehk;
  const returnedHedo = editorData.hedo;
  const returnedLamv = editorData.lamv;
  const returnedCv85 = editorData.cv85;
  const returnedCv78 = editorData.cv78;
  const returnedHamz = editorData.hamz;
  const returnedPunc = editorData.punc;
  const returnedWdsp = editorData.wdsp;
  const returnedShrt = editorData.shrt;
  const returnedAgca = editorData.agca;


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
  
  const handleOpen = async () => {
    setLoading(true)
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
          // console.log ("has alignment");
          setDialogType("alignment");
          setStripAlignment(false);// Consider prompting on save for an option to change to true.
        } else if ((xalnStartCount === 0 && xalnEndCount === 0) && (wStartCount !== 0 || wEndCount !== 0) && (wEmptyCount + wEmptyLemmaOnlyCount === wStartCount) && (wEmptyCount + wEmptyLemmaOnlyCount === wEndCount)) {
          // console.log ("Identified " + wEmptyCount + " empty word attribute wrappers (|\\w*), " + wEmptyLemmaOnlyCount + " empty lemma attributes (|lemma=\"\" \\w*), and 0 meaningful word attribute wrappers (\\w), with no alignment");
          setDialogType("empty word attributes"); // Prompt onOpen for user to determine stripAlignment boolean.
          setWEmptyNum(wEmptyCount);
          setWEmptyLemmaOnlyNum(wEmptyLemmaOnlyCount);
          // setOpenDialog(true); // The user will determine whether to strip word attributes.
        } else if ((xalnStartCount === 0 && xalnEndCount === 0) && (wStartCount !== 0 || wEndCount !== 0)) {
          // console.log ("has word attribute wrappers with no alignment");
          setDialogType("word attributes");
          setStripAlignment(false); // Consider prompting on save for an option to change to true.
        } else {
          // console.log ("no word attribute wrappers or alignment");
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
    setUsfmText(contents)
    setUsfmFileLoaded(true)
    setLoading(false)
  };

  const handleCancel = () => {}

  const simpleEditorProps = {
    docSetId: 'abc-xyz',
    usfmText,
    filePath: filename,
    setUsfmText: {setUsfmText},
    setUsfmFileLoaded: {setUsfmFileLoaded},
    setLoading: {setLoading},
    setFilename: {setFilename},
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
          (<Header 
            title={"Translatable-FF"}
            onOpenClick={handleOpen}
          />)}
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
                <Header 
                  title={"Translatable-FF"}
                  onOpenClick={handleOpen}
                />
              </Box>
            )}
        </Grid>
        <Dialog />
      </Box>
  )
}