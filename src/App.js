import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Layout from './containers/Layout/Layout';
import Navbar from './components/UI/Navbar/Navbar'
import Sidebar from './components/UI/Sidebar/Sidebar';
import { Container, ThemeProvider } from '@material-ui/core';
import Draw from './components/Draw/Draw';
import Home from './components/Home/Home';
import ShoppingList from './components/ShoppingList/ShoppingList';
import { lightTheme, darkTheme } from './components/Theme/Theme';

const useStyles = theme => ({
  root: {
  },
  contentWrapper: {
    padding: '64px 0 0 0',
    display: 'flex',
    minHeight: '100vh',
  }
  
});

class App extends Component {
  state = {
    darkTheme: false,
    themeBtnHovered: false,
    drawerOpened: false,
  };

  drawerHandler = () => {
    this.setState((prevState) => {return {drawerOpened: !prevState.drawerOpened}});
  }
  themeButtonHandler = () => {
    this.setState((prevState) => {return {darkTheme: !prevState.darkTheme}});
  };
  themeBtnHoverHandler = () => {
    this.setState((prevState) => {return {themeBtnHovered: !prevState.themeBtnHovered}});
  };

  render(){
    const { classes } = this.props;

    return (
      <ThemeProvider theme={lightTheme}>
        <div className={classes.root + "App"}>
        <Layout>
          <Navbar theme={this.state.darkTheme} themeHover={this.state.themeBtnHovered} hamburgerClicked={this.drawerHandler} themeBtn={this.themeButtonHandler} themeBtnHovered={this.themeBtnHoverHandler}/>
          <Router>
            <Sidebar backdropClicked={this.drawerHandler} opened={this.state.drawerOpened}/>
            <Container className={classes.contentWrapper}>
                <Route path="/" exact component={Home}/>
                <Route path="/draw_a_meal" component={Draw}/>
                <Route path="/shopping_list" component={ShoppingList}/>
            </Container>
          </Router>
        </Layout>
      </div>
      </ThemeProvider>
    ); 
  }
}

export default withStyles(useStyles)(App);
