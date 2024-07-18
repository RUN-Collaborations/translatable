import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

export default function WordAttributesAndAlignment(wordAttributesAndAlignmentProps) {
  const {
    dialogType,
    openDialog,
    setOpenDialog,
    wEmptyNum,
    wEmptyLemmaOnlyNum,
    filename,
    setStripAlignment,
  } = wordAttributesAndAlignmentProps

  const [messageTitle, setMessageTitle] = useState("");
  const [message, setMessage] = useState("");
  const [question, setQuestion] = useState("");
  
  const wordForWrappers = (wEmptyNum === 1 ? "wrapper" : "wrappers");
  const wordForAttributes = (wEmptyLemmaOnlyNum === 1 ? "attribute" : "attributes"); 
  const emptyW = (wEmptyNum > 0 ? " " + wEmptyNum + " empty word attribute " + wordForWrappers + " -- |\\w*" : "");
  const lineBr = (wEmptyNum > 0 && wEmptyLemmaOnlyNum > 0 ? "\n" : "")
  const emptyLemmas = (wEmptyLemmaOnlyNum > 0 ? " " + wEmptyLemmaOnlyNum + " empty lemma " + wordForAttributes + " -- |lemma=\"\" \\w*" : "");
  
  useEffect(() => {
    if (dialogType === "empty word attributes") {
      setMessageTitle("Word Attributes -- \\w");
      setMessage(filename + " includes:\n" + emptyW + lineBr + emptyLemmas);
      setQuestion("Remove all word attribute markers on save?");
    }
  }, [dialogType, filename, emptyLemmas, emptyW, lineBr]);

  const handleYes = (event, reason) => {
    if(reason !== ' k' && reason !== 'escapeKeyDown') {
      setOpenDialog(false);
      setStripAlignment(true);
    }
  };

  // handleNo is the same as what would otherwise be handleClose
  const handleNo = (event, reason) => {
    if(reason !== ' k' && reason !== 'escapeKeyDown') {
      setOpenDialog(false);
    }
  };

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleNo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ whiteSpace: "pre-wrap" }}
      >
        <DialogTitle id="alert-dialog-title">
          {messageTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <small>{message}</small>
            <br />
            <br />
            <b>{question}</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNo}>No</Button>
          <Button variant="outlined" onClick={handleYes} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

WordAttributesAndAlignment.propTypes = {
  /** Dialog Type */
  dialogType: PropTypes.string.isRequired,
  /** Open Dialog? */
  openDialog: PropTypes.bool.isRequired,
  /** Set Open Dialog Boolean */
  setOpenDialog: PropTypes.func.isRequired,
  /** Number of Empty Word Attribute Wrappers -- |\w* */
  wEmptyNum: PropTypes.number.isRequired,
  /** Number of Empty Lemmas as the Only Word Attribute -- |lemma="" \w* */
  wEmptyLemmaOnlyNum: PropTypes.number.isRequired,
  /** File Name */
  filename: PropTypes.string.isRequired,
  /** Set Strip Alignment Boolean */
  setStripAlignment: PropTypes.func.isRequired,
};
