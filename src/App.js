import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Layout from './containers/Layout/Layout';
import Navbar from './components/UI/Navbar/Navbar'
import Sidebar from './components/UI/Sidebar/Sidebar';
import { Box, Container, ThemeProvider } from '@material-ui/core';
import Draw from './components/Draw/Draw';
import Home from './components/Home/Home';
import ShoppingList from './components/ShoppingList/ShoppingList';
import Products from './components/Products/Products';
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
  state = {
    darkTheme: false,
    drawerOpened: false,
  };

  drawerHandler = () => {
    this.setState((prevState) => {return {drawerOpened: !prevState.drawerOpened}});
  }
  themeButtonHandler = () => {
    this.setState((prevState) => {return {darkTheme: !prevState.darkTheme}});
  };

  render(){
    const { classes } = this.props;
    const appliedTheme = createMuiTheme(this.state.darkTheme ? darkTheme : lightTheme)

    return (
      <ThemeProvider theme={appliedTheme}>
        <Box className={classes.root + " App"} bgcolor="background.default">
        <Layout>
          <Navbar theme={this.state.darkTheme} hamburgerClicked={this.drawerHandler} themeBtn={this.themeButtonHandler}/>
          <Router>
            <Sidebar backdropClicked={this.drawerHandler} opened={this.state.drawerOpened}/>
            <Container className={classes.contentWrapper}>
                <Route path="/" exact component={Home}/>
                <Route path="/draw_a_meal" component={Draw}/>
                <Route path="/shopping_list" component={ShoppingList}/>
                <Route path="/products" component={Products}/>
            </Container>
          </Router>
        </Layout>
      </Box>
      </ThemeProvider>
    ); 
  }
}

export default withStyles(useStyles)(App);
