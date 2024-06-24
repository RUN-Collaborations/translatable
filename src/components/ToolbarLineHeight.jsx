import React, { useState, useEffect } from "react";
import { Box, FormControl, TextField, InputAdornment } from "@mui/material";
import PropTypes from 'prop-types';

export default function ToolbarLineHeight(ToolbarLineHeightProps) {
  const { selectedLineHeight, setSelectedLineHeight } = ToolbarLineHeightProps;
  
  const showAsPercent = selectedLineHeight*100;
  
  const [lineHeight, setLineHeight] = useState(showAsPercent);
  const [lineHeightValue, setLineHeightValue] = useState(lineHeight);
  

  // only allow numbers to be entered for line height
  const handleEnsureNumber = (event) => {
    const result = event.target.value.replace(/[^0-9]/g, '').substring(0, 3);
    setLineHeightValue(result);
  }

  // on click event for setting line height
  const handleSubmitSize = (event) => {
    event.preventDefault();
    setLineHeight(lineHeightValue);
  };

  useEffect(() => {
    setLineHeight(lineHeightValue);
  }, [lineHeightValue]);

  useEffect(() => {
    const lineHeightNum = lineHeight / 100;
    const lineHeightString = lineHeightNum.toString();
    setSelectedLineHeight(lineHeightString);
  }, [lineHeight, selectedLineHeight, setSelectedLineHeight]);

  const refLineHeight = React.useRef();

  return (
        <Box sx={{ maxWidth: 87 }}>
          <FormControl sx={{ maxWidth: 87 }}>
            <form onSubmit={handleSubmitSize}>
              <div>
                <TextField
                  label="Line Height"
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
                    '& .MuiInputAdornment-root': {fontSize: '.9em'}
                  },
                  endAdornment:
                    <InputAdornment position="end" sx={{position: 'absolute', right: 23, bottom: 7 }}>%</InputAdornment>,
                 }}
                  placeholder="Height"
                  type="text"
                  id="lineHeight"
                  name="lineHeight"
                  inputRef={refLineHeight}
                  defaultValue={lineHeight}
                  value={lineHeightValue}
                  onChange={handleEnsureNumber}
                />
              </div>
            </form>
          </FormControl>
        </Box>
  );
}

ToolbarLineHeight.propTypes = {
  /** Selected Line Height */
  selectedLineHeight: PropTypes.string,
  /** Set Selected Line Height */
  setSelectedLineHeight: PropTypes.func.isRequired,
};
