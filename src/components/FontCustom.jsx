import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { Grid, TextField, Stack } from "@mui/material";

export default function CustomFont(fontCustomProps) {
  const { customFont, setCustomFont, setTypeIsOn, selectedFont } = fontCustomProps;

  // on click event for setting font
  const handleSubmit = (event) => {
    event.preventDefault();
    setCustomFont(event.target.customFont.value);
  };

  const textCustomFont = React.useRef();

  const resetCustomFont = () => {
    textCustomFont.current.value = "";
    setCustomFont("");
  };
  
  // eslint-disable-next-line no-unused-vars
  const [useIsOn, setUseIsOn] = useState(false);
  
  const turnOnUse = () => {
    setUseIsOn(true);
  };

  const turnOffUse = () => {
    setUseIsOn(false);
  };

  const closeCustomFont = () => {
    setTypeIsOn(false);
    if (customFont === "" && selectedFont === "type font") setCustomFont("monospace");
  };

  return (
    <Grid item style={{ maxWidth: 152, padding: "1.25em", lineHeight: 1 }}>
      <Box>
        <FormControl>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                label="Type Font"
                InputLabelProps={{
                  shrink: true,
                  sx:{ background: '#124116', color: 'white', "&.Mui-focused": {color: "yellow"} }
                }}
                variant="outlined"
                sx={{
                  width: 130,
                  marginBottom: 0.5,
                  input: { color: '#124116', paddingBottom: 1.35, paddingLeft: 0.75, paddingRight: 0.75 }
                }}
                InputProps={{ sx: { height: 28, fontSize: '1.1em', background: 'white', "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "yellow",
                  borderWidth: "thin",
                }, } }}
                placeholder="Type Font"
                type="text"
                id="customFont"
                name="customFont"
                inputRef={textCustomFont}
                defaultValue={customFont}
                onClick={turnOnUse}
              />
              <Stack direction="row" spacing={0.25}>
                <button type="submit" onClick={turnOffUse}>
                  Use
                </button>
                <button type="button" onClick={resetCustomFont}>
                  Clear
                </button>
                <button type="button" onClick={closeCustomFont}>
                  Close
                </button>
              </Stack>
            </div>
          </form>
        </FormControl>
      </Box>
    </Grid>
  );
}

CustomFont.propTypes = {
  /** Custom Font */
  customFont: PropTypes.string,
  /** Set Custom Font */
  setCustomFont: PropTypes.func.isRequired,
  /** Set Type [Custom Font] is on */
  setTypeIsOn: PropTypes.func.isRequired,
  /** Selected Font */
  selectedFont: PropTypes.string,
};

CustomFont.defaultProps = {
  customFont: "",
};
