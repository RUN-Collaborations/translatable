import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import SourceIcon from '@mui/icons-material/Source';
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
  const { title, onOpenClick, } = headerProps;

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
            onClick={onOpenClick}
          >
            <SourceIcon sx={sx.extendedIcon} />
          </Fab>
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
};
