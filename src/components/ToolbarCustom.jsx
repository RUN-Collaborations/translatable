import { useState, useMemo, useEffect } from "react";
import { Grid, Typography, Box, Fab, Toolbar, Stack } from "@mui/material";
import SourceIcon from '@mui/icons-material/Source';
import CustomFont from "./FontCustom";
import ToolbarSelectFont from "./ToolbarSelectFont";
import ToolbarLineHeight from "./ToolbarLineHeight";
import ToolbarFontSize from "./ToolbarFontSize";
import ToolbarFontFeatures from "./ToolbarFontFeatures";
import ToolbarGraphite from "./ToolbarGraphite";
import sx from "./ToolbarCustom.styles";
import graphiteEnabledFeatures from '../fontFeatures/graphiteEnabledFeatures.json';
import GraphiteEnabledWebFontsArray from '../embeddedWebFonts/GraphiteEnabledWebFonts.json';
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
  } = toolbarCustomProps;

  const [graphiteEnabledSettings, setGraphiteEnabledSettings] = useState(false);

  // embedded font naming convention used is "name version", so we remove "version" with pop to get just the name
  const embeddedFontIfListed = useMemo(() => 
    assumeGraphite &&
    GraphiteEnabledWebFontsArray.filter((name) => name?.name === selectedFontName).map(
      ({ name }) => name.replace(" " + name.split(" ").pop(), ""))
    .toString(),[assumeGraphite, selectedFontName]);

  const fontIfListed = useMemo(() => graphiteEnabledFeatures.filter((name) => name?.name === selectedFontName).map(({ name }) => name),[selectedFontName]);

  useEffect(() => {
    if (fontIfListed.length > 0 || embeddedFontIfListed.length >0) {
      setGraphiteEnabledSettings(true);
    } else {
      setGraphiteEnabledSettings(false);
      setFontSettings(null);
      setFeatureFont("");
    }
  }, [embeddedFontIfListed.length, fontIfListed.length, setFeatureFont, setFontSettings]);

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

  const toolbarGraphiteProps = {
    assumeGraphite,
    handleGraphiteClick,
  }
  
  const toolbarSelectFontProps = {
    selectedFontName,
    setSelectedFontName,
    selectedFontId,
    setSelectedFontId,
    setQuoteOrNot,
    customFont,
    setCustomFont,
    setTypeIsOn,
    assumeGraphite,
  };
  const toolbarFontSizeProps = { selectedFontSize, setSelectedFontSize };
  const toolbarLineHeightProps = { selectedLineHeight, setSelectedLineHeight };
  const toolbarFontFeaturesProps = {
    fontSettings,
    setFontSettings,
    returnedFontSettings,
    featureFont,
    setFeatureFont,
    returnedFeatureFont,
    selectedFontName,
    embeddedFontIfListed,
    selectedFontSize,
    selectedLineHeight,
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
                    <ToolbarGraphite {...toolbarGraphiteProps} />
                    {isDisabled ? printPreviewButtonOff : (<div>{printPreviewButton}</div>)}
                    {assumeGraphite && graphiteEnabledSettings && <ToolbarFontFeatures {...toolbarFontFeaturesProps} />}
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

ToolbarCustom.propTypes = {
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
  /** Assume Graphite? */
  assumeGraphite: PropTypes.bool,
  /** Handle Graphite Click */
  handleGraphiteClick: PropTypes.func,
  /** Is Disabled? */
  isDisabled: PropTypes.bool,
  /** Handle Prevent Click */
  handlePreventClick: PropTypes.func.isRequired,
  /** Font Settings Array of Objects */
  fontSettings: PropTypes.array,
  /** Set Font Settings */
  setFontSettings: PropTypes.func.isRequired,
  /** Font Settings Array of Objects Returned from Print */
  returnedFontSettings: PropTypes.array,
  /** Feature Font */
  featureFont: PropTypes.string,
  /** Set Feature Font */
  setFeatureFont: PropTypes.func,
  /** Returned Feature Font from Print */
  returnedFeatureFont: PropTypes.string,
};
