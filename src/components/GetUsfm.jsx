import { Button, Dialog, DialogActions, DialogTitle, Stack, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import * as importPlaceholder from '../data/importPlaceholder.usfm.js'

export default function GetUsfm(getUsfmProps) {
  const {
    onOpenClick,
    handleUsfmText,
    handleFilename,
    open,
    handleGetUsfm,
    loadingStatus,
    handleUsfmFileLoaded,
  } = getUsfmProps;

  const messageTitle = "Open or Import a Book"
  
  const importedUsfm = importPlaceholder.usfmText;

  const handleImport = async () => {
    loadingStatus(true);
    const usfmImport = await importedUsfm; // Change to imported data
    const filePath = 'importFilename.usfm'; // file?.usfm Change to imported data
    if (filePath !== null) {
      const extStr = filePath?.substring(filePath?.lastIndexOf("."))
      if (extStr === ".usfm") {
        const contents = await usfmImport;
        handleFilename(filePath);
        proceed(contents, filePath);
      } else {
        console.log("invalid file extension")
      }
    } else {
      console.log("invalid file")
    }
  };
  
  const proceed = (contents) => {
    handleUsfmText(contents);
    handleUsfmFileLoaded(true);
    handleGetUsfm(false);
    loadingStatus(false);
  };

  const handleClose = () => {
    handleGetUsfm(false);
  };

  return (
      <Dialog
        open={open}
        // fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ whiteSpace: "pre-wrap" }}
      >
        <DialogTitle id="alert-dialog-title">
          {messageTitle}
        </DialogTitle>
        <DialogActions>
          <Grid container justifyContent="center">
            <Stack direction="column" spacing={0.75}>
              <Button
                  onClick={onOpenClick}
                  autoFocus // not working
                  variant="outlined" // use this for now as an alternative to autoFocus
              >
                Open Usfm
              </Button>
              <Button onClick={handleImport}>
                Import from Word Processor
              </Button>
            </Stack>
          </Grid>
        </DialogActions>
      </Dialog>
  );
}

GetUsfm.propTypes = {
  /** Open File Function */
  onOpenClick: PropTypes.func.isRequired,
  /** handleUsfmText Function runs setUsfmText */
  handleUsfmText: PropTypes.func.isRequired,
  /** handleFilename Function runs setFilename */
  handleFilename: PropTypes.func.isRequired,
  /** Open? */
  open: PropTypes.bool,
  /** handleGetUsfm Function runs setOpen */
  handleGetUsfm: PropTypes.func.isRequired,
  /** loadingStatus Function runs setLoading */
  loadingStatus: PropTypes.func.isRequired,
  /** handleUsfmFileLoaded Function runs setUsfmFileLoaded */
  handleUsfmFileLoaded: PropTypes.func.isRequired,
};

GetUsfm.defaultProps = {
  open: false,
};
