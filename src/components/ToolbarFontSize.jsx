import React, { useState, useEffect } from "react";
import { Box, FormControl, TextField, InputAdornment } from "@mui/material";
import PropTypes from 'prop-types';

export default function ToolbarFontSize(ToolbarFontSizeProps) {
  const { selectedFontSize, setSelectedFontSize } = ToolbarFontSizeProps;
  
  const extractNumber = selectedFontSize.replace(/[^0-9]/g, '');
  const fontUnits = selectedFontSize.replace(/[^%empxvw]/g, '');
  
  const [fontSize, setFontSize] = useState(extractNumber);
  const [fontSizeValue, setFontSizeValue] = useState(fontSize);
  

  // only allow numbers to be entered for font size
  const handleEnsureNumber = (event) => {
    const result = event.target.value.replace(/[^0-9]/g, '').substring(0, 3);
    setFontSizeValue(result);
  }

  // on click event for setting font size
  const handleSubmitSize = (event) => {
    event.preventDefault();
    setFontSize(fontSizeValue);
  };

  useEffect(() => {
    setFontSize(fontSizeValue);
  }, [fontSizeValue]);

  useEffect(() => {
    setSelectedFontSize(fontSize + fontUnits);
  }, [fontSize, fontUnits, selectedFontSize, setSelectedFontSize]);

  const refFontSize = React.useRef();

  return (
        <Box sx={{ maxWidth: 87 }}>
          <FormControl sx={{ maxWidth: 87 }}>
            <form onSubmit={handleSubmitSize}>
              <div>
                <TextField
                  label="Font Size"
                  InputLabelProps={{
                    shrink: true,
                    sx:{ fontSize: '1.2em', background: '#124116', color: 'white', "&.Mui-focused": {color: "yellow"} }
                  }}
                  variant="outlined"
                  sx={{
                    width: 87,
                    marginBottom: 0.5,
                    input: { color: '#124116', paddingBottom: 1.25, paddingLeft: 2.75, paddingRight: 2.5 }
                  }}
                    InputProps={{ sx: { height: 22, fontSize: '1.1em', background: 'white', "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "yellow",
                      borderWidth: "thin",
                    },
                    '& .MuiInputAdornment-root': {fontSize: '.9em',fontWeight: 'bolder'}
                  },
                  endAdornment:
                    <InputAdornment position="end" sx={{position: 'absolute', right: 23 , bottom: 7 }}>%</InputAdornment>,
                 }}
                  placeholder="Size"
                  type="text"
                  id="fontSize"
                  name="fontSize"
                  inputRef={refFontSize}
                  value={fontSizeValue}
                  onChange={handleEnsureNumber}
                />
              </div>
            </form>
          </FormControl>
        </Box>
  );
}

ToolbarFontSize.propTypes = {
  /** Selected Font Size */
  selectedFontSize: PropTypes.string,
  /** Set Selected Font Size */
  setSelectedFontSize: PropTypes.func.isRequired,
};
