import { AppBar, Toolbar, Typography, Fab } from '@mui/material';
import SourceIcon from '@mui/icons-material/Source';
import GetUsfm from './GetUsfm';
import PropTypes from 'prop-types';

const sx = {
  title: {
    fontWeight: 'bold',
    m: 1,
    flexGrow: 1,
    color: '#ffffff',
  },
  extendedIcon: {
    marginRight: theme => theme.spacing(1),
    marginLeft: theme => theme.spacing(1),
    // bgcolor: "#124116",
  },
}

export default function Header(headerProps) {
  const {
    title,
    onOpenClick,
    handleUsfmText,
    handleFilename,
    loadingStatus,
    handleUsfmFileLoaded,
    handleGetUsfm,
    setOpen,
    open = false,
  } = headerProps;

const handleOpen = () => { 
  handleGetUsfm(true);
};

const getUsfmProps = {
  handleGetUsfm,
  onOpenClick,
  handleUsfmText,
  handleFilename,
  open,
  setOpen,
  loadingStatus,
  handleUsfmFileLoaded,
};

  return (
    <AppBar position='fixed' sx={{ bgcolor: "#124116" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>  
        <div className='flex flex-1 justify-center items-center'>
          <Typography
            variant='h4'
            sx={sx.title}
          >
            {title}
          </Typography>
        </div>
        <>
          <Fab
            //color='primary'
            aria-label='view'
            variant='extended'
            onClick={handleOpen}
          >
            <SourceIcon sx={sx.extendedIcon} />
          </Fab>
          <GetUsfm {...getUsfmProps} />
        </>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  /** Header Title */
  title: PropTypes.string,
  /** Open File Function */
  onOpenClick: PropTypes.func.isRequired,
  /** handleUsfmText */
  handleUsfmText: PropTypes.func.isRequired,
  /** handleFilename */
  handleFilename: PropTypes.func.isRequired,
  /** loadingStatus */
  loadingStatus: PropTypes.func.isRequired,
  /** handleUsfmFileLoaded */
  handleUsfmFileLoaded: PropTypes.func.isRequired,
  /** handleGetUsfm */
  handleGetUsfm: PropTypes.func.isRequired,
  /** setOpen */
  setOpen: PropTypes.func.isRequired,
  /** open */
  open: PropTypes.bool,
  };
