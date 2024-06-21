import { useState, useEffect } from "react";
import { Grid, Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { keywordsList } from "./FontKeywords";
import {
    useDetectFonts,
    useAssumeGraphite,
    fontList as fontsArray,
    graphiteEnabledFontList as graphiteEnabledFontsArray,
  } from "font-detect-rhl";
import FontMenuItem from "./FontMenuItem";
// import FontMenuEmbeddedItem from "./FontMenuEmbeddedItem";
import sx from "./ToolbarCustom.styles";
import PropTypes from 'prop-types';

import GraphiteEnabledWebFontsArray from '../embeddedWebFonts/GraphiteEnabledWebFonts.json';
import '../embeddedWebFonts/GraphiteEnabledWebFonts.css';

const noneDetectedGEMsg = "none detected";
const noneDetectedMsg = "none detected";

export default function ToolbarSelectFont(ToolbarSelectFontProps) {
  const {
    selectedFontName,
    setSelectedFontName,
    selectedFontId,
    setSelectedFontId,
    setQuoteOrNot,
    customFont,
    setCustomFont,
    setTypeIsOn,
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
    if (event.target.value == "Awami-Nastaliq-3-200") {
      setSelectedFontName("Awami Nastaliq 3.200");
    } else {
    setSelectedFontName(event.target.value);
    }
    setSelectedFontId(event.target.value);
    setQuoteOrNot(event.target.value === "monospace" ? "" : "'");
  };

  // Should Graphite-enabled fonts be detected / utilized?
  const isGraphiteAssumed = useAssumeGraphite({});

  // Utilizing Graphite-enabled web fonts
  // In order to not conflict with locally installed fonts, embedded fonts use a css id that differ from the font name.
  // Then name is used for display of the font name, while the id is used to implement it.
  const GraphiteEnabledWebFonts =
  isGraphiteAssumed &&
  GraphiteEnabledWebFontsArray.map((font, index) => (
    <MenuItem key={index} value={font.name} dense>
      <FontMenuItem font={font} />
    </MenuItem>
  ));

  // Detecting locally installed Graphite-enabled fonts (name = id):
  const detectedGEFonts = useDetectFonts({
    fonts: isGraphiteAssumed ? graphiteEnabledFontsArray : [],
  });

  const detectedGEFontsComponents =
    isGraphiteAssumed &&
    detectedGEFonts.map((font, index) => (
      <MenuItem key={index} value={font.name} dense>
        <FontMenuItem font={font} />
      </MenuItem>
    ));
  
  // Detecting locally installed fonts  (name = id):
  const detectedFonts = useDetectFonts({ fonts: fontsArray });

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
              {isGraphiteAssumed && <hr />}
              <b>
              {isGraphiteAssumed && "Graphite-Enabled Fonts:"}
              {detectedGEFontsComponents.length === 0 &&
                  isGraphiteAssumed &&
                  noneDetectedGEMsg}
              </b>
              {GraphiteEnabledWebFonts}
              {detectedGEFontsComponents}
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
  /** Is Disabled? */
  isDisabled: PropTypes.bool,
};
