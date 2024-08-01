import { useState, useEffect } from 'react';
import {
  Button, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import PropTypes from 'prop-types';

export default function WordAttributesAndAlignment(dialogType, filename, wEmptyNum, wEmptyLemmaOnlyNum) {
  /*
  The await promise setup currently cannot handle Javascript default parameters!!
  const {
    messageTitle,
    message,
    question,
  } = wordAttributesAndAlignmentProps;
  */

  const [promise, setPromise] = useState(null);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageUl, setMessageUl] = useState("");
  const [messageLi1, setMessageLi1] = useState("");
  const [messageLi2, setMessageLi2] = useState("");
  const [question, setQuestion] = useState("");

  // wEmptyNum = Number of Empty Word Attribute Wrappers -- |\w*
  // wEmptyLemmaOnlyNum = Number of Empty Lemmas as the Only Word Attribute -- |lemma="" \w*
  const wordForWrappers = (wEmptyNum === 1 ? "wrapper" : "wrappers");
  const wordForAttributes = (wEmptyLemmaOnlyNum === 1 ? "attribute" : "attributes"); 
  const emptyW = (wEmptyNum > 0 ? wEmptyNum + " empty word attribute " + wordForWrappers : "");
  const emptyLemmas = (wEmptyLemmaOnlyNum > 0 ? wEmptyLemmaOnlyNum + " empty lemma " + wordForAttributes : "");
  
  useEffect(() => {
    if (dialogType === "empty word attributes") {
      setMessageTitle("Word Attributes -- \\w");
      setMessageUl("'" + filename + "':");
      setMessageLi1("has " + emptyW);
      setMessageLi2("has " + emptyLemmas);
      setQuestion("Remove all word attribute markers on save?");
    } else {
    if (dialogType === "none") {
      promise?.resolve(true);
    } else {
      promise?.resolve(false);
    }
      handleClose();
    }
  }, [dialogType, emptyLemmas, emptyW, filename, promise]);


  const message = (
    <>
        <b>{messageUl}</b><br />
          {emptyW !== "" ? <span>{'  '}{'\u25CF'} {messageLi1} -- <font color="#124116">|\w*</font><br /></span> : ""}
          {emptyLemmas !== "" ? <span>{'  '}{'\u25CF'} {messageLi2} -- <font color="#124116">|lemma=&quot;&quot; \w*</font><br /></span> : ""}
          <br />
          <b>{question}</b>
    </>
  )

  const decided = () => 
    new Promise((resolve) => {
      setPromise({ resolve });
  });

  const handleClose = () => {
    setPromise(null);
  };

  const handleYes = (event, reason) => {
    if(reason !== ' k' && reason !== 'escapeKeyDown') {
      promise?.resolve(true);
      handleClose();
    }
  };

  const handleNo = (event, reason) => {
    if(reason !== ' k' && reason !== 'escapeKeyDown') {
      promise?.resolve(false);
      handleClose();
    }
  };

  const showDialog = (
    dialogType != "empty word attributes"
    ?
      ""
    :
      <Dialog
        open={promise !== null}
        // fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ whiteSpace: "pre-wrap" }}
      >
        <DialogTitle id="alert-dialog-title">
          {messageTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNo}>No</Button>
          <Button
            onClick={handleYes}
            autoFocus // not working
            variant="outlined" // use this for now as an alternative to autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
  );

  const DecisionDialog = () => (
    showDialog
  );
  return [DecisionDialog, decided];
}

WordAttributesAndAlignment.propTypes = {
  /** Dialog Type */
  dialogType: PropTypes.string.isRequired,
  /** File Name */
  filename: PropTypes.string.isRequired,
  /** Number of Empty Word Attribute Wrappers -- |\w* */
  wEmptyNum: PropTypes.number.isRequired,
  /** Number of Empty Lemmas as the Only Word Attribute -- |lemma="" \w* */
  wEmptyLemmaOnlyNum: PropTypes.number.isRequired,
};