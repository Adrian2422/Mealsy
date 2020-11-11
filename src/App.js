import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Layout from './containers/Layout/Layout';
import Navbar from './components/UI/Navbar/Navbar'
import Sidebar from './components/UI/Sidebar/Sidebar';
import Container from './containers/Container/Container';
import Draw from './components/Draw/Draw';

const useStyles = theme => ({
  root: {
    padding: 0,
  },
  
});

class App extends Component {
  state = {
    chosenLink: null,
    drawerOpened: false,
  };

  drawerHandler = () => {
    this.setState((prevState) => {return {drawerOpened: !prevState.drawerOpened}});
  }
  drawerItemHandler = (e) => {
    const value = e.target.getAttribute('value');
    this.setState({chosenLink: value});
  }
  render(){
    const { classes } = this.props;

    let containerContent = null;
    switch (this.state.chosenLink) {
      case '1':
        containerContent = <Draw/> 
        break;
      default:
        break;
    }
    return (
      <div className={classes.root + "App"}>
        <Layout>
          <Navbar hamburgerClicked={this.drawerHandler}/>
          <Sidebar backdropClicked={this.drawerHandler} opened={this.state.drawerOpened} chosenLink={this.drawerItemHandler}/>
          <Container>
            {containerContent}
          </Container>
        </Layout>
      </div>
    ); 
  }
}

export default withStyles(useStyles)(App);
