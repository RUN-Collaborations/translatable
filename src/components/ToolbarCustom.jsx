import { useState, useMemo, useEffect } from "react";
import { Grid, Typography, Box, Fab, Toolbar, Stack } from "@mui/material";
import SourceIcon from '@mui/icons-material/Source';
import CustomFont from "./FontCustom";
import ToolbarSelectFont from "./ToolbarSelectFont";
import ToolbarLineHeight from "./ToolbarLineHeight";
import ToolbarFontSize from "./ToolbarFontSize";
import ToolbarFontFeatures from "./ToolbarFontFeatures";
// import ToolbarGraphite from "./ToolbarGraphite";
import GetUsfm from "./GetUsfm";
import sx from "./ToolbarCustom.styles";
import {  openTypeEnabledFeatures, graphiteEnabledFeatures } from "font-detect-rhl";
import OpenTypeEnabledWebFontsArray from '../embeddedWebFonts/OpenTypeEnabledWebFonts.json';
import GraphiteEnabledWebFontsArray from '../embeddedWebFonts/GraphiteEnabledWebFonts.json';

import PropTypes from 'prop-types';

const keywordFont = 'sans-serif';

export default function ToolbarCustom(toolbarCustomProps) {
  const {
    selectedFontName = '',
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
    // handleGraphiteClick,
    isDisabled,
    handlePreventClick,
    fontSettings,
    setFontSettings,
    returnedFontSettings,
    featureFont,
    setFeatureFont,
    returnedFeatureFont,
    onOpenClick,
    handleGetUsfm,
    handleUsfmText,
    handleFilename,
    open = false,
    setOpen,
    loadingStatus,
    handleUsfmFileLoaded,
  } = toolbarCustomProps;
  
  const [smartFontSettings, setSmartFontSettings] = useState(false);

  /* Annapurna SIL 2.100 uses *some different* font features settings for rendering with OpenType vs. rendering with Graphite. 
   *  In Firefox use settings from graphiteEnabledFeatures instead of openTypeEnabledFeatures for Annapurna SIL 2.100.
   * Abyssinica SIL 2.201 and Padauk 5.100 render in both OpenType and Graphite using the *same* font features settings.
   *  In Firefox this is using graphiteEnabledFeatures, consistent with the 'RenderingUnknown' test result of 'RenderingGraphite'. */
  const enabledFeatures = ([...graphiteEnabledFeatures, ...openTypeEnabledFeatures.filter((name) => (name.name != 'Annapurna SIL' && name.name != 'Abyssinica SIL' && name.name != 'Padauk'))]);

  const featureArray = (assumeGraphite ? enabledFeatures : openTypeEnabledFeatures)  

  const fontIfListed = useMemo(() => featureArray.filter((name) => name?.name === selectedFontName).map(({ name }) => name),[featureArray, selectedFontName]);

  const enabledWebFonts = useMemo(() => (
    [...GraphiteEnabledWebFontsArray, ...OpenTypeEnabledWebFontsArray.filter((name) => (
      name.name != 'Annapurna SIL 2-100' && name.name != 'Abyssinica SIL 2-201' && name.name != 'Padauk 5-100'
    ))]),[]);

  // embedded font naming convention used is "name version", so we remove "version" to get just the name
  const embeddedFontIfListed = useMemo(() => 
    enabledWebFonts.filter((name) => name?.name === selectedFontName).map(
      ({ name }) => name.replace(" " + name.split(" ").pop(), ""))
    .toString(),[enabledWebFonts, selectedFontName]);

  useEffect(() => {
    if (fontIfListed.length > 0 || embeddedFontIfListed.length >0) {
      setSmartFontSettings(true);
    } else {
      setSmartFontSettings(false);
      setFontSettings([]);
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
    <button
      style={{
        height: "4.645em",
        marginTop: "0.1em",
        // margin: "0.1em auto",
      }}
      id="print"
      onClick={handlePreventClick}
    >
      <span
        style={{
          fontWeight: "bolder",
          textDecorationLine: "underline"
        }}
      >
        &nbsp;&nbsp;Print Preview&nbsp;&nbsp;
      </span>
      <br />
      <span style={{ fontSize: "95%" }}>
        {quoteOrNot}{selectedFontName}{quoteOrNot}: {selectedFontSize}
        <br />
        line height: {selectedLineHeight}
      </span>
    </button>
  );
  const printPreviewButtonOff = (
    <button
      className="disabled"
      style={{
        height: "4.645em",
        padding: "0.25em 0.5em",
        marginTop: "0.1em",
        // margin: "0.1em 0.5em auto auto",
      }}
    >
      <span
        style={{
          fontWeight: "bolder",
          textDecorationLine: "underline",
        }}
      >
        &nbsp;&nbsp;Print Preview&nbsp;&nbsp;
      </span>
      <br />
      {quoteOrNot}{selectedFontName}{quoteOrNot}: {selectedFontSize}
      <br />
      line height: {selectedLineHeight}
    </button>
  );
  const usfmEditorButton = (
    <button
      style={{
        height: "4.645em",
        marginTop: "0.1em",
        // margin: "0.1em auto",
      }}
      id="usfm"
      onClick={handlePreventClick}
    >
      USFM
      <br />
      Editor
    </button>
  );
  const usfmEditorButtonOff = (
    <button
      className="disabled"
      style={{
        height: "4.645em",
        padding: "0.25em 0.5em",
        marginTop: "0.1em",
        // margin: "0.1em auto",
      }}
    >
      USFM
      <br />
      Editor
    </button>);  

  /*
  const toolbarGraphiteProps = {
    assumeGraphite,
    handleGraphiteClick,
  }
  */
  
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
    assumeGraphite,
    featureArray,
  };

  const getUsfmProps = {
    onOpenClick,
    handleUsfmText,
    handleGetUsfm,
    handleFilename,
    open,
    setOpen,
    loadingStatus,
    handleUsfmFileLoaded,
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
                    {/** <ToolbarGraphite {...toolbarGraphiteProps} /> */}
                    {isDisabled ? printPreviewButtonOff : (<div>{printPreviewButton}</div>)}
                    {smartFontSettings && <ToolbarFontFeatures {...toolbarFontFeaturesProps} />}
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
            id="getusfm"
            disabled={isDisabled}
            sx={sx.fab}
          >
            <SourceIcon sx={sx.extendedIcon} />
          </Fab>
          <GetUsfm {...getUsfmProps} />
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
  // handleGraphiteClick: PropTypes.func,
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
  /** onOpenClick */
  onOpenClick: PropTypes.func.isRequired,
  /** handleGetUsfm */
  handleGetUsfm: PropTypes.func.isRequired,
  /** handleUsfmText */
  handleUsfmText: PropTypes.func.isRequired,
  /** handleFilename */
  handleFilename: PropTypes.func.isRequired,
  /** open */
  open: PropTypes.bool,
  /** setOpen */
  setOpen: PropTypes.func.isRequired,
  /** loadingStatus */
  loadingStatus: PropTypes.func.isRequired,
  /** handleUsfmFileLoaded */
  handleUsfmFileLoaded: PropTypes.func.isRequired,
};
