import React, {useState} from 'react';
import axios from 'axios';
import { makeStyles, Button, Container } from '@material-ui/core';
import Recipe from './Recipe';
import { ReactComponent as Spinner } from '../../assets/spinner.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'fit-content',
    textAlign: 'center',
    '& div': {
    }
  },
  button: {
    margin: '64px 0',
    fontSize: '2em'
  }
}));

export default function Draw(props) {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [meal, setMeal] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  const filteredKeys = (obj, filter) => {
    let key,
      keys = [];
    for (key in obj)
      if (obj.hasOwnProperty(key) && filter.test(key)) keys.push(key);
    return keys;
  };
  const generateMeal = () => {
    const newState = [];
    setLoaded(false);
    setLoading(true);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then((response) => {
        setMeal(response.data.meals[0]);
      })
      .then(() => {
        const ingredients = filteredKeys(meal, /strIngredient/);
        const amount = filteredKeys(meal, /strMeasure/);
        for (let i = 0; i < ingredients.length; i++) {
          newState.push({
            id: i,
            name: meal[ingredients[i]],
            value: meal[amount[i]],
          });
        }
      })
      .then(() => {
        setIngredients(newState);
        setLoaded(true);
        setLoading(false);
      });
  };

  const classes = useStyles();
  let recipe = loaded ? (
    <Recipe
      ingredients={ingredients}
      name={meal.strMeal}
      thumb={meal.strMealThumb}
      instructions={meal.strInstructions}
      mealLink={meal.strSource}
      ytLink={meal.strYoutube}
      tags={meal.strTags ? meal.strTags.split(",").join(", ") : null}
    ></Recipe>
  ) : (loading ? (<Spinner />) : null);

  return (
    <Container fixed className={classes.root}>
      <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          size="large"
          onClick={generateMeal}
        >Draw a meal!</Button>
        {recipe}
    </Container>
  );
};