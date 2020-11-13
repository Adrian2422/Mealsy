import React, { Component } from "react";
import axios from "axios";
import { idGenerator } from '../../modules/idGenerator';
import { Container, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ListIcon from '@material-ui/icons/List';
import { withStyles } from '@material-ui/core/styles';
import Image from '../UI/Image/Image';
import ProductsInput from './ProductsInput/ProductsInput';

const useStyles = theme => ({
  root: {
    padding: 0,
  },
  wrapper: {
    display: 'flex',
    minHeight: '100%',
  },
  list: {
    height: '100%',
    padding: '10px',
    boxSizing: 'border-box',
  },
  listItem: {
    marginBottom: '5px',
  },
  image: {
    marginRight: '10px',
  },
  contentContainer:{
    height: '100%',
    
  },
  listContainer:{
    height: '100%',

  }
});

class ShoppingList extends Component {
  state = {

  }

  getProductsHandler = async (input) => {
    this.setState({
      dataLoaded: false,
      modalShown: !this.state.modalShown,
    });
    const body = {
      query: input,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-app-id": "2216a622",
        "x-app-key": "51f1cc35a6825eb86b554350da8f159b",
      },
    };
    axios.post("https://trackapi.nutritionix.com/v2/natural/nutrients", body, config)
      .then((response) => {
        const newProductsState = [...this.state.products];
        for (const key in response.data.foods) {
          newProductsState.push({
            key: this.iterator,
            id: idGenerator("prod_", 6),
            name: response.data.foods[key]["food_name"],
            weight: response.data.foods[key]["serving_weight_grams"],
            quantity: response.data.foods[key]["serving_qty"],
            unit: response.data.foods[key]["serving_unit"],
            thumb: response.data.foods[key]["photo"]["thumb"],
            short_nutrients: [
              {
                name: "_calories",
                value: response.data.foods[key]["nf_calories"],
              },
              {
                name: "_total_fat",
                value: response.data.foods[key]["nf_total_fat"],
              },
              {
                name: "_saturated_fat",
                value: response.data.foods[key]["nf_saturated_fat"],
              },
              {
                name: "_cholesterol",
                value: response.data.foods[key]["nf_cholesterol"],
              },
              { name: "_sodium", value: response.data.foods[key]["nf_sodium"] },
              {
                name: "_total_carbohydrate",
                value: response.data.foods[key]["nf_total_carbohydrate"],
              },
              {
                name: "_dietary_fiber",
                value: response.data.foods[key]["nf_dietary_fiber"],
              },
              { name: "_sugars", value: response.data.foods[key]["nf_sugars"] },
              {
                name: "_protein",
                value: response.data.foods[key]["nf_protein"],
              },
              {
                name: "_potassium",
                value: response.data.foods[key]["nf_potassium"],
              },
              { name: "_p", value: response.data.foods[key]["nf_p"] },
            ],
            full_nutrients: response.data.foods[key]["full_nutrients"],
          });
          this.iterator++;
          this.setState({ products: newProductsState });
        }
      })
      .then(() => {
        this.sumNutrients(this.INITIAL_SHORT_NUTRIENTS, this.state.products);
      })
      .then(() => {
        this.setState({ dataLoaded: true });
      });
  };

  render() { 
    const { classes } = this.props;
    return (
      <Container className={classes.wrapper}>
        <Container className={classes.listContainer}>
          <List dense className={classes.list}>
            <ListItem className={classes.listItem}>
              <Image className={classes.image} src={null} title={'Meal'} alt={'image'}/>
              <ListItemText primary="name"/>
              <ListItemText secondary="unit weight"/>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <ListIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Image className={classes.image} src={null} title={'Meal'} alt={'image'}/>
              <ListItemText primary="name"/>
              <ListItemText secondary="unit weight"/>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <ListIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Container>
        <Container className={classes.contentContainer}>
          <ProductsInput />
        </Container>
      </Container>
      
    );
  }
}
 
export default withStyles(useStyles)(ShoppingList);