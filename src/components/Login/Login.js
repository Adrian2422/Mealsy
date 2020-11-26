import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import { Paper, Button, CircularProgress, Box, FormControl, FormLabel, TextField, Typography } from '@material-ui/core';
import Snackbar from '../UI/Snackbar/Snackbar';

const useStyles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
    height: 'calc(100vh - 128px)',
    justifyContent: 'center',
  },
  login_data: {
    padding: '32px',
    display: 'flex',
    flexFlow: 'column nowrap',
    height: 'fit-content',
    width: 'fit-content',
    margin: 'auto',
  },
  input:{
    margin: '8px 0'
  },
  button: {
    margin: '8px 0 16px 0',
    width: 'fit-content',
    alignSelf: 'flex-end',
  },
  login_spinner: {
    alignSelf: 'flex-end',
  },
  register_info: {
    marginTop: '8px',
  },
  register_link:{
    ...theme.typography.button,
    padding: theme.spacing(1),
    borderRadius: '4px',
    background: theme.palette.secondary.main,
    textDecoration: 'none',
    color: theme.palette.secondary.contrastText,
    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      background: theme.palette.secondary.dark,
    }
  }
});
function Login(props) {
  const { classes } = props;
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  });
  const [loginProgress, setLoginPogress] = useState(false);
  const [snackbar, setSnackbar] = useState({open: false, severity: '', message: ''});
  const snackbarHandler = () => setSnackbar({ open: false, severity: '', message: ''});
  const changeHandler = e => setUserData({...userData, [e.target.name]: e.target.value});
  
  const loginHandler = () => {
    const { username, password } = userData;
    if(Object.values(userData).some(value => value === '')){
      setSnackbar({ open: true, severity: 'warning', message: 'Enter all data!'});
    } else if (username.length < 8){
      setSnackbar({ open: true, severity: 'warning', message: 'Username is too short!'});
    } else if (password.length < 8){
      setSnackbar({ open: true, severity: 'warning', message: 'Password is too short!'});
    } else {
      props.login(userData);
      setLoginPogress(true);
    }
  };
  
  const redirect = props.isUserLogged ? (<Redirect to='/' />) : ( 
    <Box className={classes.root}>
      <Paper className={classes.login_data}>
      <FormControl className={classes.inputGroup} component="fieldset" autoComplete="off">
          <FormLabel component="legend">Log in</FormLabel>
            <TextField className={classes.input} name="username" label="Username" onChange={changeHandler} />
            <TextField className={classes.input} name="password" label="Password" onChange={changeHandler} />
            {loginProgress ? <CircularProgress className={classes.login_spinner}/> : <Button className={classes.button} variant="contained" size='small' color="secondary" onClick={loginHandler}>Log in</Button>}
        </FormControl>
        <Typography className={classes.register_info} variant="body2" gutterBottom>
          You dont have an account yet? Click <a href='../register' className={classes.register_link}>here</a> to register.
        </Typography>
      </Paper>
      <Snackbar open={snackbar.open} severity={snackbar.severity} message={snackbar.message} closeSnackbar={snackbarHandler}/>
    </Box>
  );
  return redirect;
}
 
export default withStyles(useStyles)(Login) ;