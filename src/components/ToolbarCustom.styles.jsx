export const sx = {
  title: {
    fontWeight: 'bold',
    m: 1, flexGrow: 1,
    color: '#ffffff',
  },
  extendedIcon: {
    marginRight: theme => theme.spacing(1),
    marginLeft: theme => theme.spacing(1),
  },
  fab: {
    "&.Mui-disabled": {
      backgroundColor: "#e0e0e0",
    }
  },
  select: {
      /** '.MuiOutlinedInput-notchedOutline': { borderColor: 'yellow'},
      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'yellow', borderWidth: '0.15rem'}, */
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {borderColor: "yellow", borderWidth: "thin"},
      background: 'white',
      fontSize: '1.2em',
  },
  selectsmall: {
    /** Not used. */
    height: 28,
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {borderColor: "yellow", borderWidth: "thin"},
    background: 'white',
    fontSize: '1.2em',
  },
  inputLabel: {
    background: '#124116',
    color: 'white',
    "&.Mui-focused": {color: "yellow"},
  },
}

export default sx;