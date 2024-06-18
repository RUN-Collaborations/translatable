import { useState, useMemo } from "react";
import { Grid, Typography, Box, Fab, Toolbar, Stack } from "@mui/material";
import SourceIcon from '@mui/icons-material/Source';
import { useAssumeGraphite } from "font-detect-rhl";
import CustomFont from "./FontCustom";
import ToolbarSelectFont from "./ToolbarSelectFont";
import ToolbarLineHeight from "./ToolbarLineHeight";
import ToolbarFontSize from "./ToolbarFontSize";
import ToolbarFontFeatures from "./ToolbarFontFeatures";
import sx from "./ToolbarCustom.styles";
import PropTypes from 'prop-types';

const keywordFont = 'sans-serif';

export default function ToolbarCustom(toolbarCustomProps) {
  const {
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
  } = toolbarCustomProps;

  // Are Graphite-enabled fonts applicable?
  const isGraphiteAssumed = useAssumeGraphite({});
  const isAwamiNastaliq = (selectedFontName.substring(0,14) === 'Awami Nastaliq' ? true : false);
  
  const [customFont, setCustomFont] = useState("");
  const [typeIsOn, setTypeIsOn] = useState(false);

  const customFontButton = useMemo(
    () => (
      <CustomFont
        customFont={customFont}
        setCustomFont={setCustomFont}
        typeIsOn={typeIsOn}
        setTypeIsOn={setTypeIsOn}
        selectedFontName={selectedFontName}
        selectedFontId={selectedFontId}
      />
    ),
    [customFont, typeIsOn, selectedFontName, selectedFontId]
  );

  const printPreviewButton = (
    <button style={{height: "4.645em", margin: "0.1em auto"}} id="print" onClick={handlePreventClick}>
      <span style={{ fontWeight: "bolder", textDecorationLine: "underline" }}>&nbsp;&nbsp;Print Preview&nbsp;&nbsp;</span><br /><span style={{ fontSize: "95%" }}>{quoteOrNot}{selectedFontName}{quoteOrNot}: {selectedFontSize}<br />line height: {selectedLineHeight}</span>
    </button>
  );
  const printPreviewButtonOff = (
    <button className="disabled" style={{height: "4.645em", padding: "0.25em 0.5em", margin: "0.1em 0.5em auto auto"}}>
      <span style={{ fontWeight: "bolder", textDecorationLine: "underline" }}>&nbsp;&nbsp;Print Preview&nbsp;&nbsp;</span><br />{quoteOrNot}{selectedFontName}{quoteOrNot}: {selectedFontSize}<br />line height: {selectedLineHeight}
    </button>
  );
  const usfmEditorButton = (<button style={{height: "4.645em", margin: "0.1em auto"}} id="usfm" onClick={handlePreventClick}>USFM<br />Editor</button>);
  const usfmEditorButtonOff = (<button className="disabled" style={{height: "4.645em", padding: "0.25em 0.5em", margin: "0.1em auto"}}>USFM<br />Editor</button>);  

  const toolbarSelectFontProps = {
    selectedFontName,
    setSelectedFontName,
    selectedFontId,
    setSelectedFontId,
    setQuoteOrNot,
    customFont,
    setCustomFont,
    setTypeIsOn,
  };
  const toolbarFontSizeProps = { selectedFontSize, setSelectedFontSize };
  const toolbarLineHeightProps = { selectedLineHeight, setSelectedLineHeight };
  const toolbarFontFeaturesProps = {
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
  };

  return (
    <div key="header" style={{ color: "white", backgroundColor: "#124116", minHeight: "64px", width: '100%', fontFamily: keywordFont, fontSize: '12px', lineHeight: '24px' }} >
      <Toolbar sx={{ justifyContent: "space-between" }}>  
        <div className='flex flex-1 justify-center items-center'>
          <Typography
              variant='h4'
              sx={sx.title}
          >
              Translatable-FF
          </Typography>
        </div>
        <div style={{ textAlign: "center", fontFamily: keywordFont, fontSize: '12px', lineHeight: '24px' }} key="custom-menu">
          <Grid container style={{ margin: "0 auto" }}>
            {typeIsOn && customFontButton}
            <ToolbarSelectFont {...toolbarSelectFontProps} />
            <Grid item style={{ maxWidth: 87, padding: "1.25em 0.65em" }}>
              <Stack direction="column" spacing={0.75}>
                <ToolbarFontSize  {...toolbarFontSizeProps} />
                <ToolbarLineHeight  {...toolbarLineHeightProps} />
              </Stack>
            </Grid>
            <Grid item style={{ padding: "0.5em 0 0 0" }}>
              <Box sx={{ minWidth: 275 }}>
                <Grid container spacing={1} style={{ margin: ".55em 0 0 1.25em" }}>
                  <Stack direction="row" spacing={0.75}>
                    {isDisabled ? printPreviewButtonOff : (<div>{printPreviewButton}</div>)}
                    {isGraphiteAssumed && isAwamiNastaliq && <ToolbarFontFeatures {...toolbarFontFeaturesProps} />}
                    {isDisabled ? usfmEditorButtonOff : (<div>{usfmEditorButton}</div>)}
                  </Stack>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </div>
        <>
          <Fab
            //color='primary'
            aria-label='view'
            variant='extended'
            //onClick={handleOpen}
            onClick={handlePreventClick}
            id="open"
            disabled={isDisabled}
            sx={sx.fab}
          >
            <SourceIcon sx={sx.extendedIcon} />
          </Fab>
        </>
      </Toolbar>
    </div>
  );
}

