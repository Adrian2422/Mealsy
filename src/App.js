import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Layout from './containers/Layout/Layout';
import Navbar from './components/UI/Navbar/Navbar'
import Sidebar from './components/UI/Sidebar/Sidebar';
import { Box, Container, ThemeProvider } from '@material-ui/core';
import Draw from './components/Draw/Draw';
import Home from './components/Home/Home';
import ShoppingList from './components/ShoppingList/ShoppingList';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Logout from './components/Login/Logout';
import Register from './components/Register/Register';
import Snackbar from './components/UI/Snackbar/Snackbar';
import { lightTheme, darkTheme } from './components/Theme/Theme';

const useStyles = theme => ({
  root: {
  },
  contentWrapper: {
    padding: '64px 0',
    minHeight: '100vh',
  }
  
});

class App extends Component {
  cookies = new Cookies();
  state = {
    darkTheme: false,
    drawerOpened: false,
    userIsLogged: this.cookies.get('token') ? true : false,
    loginState: 'none',
    loginResult: false,
    snackbar: {open: false, severity: '', message: ''},
  };
  
  drawerHandler = () => {
    this.setState((prevState) => {return {drawerOpened: !prevState.drawerOpened}});
  }
  themeButtonHandler = () => {
    this.setState((prevState) => {return {darkTheme: !prevState.darkTheme}});
  };
  snackbarHandler = () => this.setState({snackbar: {open: false, severity: 'info', message: 'none'}});

  registerHandler = (data) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios.post(`https://warm-wildwood-45002.herokuapp.com/api/register`, data, config)
      .then((response)=>{
        
      })
  };
  loginHandler = async (data) => {
    console.log('Trying to log in');
    this.setState({loginState: 'pending'});
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.post(`https://warm-wildwood-45002.herokuapp.com/api/login`, data, config)
    .then((response)=>{
      this.setState({loginState: 'resolved'});
      const data = response.data
      console.log('resolved', data);
      if(data.token){
        this.cookies.set('token', data.token, { path: '/', maxAge: 2592000});
        //  cookies.set('user_id', data.id, { path: '/', maxAge: 2592000});
        this.setState({loginResult: true, userIsLogged: true});
      } else {
        this.setState({loginResult: false});
      }
    })
    .catch((error) => {
      this.setState({loginResult: false});
      console.log(error, 'Failed login');
    })
    if(this.state.loginState === 'resolved' && this.state.loginResult){
      this.setState({snackbar: { open: true, severity: 'success', message: 'You have logged in successfully!'}});
    } else if(this.state.loginState === 'resolved' && !this.state.loginResult){
      this.setState({snackbar: { open: true, severity: 'error', message: 'Something went wrong, log in failed...'}});
    }
  }
  logoutHandler = () => {
    this.cookies.remove('token');
    this.cookies.remove('user_id');
    this.setState({userIsLogged: false})
    this.setState({snackbar: { open: true, severity: 'success', message: 'You have been logged out!'}});
  };
  componentDidUpdate(){
    this.cookies.set('dark_theme', this.state.darkTheme, { path: '/', maxAge: 2592000});
  }

  render(){
    const { classes } = this.props;
    const appliedTheme = createMuiTheme(this.state.darkTheme ? darkTheme : lightTheme)
    const {loginState, loginResult, snackbar} = this.state;
    
    return (
      <ThemeProvider theme={appliedTheme}>
        <Box className={classes.root + " App"} bgcolor="background.default">
        <Layout>
          <Navbar theme={this.state.darkTheme} hamburgerClicked={this.drawerHandler} themeBtn={this.themeButtonHandler} checkLogin={this.state.userIsLogged} logout={this.logoutHandler}/>
          <Router>
            <Sidebar backdropClicked={this.drawerHandler} opened={this.state.drawerOpened} checkLogin={this.state.userIsLogged}/>
            <Container className={classes.contentWrapper}>
              <Route path="/" exact component={Home}/>
              <Route path="/draw_a_meal" component={Draw}/>
              <Route path="/shopping_list" component={ShoppingList}/>
              <Route path="/products" component={Products}/>
              <Route path="/login" render={(props) => <Login {...props} login={this.loginHandler} isUserLogged={this.state.userIsLogged}/>}/>
              <Route path="/logout" render={(props) => <Logout {...props} logout={this.logoutHandler}/>}/>
              <Route path="/register" render={(props) => <Register {...props} register={this.registerHandler}/>}/>
            </Container>
          </Router>
        </Layout>
      </Box>
      <Snackbar open={snackbar.open} severity={snackbar.severity} message={snackbar.message} closeSnackbar={this.snackbarHandler}/>
      </ThemeProvider>
    ); 
  }
}

export default withStyles(useStyles)(App);
