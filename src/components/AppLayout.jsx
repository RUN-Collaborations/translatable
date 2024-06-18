import { useState, useEffect, useCallback } from 'react';
import SimpleEditor from './SimpleEditor';
import { fileOpen } from 'browser-fs-access';
import Header from './Header';
import { Box, Grid, Paper } from '@mui/material';
import { scrollbarWidth } from "../helpers/ScrollbarWidth";
import { useLocation } from "react-router-dom";

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
  
  const handleOpen = async (
  ) => {
    setLoading(true)
    const file = await fileOpen([
      {
        description: 'USFM - text files',
        mimeTypes: ['text/*'],
        extensions: ['.usfm'],
      }
    ])
    
    const filePath = file?.name
    if (filePath !== null) {
      const extStr = filePath?.substring(filePath?.lastIndexOf("."))
      if (extStr === ".usfm") {
        const contents = await file.text()
        setUsfmText(contents)
        setUsfmFileLoaded(true)
        setLoading(false)
        setFilename(filePath)
        // console.log(filename);
      } else {
        console.log("invalid file extension")
      }
    } else {
      console.log("invalid file")
    }
  }

  const handleCancel = () => {}

  const editorProps = {
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
    }
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
      { usfmFileLoaded && <SimpleEditor {...editorProps } />}
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
    </Box>
  )
}