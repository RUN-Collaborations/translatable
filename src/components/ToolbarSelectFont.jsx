import { useState, useEffect } from "react";
import { Grid, Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { keywordsList } from "./FontKeywords";
import {
    useDetectFonts,
    fontList as fontsArray,
    graphiteEnabledFontList as graphiteEnabledFontsArray,
  } from "font-detect-rhl";
import FontMenuItem from "./FontMenuItem";
import sx from "./ToolbarCustom.styles";
import PropTypes from 'prop-types';

import GraphiteEnabledWebFontsArray from '../embeddedWebFonts/GraphiteEnabledWebFonts.json';
import openTypeEnabledWebFontsArray from '../embeddedWebFonts/OpenTypeEnabledWebFonts.json';
import '../embeddedWebFonts/WebFonts.css';

const noneDetectedGEMsg = "none detected";
const noneDetectedMsg = "none detected";

export default function ToolbarSelectFont(ToolbarSelectFontProps) {
  const {
    selectedFontName = '',
    setSelectedFontName,
    selectedFontId = '',
    setSelectedFontId,
    setQuoteOrNot,
    customFont = '',
    setCustomFont,
    setTypeIsOn,
    assumeGraphite,
  } = ToolbarSelectFontProps;

  useEffect(() => {
    if (selectedFontName === "type font") setTypeIsOn(true);
  }, [selectedFontName, setTypeIsOn]);

  const [keywords] = useState(keywordsList);
  const found = keywords.find((element) => {
    return element.name.toLowerCase() === customFont.toLowerCase();
  });

  useEffect(() => {
    if (customFont !== "") {
      setSelectedFontName(customFont);
      setSelectedFontId(customFont);
      if (found) {
        setQuoteOrNot("");
      } else {
        setQuoteOrNot("'");
      }
    }
  }, [customFont, found, setQuoteOrNot, setSelectedFontName, setSelectedFontId]);

  const handleChange = (event) => {
    setCustomFont("");
    setSelectedFontName(event.target.value);
    setSelectedFontId(event.target.value);
    setQuoteOrNot(event.target.value === "monospace" ? "" : "'");
  };

  // Graphite-enabled web fonts use a different css id from the actual font name to avoid conflict with locally installed fonts (which could be a different version).
  const GraphiteEnabledWebFonts =
  assumeGraphite &&
  GraphiteEnabledWebFontsArray.map((font, index) => (
    <MenuItem key={index} value={font.name} dense>
      <FontMenuItem font={font} />
    </MenuItem>
  ));

  // Detecting locally installed Graphite-enabled fonts (name = id):
  const detectedGEFonts = useDetectFonts({
    fonts: assumeGraphite ? graphiteEnabledFontsArray : [],
  });

  const detectedGEFontsComponents =
    assumeGraphite &&
    detectedGEFonts.map((font, index) => (
      <MenuItem key={index} value={font.name} dense>
        <FontMenuItem font={font} />
      </MenuItem>
    ));

  /* Annapurna SIL 2.100 uses *some different* font features settings for rendering with OpenType vs. rendering with Graphite. Settings from openTypeEnabledFeatures should *not* be offered in Firefox for Annapurna SIL 2.100.
   * Abyssinica SIL 2.201 and Padauk 5.100 render in both OpenType and Graphite using the *same* font features settings. We will exclude OpenType settings in Firefox from these two fonts, consistent with the 'RenderingUnknown' test result of 'RenderingGraphite'.
   * Also note: OpenType-enabled web fonts use a different css id from the actual font name to avoid conflict with locally installed fonts (which could be a different version). */
  const openTypeEnabledWebFonts =
  openTypeEnabledWebFontsArray.filter((name) => (assumeGraphite ? (name.name != 'Annapurna SIL 2-100' && name.name != 'Abyssinica SIL 2-201' && name.name != 'Padauk 5-100') : name.name != '')).map((font, index) => (
    <MenuItem key={index} value={font.name} dense>
      <FontMenuItem font={font} />
    </MenuItem>
  ));

  /* Detecting locally installed fonts  (name = id). Exceptions listed with local Graphite-enabled fonts in Firefox */
  const adjFontsArray = fontsArray.filter((name) => 
    (assumeGraphite ? (name.name != 'Annapurna SIL' && name.name != 'Abyssinica SIL' && name.name != 'Padauk') : name.name != ''));
  const detectedFonts = useDetectFonts({ fonts: adjFontsArray });

  const detectedFontsComponents = detectedFonts.map((font, index) => (
    <MenuItem key={index} value={font.name} dense>
      <FontMenuItem font={font} />
    </MenuItem>
  ));

  return (
    <Grid item style={{ maxWidth: 250, padding: "1.25em 0" }}>
      <Box sx={{ minWidth: 250 }}>
        <FormControl fullWidth style={{ maxWidth: 300 }}>
          <InputLabel id="select-font-label" htmlFor="select-font-id" sx={sx.inputLabel}>Select Font</InputLabel>
          <Select
              labelId="select-font-label"
              name="select-font-name"
              inputProps={{
              id: "select-font-id",
              }}
              value={selectedFontId}
              label="Font"
              onChange={handleChange}
              sx={sx.select}
          >
              <MenuItem key={1} value="monospace">default</MenuItem>
              <MenuItem key={2} value="type font">type font</MenuItem>
              {assumeGraphite && <hr />}
              <b>
                {assumeGraphite && "Graphite-Enabled Fonts:"}                
              </b>
              {GraphiteEnabledWebFonts}
              <b>
                {assumeGraphite && "Local Graphite-Enabled Fonts:"}
                {detectedGEFontsComponents.length === 0 &&
                    assumeGraphite &&
                    noneDetectedGEMsg}
              </b>
              {detectedGEFontsComponents}
              <b>
                OpenType-Enabled Fonts:
              </b>
              {openTypeEnabledWebFonts}
              <hr />
              <b>
              Detected Fonts:{" "}
              {detectedFontsComponents.length === 0 && noneDetectedMsg}
              </b>
              {detectedFontsComponents}
          </Select>
      </FormControl>
    </Box>
  </Grid>
  );
}

ToolbarSelectFont.propTypes = {
  /** Selected Font Name */
  selectedFontName: PropTypes.string,
  /** Set Selected Font Name */
  setSelectedFontName: PropTypes.func.isRequired,
  /** Selected Font ID */
  selectedFontId: PropTypes.string,
  /** Set Selected Font Id */
  setSelectedFontId: PropTypes.func.isRequired,
  /** Set to quote or not to quote */
  setQuoteOrNot: PropTypes.func.isRequired,
  /** Custom Font */
  customFont: PropTypes.string,
  /** Set Custom Font */
  setCustomFont: PropTypes.func.isRequired,
  /** Set Type Font Is On */
  setTypeIsOn: PropTypes.func.isRequired,
  /** Assume Graphite? */
  assumeGraphite: PropTypes.bool,
};
