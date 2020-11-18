import React, { Component } from "react";
import axios from "axios";
import { idGenerator } from '../../modules/idGenerator';
import { Paper, Container, Fab, Box, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Avatar, Typography, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import ProductsInput from './ProductsInput/ProductsInput';
import ProductDetails from './ProductDetails/ProductDetails';
import PersonalSurvey from './PersonalSurvey/PersonalSurvey';
import NutrientSummary from './NutrientSummary/NutrientSummary';
import GetDialog from './GetDialog/GetDialog';
import { short_nutrients as nutrient_temp } from '../../modules/nutrientData';

const useStyles = theme => ({
  root: {
    padding: 0,
  },
  wrapper: {
    display: 'flex',
    boxSizing: 'border-box',
    minHeight: 'calc(100vh - 160px)',
    width: '100%',
    padding: '32px 0',
    marginTop: '32px',
  },
  accordion: {
    width: '100%',
    marginRight: '10px',
  },
  accordionSummary: {
    display: 'flex',
    flexFlow: 'row wrap !important',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  list: {
    height: '100%',
    width: '100%',
    padding: '10px 0px',
    boxSizing: 'border-box',
  },
  listItem: {
    minHeight: '50px',
    marginBottom: '5px',
    paddingLeft: 0,
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: '10px',
  },
  contentContainer:{
    width: '50%'
  },
  listContainer:{
    display: 'flex',
    flexFlow: 'column nowrap',
    borderRight: '1px solid #ccc',
    width: '50%',
    textAlign: 'center',
  },
  kcalNeed: {
    backgroundColor: ``,
  },
  fab: {
    display: 'none',
  },
  '@media (max-width: 960px)' : {
    productsInput: {
      display: 'none'
    },
    avatar: {
      display: 'none'
    },
    accordionSummary: {
      flexFlow: 'column wrap',
    },
    contentContainer:{
      width: '100%'
    },
    listContainer:{
      border: 'none',
      width: '100%',
    },
    fab: {
      display: 'block',
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
      zIndex: 1000,
    },
  }
});

class ShoppingList extends Component {
  state = {
    products: [],
    nutrients: [],
    loading: false,
    dialogOpen: false,
    iterator: 0,
    kcalNeed: null,
  }

  getProductsHandler = async (input) => {
    this.setState((prevState) => {return {loading: !prevState.loading}});
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
            key: this.state.iterator,
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
          this.state.iterator++;
          this.setState({ products: newProductsState });
        }
      }).then(()=>{
        this.sumNutrients();
        this.setState((prevState) => {return {loading: !prevState.loading}});
      })
  };
  deleteItemBtnHandler = (e) => {
    const targetId = e.target.closest('li').children[0].id;
    const oldStateProducts = [...this.state.products];
    const index = oldStateProducts.findIndex((item) => item.id === targetId);
    oldStateProducts.splice(index, 1);
    this.setState({ products: oldStateProducts }, () => {
      this.sumNutrients();
    });
  };
  calculateKcalNeed = (data) => {
    const { gender, age, height, weight, activity } = data;
    const activityTab = [1, 1.1, 1.15, 1.2];
    const kcalNeed = ((9.99 * weight) + (6.25 * height) - (4.92 * age) + (gender === 'male' ? 5 : (-161))) * activityTab[activity + 1];
    this.setState({kcalNeed: kcalNeed.toFixed(2)});
  };
  kcalToKcalNeedProportion = () => {
    const kcalNeed = this.state.kcalNeed;
    const kcal = this.state.nutrients[0].value;
    const proc = (kcal / kcalNeed) * 100;
    const step = 5.1;
    const diff = proc > 150 ? 50 : (Math.abs(proc - 100) > 50 ? 50 : Math.abs(proc - 100));
    const safeLimit = 1.2;
    let r = 0;
    let g = 255;
    let b = 0;
    for(let i = diff*2; i > 0; i--){
      if(r < 255){
        r = (Math.round(r * 10)/10) + (Math.round(step * 10)/10);
      } else {
        g = (Math.round(g * 10)/10) - (Math.round(step * 10)/10);
      }
    }
    const color = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    let result = '';
    if(kcal > kcalNeed * safeLimit){
       result = 'Too many daily calories';
    } else if(kcal < kcalNeed * safeLimit){
       result = 'Too little daily calories';
    } else {
      result = 'Optimal daily calories';
    }
    return <Typography variant='subtitle1' style={{color: color, fontWeight: 'bold'}}>{result}</Typography>;
  };
  sumNutrients = () => {
    const data = this.state.products;
    const newNutrients = JSON.parse(JSON.stringify(nutrient_temp));
    if(data){
      data.forEach((item) => {
        item['short_nutrients'].forEach((el, key) => {
          newNutrients[key].value += el.value;
        });
      });
    }
    this.setState({nutrients: [...newNutrients]});
  };
  dialogHandler = () => {
    this.setState((prevState) => {return {dialogOpen: !prevState.dialogOpen}});
  };


  render() { 
    const { classes } = this.props;
    const kcalNeedTypo = this.state.kcalNeed ? (
      <Typography variant='h5'>
        Your daily kcal need is: {this.state.kcalNeed}
      </Typography>
    ) : null;
    const proportionResult = this.state.kcalNeed ? this.kcalToKcalNeedProportion() : null;

    return (
      <Paper className={classes.wrapper}>
        <GetDialog open={this.state.dialogOpen} addProductBtn={this.getProductsHandler} onClose={this.dialogHandler}/>
        <Fab color="primary" aria-label="add" className={classes.fab} onClick={this.dialogHandler}>
          <AddIcon />
        </Fab>
        <Box display="flex" flexDirection="row" flexWrap="wrap" width="100%">
          <Container className={classes.listContainer} >
            <Typography variant='h5'>
              Product list
            </Typography>
            <List className={classes.list}>
              {this.state.products.map((item) => 
                (<ListItem className={classes.listItem} key={item.key} id={item.id}>
                  <Avatar title={'Meal'} alt={'image'} src={item.thumb} className={classes.avatar}/>
                  <Accordion className={classes.accordion}>
                    <AccordionSummary className={classes.accordionSummary} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id={`panel_${item.key}_header`}>
                      <ListItemText primary={item.name}/>
                      <ListItemText secondary={`${item.unit} ${item.weight}g`}/>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ProductDetails data={item.full_nutrients} />
                    </AccordionDetails>
                  </Accordion>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={this.deleteItemBtnHandler}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                  </ListItem>)
              )}
              {this.state.loading ? (<Typography variant='p'>Loading...</Typography>) : null}
            </List>
          </Container>
          <Container className={classes.contentContainer}>
            <ProductsInput  addProductBtn={this.getProductsHandler}/>
            <Accordion>
              <AccordionSummary className={classes.accordionSummary} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id={`calculate-kcal-panel`}>
                <Typography variant="h6">Calculate your daily kcal need</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <PersonalSurvey calculateKcalNeed={this.calculateKcalNeed} kcalNeed={kcalNeedTypo} proportionResult={proportionResult}/>
              </AccordionDetails>
            </Accordion>
            <Accordion>
            <AccordionSummary className={classes.accordionSummary} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id={`calculate-kcal-panel`}>
                <Typography variant="h6">Nutrient summary</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {this.state.nutrients.length ? (<NutrientSummary nutrientList={this.state.nutrients}/>) : (<Typography variant="subtitle1">There's no products on the list!</Typography>)}
              </AccordionDetails>
            </Accordion>
          </Container>
        </Box>
      </Paper>
    );
  }
}
 
export default withStyles(useStyles)(ShoppingList);