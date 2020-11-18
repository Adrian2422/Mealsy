import React, { Component } from 'react';
import { Paper, Container, InputBase, IconButton, Typography} from '@material-ui/core';
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import ProductsResult from './ProductsResult/ProductsResult';
import ProductsResultDetails from './ProductsResultDetails/ProductsResultDetails';
import SearchIcon from '@material-ui/icons/Search';
import { idGenerator } from '../../modules/idGenerator';

const useStyles = theme => ({
  root:{
    padding: '32px 0',
    display: 'flex',
    minHeight: 'calc(100vh - 160px)',
  },
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignSelf: 'center',
    width: '100%',
  },
  searchResults:{
    maxWidth: 400,
    color: theme.palette.textColor.contrast,
  },
  noResult:{
    margin: '32px auto',
    color: theme.palette.textColor.contrast,
  },
  resultInfo:{
    display: 'flex',
    flexFlow: 'row nowrap',
    width: '100%',
    alignItems: '',
  },
  input: {
    backgroundColor: theme.palette.background.paper,
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  '@media (max-width: 960px)' : {
    root: {
      flexFlow: 'column nowrap',

    }
  }
});
class Products extends Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()  
}
  state = { 
    query: null,
    productsInfo: null,
    chosenItem: null,
    searching: false,
  }
  executeScroll = () => {
    if(window.screen.width < 961 ){
      this.myRef.current.scrollIntoView({behavior: 'smooth'});
    }
  };
  setQueryState = (e) => {
    const userQuery = e.target.value;
    this.setState({query: userQuery})
  };
  getProductInfo = async () => {
    if(!this.state.searching){
      this.setState((prevState) => {return {searching: !prevState.searching}});
      const query = this.state.query;
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-app-id": "2216a622",
          "x-app-key": "51f1cc35a6825eb86b554350da8f159b",
        },
      };
      axios.get(`https://trackapi.nutritionix.com/v2/search/instant?query=${query}&detailed=true`, config)
      .then((response)=>{
        const newData = response.data;
        newData.common.forEach((item, index)=>{
          const newId = idGenerator('item_common_', 6);
          item['my_id'] = newId;
        });
        newData.branded.forEach((item, index)=>{
          const newId = idGenerator('item_branded_', 6);
          item['my_id'] = newId;
        });
        this.setState({productsInfo: response.data});
        this.setState((prevState) => {return {searching: !prevState.searching}});
      })
    }
  };
  chosenItemHandler = (e) => {
    const targetId = e.target.closest('li').id;
    const chosenItemCategory = targetId.includes('common') ? 'common' : (targetId.includes('branded') ? 'branded' : 'self');
    const chosenItem = this.state.productsInfo[chosenItemCategory].find(item => item['my_id'] === targetId);
    this.setState({chosenItem: chosenItem});
  };


  render() {
    const { classes } = this.props;
    const results = this.state.productsInfo ? (
      <ProductsResult resultsBranded={this.state.productsInfo.branded} resultsCommon={this.state.productsInfo.common} chosenItemHandler={this.chosenItemHandler}/>
    ) : null;
    const details = this.state.chosenItem ? (<ProductsResultDetails data={this.state.chosenItem} loaded={this.executeScroll}/>) : (<Typography variant='h4' className={classes.noResult}>Choose item from list on the left</Typography>);

    return ( 
      <Container className={classes.root}>
        <Container className={classes.searchResults}>
          <Paper className={classes.search}>
            <InputBase className={classes.input} id="product-name-input" placeholder="Search products" inputProps={{ 'aria-label': 'search products'}} onChange={this.setQueryState} />
            <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={this.getProductInfo}>
              <SearchIcon />
            </IconButton>
          </Paper>
          {results}
        </Container>
        <Container className={classes.resultInfo} ref={this.myRef}>
          {details}
        </Container>
      </Container>
     );
  }
}
 
export default withStyles(useStyles)(Products);