ToolbarLineHeight.propTypes = {
  /** Selected Font Name */
  selectedFontName: PropTypes.string,
  /** Set Selected Font Name */
  setSelectedFontName: PropTypes.func.isRequired,
  /** Selected Font ID */
  selectedFontId: PropTypes.string,
  /** Set Selected Font ID */
  setSelectedFontId: PropTypes.func.isRequired,
  /** To quote or not to quote */
  quoteOrNot: PropTypes.string,
  /** Set to quote or not to quote */
  setQuoteOrNot: PropTypes.func.isRequired,
  /** Selected Font Size */
  selectedFontSize: PropTypes.string,
  /** Set Selected Font Size */
  setSelectedFontSize: PropTypes.func.isRequired,
  /** Selected Line Height */
  selectedLineHeight: PropTypes.string,
  /** Set Selected Line Height */
  setSelectedLineHeight: PropTypes.func.isRequired,
  /** Is Disabled? */
  isDisabled: PropTypes.bool,
  /** Handle Prevent Click */
  handlePreventClick: PropTypes.func.isRequired,
  /** Hook on medial heh-goal */
  hehk: PropTypes.string,
  /** Set hook on medial heh-goal */
  setHehk: PropTypes.func.isRequired,
  /** Initial heh doachashmee */
  hedo: PropTypes.string,
  /** Set initial heh doachashmee */
  setHedo: PropTypes.func.isRequired,
  /** Lam with V */
  lamv: PropTypes.string,
  /** Set lam with V */
  setLamv: PropTypes.func.isRequired,
  /** Full stop */
  cv85: PropTypes.string,
  /** Set full stop */
  setCv85: PropTypes.func.isRequired,
  /** Sukun/jazm */
  cv78: PropTypes.string,
  /** Set sukun/jazm */
  setCv78: PropTypes.func.isRequired,
  /** Hamza */
  hamz: PropTypes.string,
  /** Set hamza */
  setHamz: PropTypes.func.isRequired,
  /** Punctuation */
  punc: PropTypes.string,
  /** Set punctuation */
  setPunc: PropTypes.func.isRequired,
  /** Word spacing */
  wdsp: PropTypes.string,
  /** Set word spacing */
  setWdsp: PropTypes.func.isRequired,
  /** Short forms */
  shrt: PropTypes.string,
  /** Set short forms */
  setShrt: PropTypes.func.isRequired,
  /** Collision avoidance */
  agca: PropTypes.string,
  /** Set collision avoidance */
  setAgca: PropTypes.func.isRequired,
};
