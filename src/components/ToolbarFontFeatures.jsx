  /* eslint-disable no-irregular-whitespace */
  import { useState, useCallback, useMemo, useEffect } from "react";
  import { Box, ClickAwayListener, FormControl, createTheme, ThemeProvider, Grid } from "@mui/material";
  import { renderToString } from 'react-dom/server';
  import { useDetectDir, graphiteEnabledFeatures } from "font-detect-rhl";
  import FontFeatureDefaults from "../helpers/FontFeatureDefaults";
  import FontFeatureSettings from "./FontFeatureSettings";
  import PropTypes from 'prop-types';

  export default function ToolbarFontFeatures(toolbarFontFeaturesProps) {
    const {
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
    } = toolbarFontFeaturesProps;

    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
      setOpen(false);
    };

    const [maxWindowHeight, setMaxWindowHeight] = useState(window.innerHeight - 75);
    const [maxWindowWidth, setMaxWindowWidth] = useState(window.innerWidth - 175);
    // eslint-disable-next-line no-unused-vars
    const handleWindowResize = useCallback(event => {
      setMaxWindowHeight(window.innerHeight - 75);
      setMaxWindowWidth(window.innerWidth - 175);
      // setLeftPosition(window.innerWidth > 1103 ? -781 : -100);
    }, []);

    useEffect(() => {
      window.addEventListener('resize', handleWindowResize);
      return () => {
          window.removeEventListener('resize', handleWindowResize);
      };
    }, [handleWindowResize]);

    const styles = {
      position: 'fixed',
      top: 49,
      right: 120,
      zIndex: 1,
      border: '1px solid',
      p: 1,
      bgcolor: 'background.paper',
      backgroundColor: "#124116;",
      borderRadius: '8px',
      maxHeight: maxWindowHeight,
      maxWidth: maxWindowWidth,
      overflow: "scroll",
    };

    // The diffStyle constant is for emphasis in Awami Nastliq labels.
    // eslint-disable-next-line no-unused-vars
    const diffStyle = "color: yellow;";

    useEffect(() => {
      setFeatureFont(embeddedFontIfListed.length > 0 ? embeddedFontIfListed : selectedFontName);
    },[embeddedFontIfListed, selectedFontName, setFeatureFont])

    const fontSettingsArr = FontFeatureDefaults({ featureFont: featureFont })

    // It is okay when don't have a recent returnedFontSettings. It's purpose is to keep from changing back to default values when we do.
    const arrayCheck = (returnedFontSettings?.length || 0);

    // Returned feature Font isn't helpful if we've just change fonts. We should reset it on font change.
    const [returnedFontCheck, setReturnedFontCheck] = useState(returnedFeatureFont);

    /* 
      This ensures the counter stops at the last object at fontSettings[++count].value in the FontFeatureSettings component.:
        - Only run this when array length or the feature font name changes.
        - Never run if just the values change, otherwise it will reset all values to default.
    */
    useEffect(() => {
      if ((arrayCheck !== fontSettingsArr.length) || (featureFont !== returnedFontCheck)) {
        setFontSettings(fontSettingsArr);
        setReturnedFontCheck("");
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[featureFont]);
    
    // This gets all radio label text and uses it to identify the most common text direction, for use in the font feature settings container.
    const labelJsxText = useMemo(() => graphiteEnabledFeatures.filter((name) => name?.name === featureFont).map((font, fontIndex) => (
      <div key={fontIndex}>
        {font.categories.map((categories, categoriesIndex) => {
          return (<div key={categoriesIndex}>
            {font.categories[categoriesIndex].category.map((category, categoryIndex) => {
              return (<div key={categoryIndex}>
                {category.sets.map((sets, setsIndex) => {
                  return (<div key={setsIndex}>
                    {category.sets[setsIndex].set.map((set, setIndex) => {
                        return (<div key={setIndex}>
                          {/** replace quote and apostrophe html special entities, and remove html tags and attributes */}
                          {set.label.replace(/&quot;/ig, '"').replace(/&apos;/ig, "'").replace(/(<([^>]+)>)/ig, '')}
                        </div>)
                      })}
                  </div>)
                })}
              </div>)
            })}
        </div>)
        })}
      </div>
    )), [featureFont]);

    // convert jsx return to string, replace quote and apostrophe html special entities, and remove html tags and attributes
    const labelStr = useMemo(() => renderToString(labelJsxText).replace(/&quot;/ig, '"').replace(/&#x27;/ig, "'").replace(/(<([^>]+)>)/ig, ''),[labelJsxText]);
    const labelDir = useDetectDir({ text: labelStr, isMarkup: false, ratioThreshold: .51 });

    const handleChange = useMemo(() => (event) => {
      const newState = fontSettings.map(obj => {
        if (obj.name === event.target.name) {
          return {...obj, value: +event.target.value};
        }
        // otherwise return the object as is
        return obj;
      });
        setFontSettings(newState);
    },[fontSettings, setFontSettings]);

    const [placementDir, setPlacementDir] = useState('left');
    const [radioRightMargin, setRadioRightMargin] = useState('16px');
    const [radioLeftMargin, setRadioLeftMargin] = useState('-11px');


    useEffect(() => {
      if (labelDir === 'rtl') {
        setPlacementDir('right')
        setRadioRightMargin('-11px')
        setRadioLeftMargin('16px')
      } else if (labelDir === 'ltr') {
        setPlacementDir('left')
        setRadioRightMargin('16px') // MUI's current default
        setRadioLeftMargin('-11px') // MUI's current default
      }
    }, [labelDir]);

    const theme =  useMemo(() => createTheme({
      typography: {
        fontFamily: [
          '"' + selectedFontName + '"',
          '"Roboto"',
          '"Helvetica"',
          '"Arial"',
          'sans-serif',
        ].join(','),
      },
      box: {
        dir: labelDir,
        textAlign: placementDir,
      },
      components: {
        MuiTooltip: {
          styleOverrides: {
            tooltip: {
              fontSize: ".85em",
              color: "#124116",
              backgroundColor: "yellow",
              border: '1px solid #124116', 
              fontFamily: 'sans-serif',
              "& .MuiTooltip-arrow": {
                "&::before": {
                  backgroundColor: "yellow",
                },
              },
            }
          }
        },
      }
    }), [labelDir, placementDir, selectedFontName]);

    // This sx is the same as adding to const theme a components:{MuiTypography:{styleOverrides:{root:{"&.MuiTypography-root":{css_goes_here}}}}}
    const labelStyle = useMemo(() => ({
      lineHeight: selectedLineHeight,
      fontSize: selectedFontSize,
    }),[selectedFontSize, selectedLineHeight]);

    
    const fontFeatureSettingsProps = {
      featureFont,
      fontSettings,
      handleChange,
      placementDir,
      radioRightMargin,
      radioLeftMargin,
      labelStyle,
      diffStyle,
    };

    const DrawerList = (
        <FormControl style={{ direction: labelDir }}>
          <Grid container sx={{ maxWidth: 900 }}>
            <Grid item>
              <div style={{marginRight: 25, marginLeft: 25}}>
                <FontFeatureSettings {...fontFeatureSettingsProps} />
              </div>
            </Grid>
          </Grid>
        </FormControl>
    );

    return (
      <>
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box sx={{ position: 'relative' }}>
            <button style={{height: "4.645em", margin: "0.1em auto"}}  onClick={handleClick}>Smart<br />Font<br />Features</button>
            {open ? (
              <ThemeProvider theme={theme}>
                <div dir={labelDir} style={{textAlign:placementDir}}>
                  <Box sx={styles}>
                    {DrawerList}
                  </Box>
                </div>
              </ThemeProvider>
            ) : null}
          </Box>
        </ClickAwayListener>
      </>
    )
  }

  ToolbarFontFeatures.propTypes = {
    /** Font Settings Array of Objects */
    fontSettings: PropTypes.array,
    /** Set Font Settings */
    setFontSettings: PropTypes.func.isRequired,
    /** Returned Font Settings Array of Objects */
    returnedFontSettings: PropTypes.array,
    /** Font SettingsCss  */
    fontSettingsCss: PropTypes.string,
    /** Selected Font Name */
    selectedFontName: PropTypes.string,
    /** Feature Font */
    featureFont: PropTypes.string,
    /** Set Feature Font */
    setFeatureFont: PropTypes.func,
    /** Returned Feature Font */
    returnedFeatureFont: PropTypes.string,
    /** Embedded Font If Listed */
    embeddedFontIfListed: PropTypes.string,
    /** Selected Font Size */
    selectedFontSize: PropTypes.string,
    /** Selected Line Height */
    selectedLineHeight: PropTypes.string,
  };
