import { useMemo } from "react";
import { FormLabel, FormControlLabel, RadioGroup, Radio, Typography, Tooltip } from "@mui/material";
import DOMPurify from 'dompurify';
import graphiteEnabledFeatures from '../fontFeatures/graphiteEnabledFeatures.json';

export default function FontFeatureSettings(fontFeatureSettingsProps) {
  const {
    featureFont,
    fontSettings,
    handleChange,
    placementDir,
    radioRightMargin,
    radioLeftMargin,
    label,
  } = fontFeatureSettingsProps;

  const labelDivStyle = useMemo(() => ({
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
  }),[]);

  const labelMarkStyle = useMemo(() => ({
    backgroundColor: '#A2AD9C',
    color: '#124116',
    padding: '0.11em .21em',
    borderRadius: '2px',
  }),[]);

  const radioColor = useMemo(() => ({
    "& .MuiSvgIcon-root": {
      fontSize: 28,
      color: '#A2AD9C',
    },
  }),[]);

  const tooltipPosition = useMemo(() => ({
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, -12],
        },
      },
    ],
  }), []);

  let count = -1;
  const featureSettings = useMemo(() => graphiteEnabledFeatures.filter((name) => name?.name === featureFont).map((font, fontIndex) => (
    <div key={fontIndex}>
      {font.categories.map((categories, categoriesIndex) => {
        return (<div key={categoriesIndex}>
          {font.categories[categoriesIndex].category.map((category, categoryIndex) => {
            return (<div key={categoryIndex}>
              <h1 style={{textAlign: 'center'}}>{font.name}: {category.name}</h1>
              {category.sets.map((sets, setsIndex) => {
                return (<div key={setsIndex}>
                  {category.sets[setsIndex].set.map((set, setIndex) => {
                    return (<div key={setIndex}>
                      <FormLabel id={set.id}><div style={labelDivStyle}><mark style={labelMarkStyle}>{set.title}</mark></div></FormLabel>
                      <RadioGroup
                        aria-labelledby={set.id}
                        defaultValue={set.default}
                        name={set.name}
                        value={fontSettings === null ? set.default : fontSettings[++count].value}
                        onChange={handleChange}
                        sx={radioColor}
                      >
                        {set.options.map((option, optionIndex) => {
                          return (<div key={optionIndex}>
                            <Tooltip title={option.tip} placement={placementDir} PopperProps={tooltipPosition} arrow={true}>
                              <FormControlLabel
                                sx={{marginRight: radioRightMargin, marginLeft: radioLeftMargin}} 
                                value={option.value}
                                style={{ fontFeatureSettings: '"' + set.name + '" ' + option.value, MozFontFeatureSettings: '"' + set.name + '" ' + option.value, WebkitFontFeatureSettings: '"' + set.name + '" ' + option.value }}
                                control={<Radio />}
                                label={<Typography sx={label}><div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(set.label) }} /></Typography>}
                              />
                            </Tooltip>
                          </div>)
                        })}
                      </RadioGroup>
                    </div>)
                    })}
                </div>)
              })}
            </div>)
          })}
      </div>)
      })}
    </div>
  )), [featureFont, count, labelDivStyle, labelMarkStyle, fontSettings, handleChange, radioColor, placementDir, tooltipPosition, radioRightMargin, radioLeftMargin, label]);

  return featureSettings;
}