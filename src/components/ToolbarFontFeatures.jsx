/* eslint-disable no-irregular-whitespace */
import { useState, useCallback, useEffect } from "react";
import { Box, ClickAwayListener, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, createTheme, ThemeProvider, Grid, Typography, Tooltip } from "@mui/material";
import PropTypes from 'prop-types';

export default function ToolbarFontFeatures(ToolbarFontFeaturesProps) {
  const {
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
  } = ToolbarFontFeaturesProps;

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const theme = createTheme({
    typography: {
      fontFamily: [
        '"Awami Nastaliq"',
        '"Roboto"',
        '"Helvetica"',
        '"Arial"',
        'sans-serif',
      ].join(','),
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
      }
    }
  });

  const tooltipPosition = {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, -12],
        },
      },
    ],
  }

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

  const label = {
    fontSize: '170%',
    lineHeight: '300%',
  };

  const fontColor = 'yellow';
  const labelDivStyle =  {
    textAlign: 'right',
    marginRight: 25,
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
  }

  const labelMarkStyle={
    backgroundColor: '#A2AD9C',
    color: '#124116',
    padding: '0.11em .21em',
    borderRadius: '2px',
  }

  const radioColor = {
    "& .MuiSvgIcon-root": {
      fontSize: 28,
      color: '#A2AD9C',
    },
  }

  const handleHehkChange = (event) => {
    setHehk(event.target.value);
  }

  const handleHedoChange = (event) => {
    setHedo(event.target.value);
  }

  const handleLamvChange = (event) => {
    setLamv(event.target.value);
  }

  const handleCv85Change = (event) => {
    setCv85(event.target.value);
  }

  const handleCv78Change = (event) => {
    setCv78(event.target.value);
  }

  const handleHamzChange = (event) => {
    setHamz(event.target.value);
  }

  const handlePuncChange = (event) => {
    setPunc(event.target.value);
  }

  const handleWdspChange = (event) => {
    setWdsp(event.target.value);
  }

  const handleShrtChange = (event) => {
    setShrt(event.target.value);
  }

  const handleAgcaChange = (event) => {
    setAgca(event.target.value);
  }

  const DrawerList = (
      <FormControl style={{ direction:'rtl' }}>
        <Grid container sx={{ width: 900 }}>
          <Grid item xs={3}>
            <FormLabel id="hook-on-medial-heh-goal-label"><div style={labelDivStyle}><mark style={labelMarkStyle}>Hook on medial heh-goal</mark></div></FormLabel>
            <RadioGroup
              aria-labelledby="hook-on-medial-heh-goal-label"
              defaultValue="1"
              name="hehk"
              value={hehk}
              onChange={handleHehkChange}
              sx={radioColor}
            >
              <Tooltip title="Yes" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="1" style={{ fontFeatureSettings: '"hehk" 1', MozFontFeatureSettings: '"hehk" 1', WebkitFontFeatureSettings: '"hehk" 1' }} control={<Radio />} label={<Typography sx={label}>ب<font color={fontColor}>ہ</font>ب ب<font color={fontColor}>ۂ</font>ب</Typography>} /></Tooltip>
              <Tooltip title="No" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="0" style={{ fontFeatureSettings: '"hehk" 0', MozFontFeatureSettings: '"hehk" 0', WebkitFontFeatureSettings: '"hehk" 0' }} control={<Radio />} label={<Typography sx={label}>ب<font color={fontColor}>ہ</font>ب ب<font color={fontColor}>ۂ</font>ب</Typography>} /></Tooltip>
            </RadioGroup>
            <FormLabel id="initial-heh-doachashmee-label"><div style={labelDivStyle}><br /><mark style={labelMarkStyle}>Initial heh doachashmee</mark></div></FormLabel>
            <RadioGroup
              aria-labelledby="initial-heh-doachashmee-label"
              defaultValue="0"
              name="hedo"
              value={hedo}
              onChange={handleHedoChange}
              sx={radioColor}
            >
              <Tooltip title="Heart shaped" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="0" style={{ fontFeatureSettings: '"hedo" 0', MozFontFeatureSettings: '"hedo" 0', WebkitFontFeatureSettings: '"hedo" 0' }} control={<Radio />} label={<Typography sx={label}><font color={fontColor}>ھ</font>ا</Typography>} /></Tooltip>
              <Tooltip title="Round" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="1" style={{ fontFeatureSettings: '"hedo" 1', MozFontFeatureSettings: '"hedo" 1', WebkitFontFeatureSettings: '"hedo" 1' }} control={<Radio />} label={<Typography sx={label}><font color={fontColor}>ھ</font>ا</Typography>} /></Tooltip>
            </RadioGroup>
            <FormLabel id="lam-with-v-label"><div style={labelDivStyle}><br /><mark style={labelMarkStyle}>Lam with V</mark></div></FormLabel>
            <RadioGroup
              aria-labelledby="lam-with-v-label"
              defaultValue="0"
              name="lamv"
              value={lamv}
              onChange={handleLamvChange}
              sx={radioColor}
            >
              <Tooltip title="V over stem" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="0" style={{ fontFeatureSettings: '"lamv" 0', MozFontFeatureSettings: '"lamv" 0', WebkitFontFeatureSettings: '"lamv" 0' }} control={<Radio />} label={<Typography sx={label}><font color={fontColor}>ڵ</font> ڵبڵب<font color={fontColor}>ڵ</font></Typography>} /></Tooltip>
              <Tooltip title="V over bowl" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="1" style={{ fontFeatureSettings: '"lamv" 1', MozFontFeatureSettings: '"lamv" 1', WebkitFontFeatureSettings: '"lamv" 1' }} control={<Radio />} label={<Typography sx={label}><font color={fontColor}>ڵ</font> ڵبڵب<font color={fontColor}>ڵ</font></Typography>} /></Tooltip>
            </RadioGroup>
            <FormLabel id="full-stop-label"><div style={labelDivStyle}><br /><mark style={labelMarkStyle}>Full Stop</mark></div></FormLabel>
            <RadioGroup
              aria-labelledby="full-stop-label"
              defaultValue="0"
              name="cv85"
              value={cv85}
              onChange={handleCv85Change}
              sx={radioColor}
            >
               <Tooltip title="Dash" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="0" style={{ fontFeatureSettings: '"cv85" 0', MozFontFeatureSettings: '"cv85" 0', WebkitFontFeatureSettings: '"cv85" 0' }} control={<Radio />} label={<Typography sx={label}>ججج<font color={fontColor}>۔</font></Typography>} /></Tooltip>
               <Tooltip title="Dot" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="1" style={{ fontFeatureSettings: '"cv85" 1', MozFontFeatureSettings: '"cv85" 1', WebkitFontFeatureSettings: '"cv85" 1' }} control={<Radio />} label={<Typography sx={label}>ججج<font color={fontColor}>۔</font></Typography>} /></Tooltip>
            </RadioGroup>
            <FormLabel id="sukun-jazm-label"><div style={labelDivStyle}><br /><mark style={labelMarkStyle}>Sukun/jazm</mark></div></FormLabel>
            <RadioGroup
              aria-labelledby="sukun-jazm-label"
              defaultValue="1"
              name="cv78"
              value={cv78}
              onChange={handleCv78Change}
              sx={radioColor}
            >
              <Tooltip title="Open down" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="1" style={{ fontFeatureSettings: '"cv78" 1', MozFontFeatureSettings: '"cv78" 1', WebkitFontFeatureSettings: '"cv78" 1' }} control={<Radio />} label={<Typography sx={label}>بْ ◌ْ</Typography>} /></Tooltip>
              <Tooltip title="Open left" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="2" style={{ fontFeatureSettings: '"cv78" 2', MozFontFeatureSettings: '"cv78" 2', WebkitFontFeatureSettings: '"cv78" 2' }} control={<Radio />} label={<Typography sx={label}>بْ ◌ْ</Typography>} /></Tooltip>
            </RadioGroup>
          </Grid>
          <Grid item xs={9}>
            <Grid container>
              <Grid item xs={7}>
              <FormLabel id="hamza-label"><div style={labelDivStyle}><mark style={labelMarkStyle}>Hamza</mark></div></FormLabel>
                <RadioGroup
                  aria-labelledby="hamza-label"
                  defaultValue="0"
                  name="hamz"
                  value={hamz}
                  onChange={handleHamzChange}
                  sx={radioColor}
                >
                  <Tooltip title="Urdu style" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="0" style={{ fontFeatureSettings: '"hamz" 0', MozFontFeatureSettings: '"hamz" 0', WebkitFontFeatureSettings: '"hamz" 0' }} control={<Radio />} label={<Typography sx={label}>ء أ ؤ بؤ إ ۂ بۂ ۓ بۓ ٵ ݬ بݬ ځ بځ بځب بٔ بٕ</Typography>} /></Tooltip>
                  <Tooltip title="Arabic style" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="1" style={{ fontFeatureSettings: '"hamz" 1', MozFontFeatureSettings: '"hamz" 1', WebkitFontFeatureSettings: '"hamz" 1' }} control={<Radio />} label={<Typography sx={label}>ء أ ؤ بؤ إ ۂ بۂ ۓ بۓ ٵ ݬ بݬ ځ بځ بځب بٔ بٕ</Typography>} /></Tooltip>
                </RadioGroup>
                <FormLabel id="word-spacing-label"><div style={labelDivStyle}><br /><mark style={labelMarkStyle}>Word spacing</mark></div></FormLabel>
                <RadioGroup
                  aria-labelledby="word-spacing-label"
                  defaultValue="2"
                  name="wdsp"
                  value={wdsp}
                  onChange={handleWdspChange}
                  sx={radioColor}
                >
                  <Tooltip title="Extra tight" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="0" style={{ fontFeatureSettings: '"wdsp" 0', MozFontFeatureSettings: '"wdsp" 0', WebkitFontFeatureSettings: '"wdsp" 0' }} control={<Radio />} label={<Typography sx={label}>کیوں جو انسانی حقوق کنوں</Typography>} /></Tooltip>
                  <Tooltip title="Tight" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="1" style={{ fontFeatureSettings: '"wdsp" 1', MozFontFeatureSettings: '"wdsp" 1', WebkitFontFeatureSettings: '"wdsp" 1' }} control={<Radio />} label={<Typography sx={label}>کیوں جو انسانی حقوق کنوں</Typography>} /></Tooltip>
                  <Tooltip title="Medium" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="2" style={{ fontFeatureSettings: '"wdsp" 2', MozFontFeatureSettings: '"wdsp" 2', WebkitFontFeatureSettings: '"wdsp" 2' }} control={<Radio />} label={<Typography sx={label}>کیوں جو انسانی حقوق کنوں</Typography>} /></Tooltip>
                  <Tooltip title="Wide" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="3" style={{ fontFeatureSettings: '"wdsp" 3', MozFontFeatureSettings: '"wdsp" 3', WebkitFontFeatureSettings: '"wdsp" 3' }} control={<Radio />} label={<Typography sx={label}>کیوں جو انسانی حقوق کنوں</Typography>} /></Tooltip>
                  <Tooltip title="Extra wide" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="4" style={{ fontFeatureSettings: '"wdsp" 4', MozFontFeatureSettings: '"wdsp" 4', WebkitFontFeatureSettings: '"wdsp" 4' }} control={<Radio />} label={<Typography sx={label}>کیوں جو انسانی حقوق کنوں</Typography>} /></Tooltip>
                </RadioGroup>
              </Grid>
              <Grid item xs={5}>
                <FormLabel id="collision-avoidance-label"><div style={labelDivStyle}><mark style={labelMarkStyle}>Collision avoidance</mark></div></FormLabel>
                <RadioGroup
                  aria-labelledby="collision-avoidance-label"
                  defaultValue="3"
                  name="agca"
                  value={agca}
                  onChange={handleAgcaChange}
                  sx={radioColor}
                >
                  <Tooltip title="On" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="3" style={{ fontFeatureSettings: '"agca" 3', MozFontFeatureSettings: '"agca" 3', WebkitFontFeatureSettings: '"agca" 3' }} control={<Radio />} label={<Typography sx={label}><font color={fontColor}>پی</font>ٹی <font color={fontColor}>اؔبِی</font>ج<font color={fontColor}>یل</font> تح<font color={fontColor}>ر</font>ِ<font color={fontColor}>ی</font>ج</Typography>} /></Tooltip>
                  {/** <Tooltip title="Not implemented" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="2" style={{ fontFeatureSettings: '"agca" 2', MozFontFeatureSettings: '"agca" 2', WebkitFontFeatureSettings: '"agca" 2' }} control={<Radio />} label={<Typography sx={label}>پیٹی اؔبِیجیل تحرِیج</Typography>} /></Tooltip> */}
                  <Tooltip title="Kern-only" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="1" style={{ fontFeatureSettings: '"agca" 1', MozFontFeatureSettings: '"agca" 1', WebkitFontFeatureSettings: '"agca" 1' }} control={<Radio />} label={<Typography sx={label}><font color={fontColor}>پی</font>ٹی <font color={fontColor}>اؔبِی</font>ج<font color={fontColor}>یل</font> تح<font color={fontColor}>ر</font>ِ<font color={fontColor}>ی</font>ج</Typography>} /></Tooltip>
                  <Tooltip title="Off" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="0" style={{ fontFeatureSettings: '"agca" 0', MozFontFeatureSettings: '"agca" 0', WebkitFontFeatureSettings: '"agca" 0' }} control={<Radio />} label={<Typography sx={label}><font color={fontColor}>پی</font>ٹی <font color={fontColor}>اؔبِی</font>ج<font color={fontColor}>یل</font> تح<font color={fontColor}>ر</font>ِ<font color={fontColor}>ی</font>ج</Typography>} /></Tooltip>
                </RadioGroup>
                <FormLabel id="short-forms-label"><div style={labelDivStyle}><br /><mark style={labelMarkStyle}>Short forms</mark><br />&nbsp;</div></FormLabel>
                <RadioGroup
                  aria-labelledby="short-forms-label"
                  defaultValue="3"
                  name="shrt"
                  value={shrt}
                  onChange={handleShrtChange}
                  sx={radioColor}
                >
                  <Tooltip title="All" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="3" style={{ fontFeatureSettings: '"shrt" 3', MozFontFeatureSettings: '"shrt" 3', WebkitFontFeatureSettings: '"shrt" 3' }} control={<Radio />} label={<Typography sx={label}>دی<font color={fontColor}>ک</font>ھت<font color={fontColor}>ی</font> <font color={fontColor}>ک</font>نسلٹنٹ<font color={fontColor}>س</font> ن<font color={fontColor}>گ</font>ھنے ت<font color={fontColor}>ک</font>می<font color={fontColor}>ل</font></Typography>} /></Tooltip>
                  <Tooltip title="Finals" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="2" style={{ fontFeatureSettings: '"shrt" 2', MozFontFeatureSettings: '"shrt" 2', WebkitFontFeatureSettings: '"shrt" 2' }} control={<Radio />} label={<Typography sx={label}>دیکھت<font color={fontColor}>ی</font> کنسلٹنٹ<font color={fontColor}>س</font> نگھنے تکمی<font color={fontColor}>ل</font></Typography>} /></Tooltip>
                  <Tooltip title="Kafs and gafs" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="1" style={{ fontFeatureSettings: '"shrt" 1', MozFontFeatureSettings: '"shrt" 1', WebkitFontFeatureSettings: '"shrt" 1' }} control={<Radio />} label={<Typography sx={label}>دی<font color={fontColor}>ک</font>ھتی <font color={fontColor}>ک</font>نسلٹنٹس ن<font color={fontColor}>گ</font>ھنے ت<font color={fontColor}>ک</font>میل</Typography>} /></Tooltip>
                  <Tooltip title="None" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="0" style={{ fontFeatureSettings: '"shrt" 0', MozFontFeatureSettings: '"shrt" 0', WebkitFontFeatureSettings: '"shrt" 0' }} control={<Radio />} label={<Typography sx={label}>دیکھتی کنسلٹنٹس نگھنے تکمیل</Typography>} /></Tooltip>
                </RadioGroup>
              </Grid>
            </Grid>
            <FormLabel id="lam-with-v-label"><div style={labelDivStyle}><mark style={labelMarkStyle}>Punctuation</mark></div></FormLabel>
              <RadioGroup
                aria-labelledby="punctuation-label"
                defaultValue="0"
                name="punc"
                value={punc}
                onChange={handlePuncChange}
                sx={radioColor}
              >
                <Tooltip title="Arabic (RTL) and Latin (LTR) styles" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="0" style={{ fontFeatureSettings: '"punc" 0', MozFontFeatureSettings: '"punc" 0', WebkitFontFeatureSettings: '"punc" 0' }} control={<Radio />} label={<Typography sx={label}>! &quot; &apos; ( ) * + - / : [  ] { } « ­ ± · » ×   ‐ ‑ ‒ – — ― ‘ ’ ‚ “ ” „ • ‥ … ‧ ‰ ‹ › − ∙ </Typography>} /></Tooltip>
                <Tooltip title="Arabic-style" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="1" style={{ fontFeatureSettings: '"punc" 1', MozFontFeatureSettings: '"punc" 1', WebkitFontFeatureSettings: '"punc" 1' }} control={<Radio />} label={<Typography sx={label}>! &quot; &apos; ( ) * + - / : [  ] { } « ­ ± · » ×   ‐ ‑ ‒ – — ― ‘ ’ ‚ “ ” „ • ‥ … ‧ ‰ ‹ › − ∙ </Typography>} /></Tooltip>
                <Tooltip title="Latin-style" placement="right" PopperProps={tooltipPosition} arrow={true}><FormControlLabel value="2" style={{ fontFeatureSettings: '"punc" 2', MozFontFeatureSettings: '"punc" 2', WebkitFontFeatureSettings: '"punc" 2' }} control={<Radio />} label={<Typography sx={label}>! &quot; &apos; ( ) * + - / : [  ] { } « ­ ± · » ×   ‐ ‑ ‒ – — ― ‘ ’ ‚ “ ” „ • ‥ … ‧ ‰ ‹ › − ∙ </Typography>} /></Tooltip>
              </RadioGroup>
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
              <Box sx={styles}>
                {DrawerList}
              </Box>
            </ThemeProvider>
          ) : null}
        </Box>
      </ClickAwayListener>
    </>
  )
}

ToolbarFontFeatures.propTypes = {
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
