import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { Typography, Paper, Button, Box, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, TextField } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
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
    height: 'fit-content',
    width: 'fit-content',
    margin: 'auto',
  },
  input:{
    margin: '8px 0'
  },
  button_group: {
    marginTop: '8px',
  },
  button: {
    margin: '0 4px',
    float: 'right',
  },
});

function Register(props) {
  const history = useHistory();
  const { classes } = props;
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: '',
    age: false,
    permissions: 3,
    confirmPassword: ''
  });
  const [snackbar, setSnackbar] = useState({open: false, severity: '', message: ''});
  const snackbarHandler = () => setSnackbar({ open: false, severity: '', message: ''});
  const changeHandler = e => setUserData({...userData, [e.target.name]: e.target.value});
  const checkboxHandler = () => setUserData({...userData, "age": !userData.age});
  const redirect = props.registered ? (<Redirect to='/login' />) : null;

  const registerHandler = () => {
    const { password, confirmPassword } = userData;
    if(Object.values(userData).some(value => value === '')){
      setSnackbar({ open: true, severity: 'warning', message: 'Enter all data!'});
    } else if(password !== confirmPassword) {
      setSnackbar({ open: true, severity: 'warning', message: "Passwords don't match!"});
    } else {
      props.register(userData);
      if(props.registered){
        setSnackbar({ open: true, severity: 'success', message: 'You have been successfully registered, now you can login!'});
      } else {
        setSnackbar({ open: true, severity: 'error', message: 'Something went wrong, registration failed...'});
      }
    }
  }

  return (
    <Box className={classes.root}>
    {redirect}
      <Paper className={classes.login_data}>
      <FormControl className={classes.inputGroup} component="fieldset" autoComplete="off">
          <FormLabel component="legend">Register</FormLabel>
            <TextField className={classes.input} name="username" label="Username" onChange={changeHandler} />
            <TextField className={classes.input} name="password" label="Password" onChange={changeHandler} />
            <TextField className={classes.input} name="confirmPassword" label="Confirm password" onChange={changeHandler} />
            <TextField className={classes.input} name="email" label="Email" onChange={changeHandler} />
            <FormGroup>
              <FormControlLabel
                control={<Checkbox onChange={checkboxHandler} name="age" />}
                label={`I am over 18 years old *`}
              />
            </FormGroup>
            <Typography variant="caption" gutterBottom>
            * This checkbox is used to express consent to offering alcoholic beverages when arranging dishes or picking products.
            </Typography>
            <div className={classes.button_group}>
              <Button className={classes.button} variant="contained" size='small' color="secondary" endIcon={<NavigateNextIcon />} onClick={registerHandler}>Register</Button>
              <Button className={classes.button} variant="contained" size='small' color="secondary" startIcon={<NavigateBeforeIcon />} onClick={() => {history.goBack();}}>Cancel</Button>
            </div>
        </FormControl>
      </Paper>
      <Snackbar open={snackbar.open} severity={snackbar.severity} message={snackbar.message} closeSnackbar={snackbarHandler}/>
    </Box>
  );
}
 
export default withStyles(useStyles)(Register) ;