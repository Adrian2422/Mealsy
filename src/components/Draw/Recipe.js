import React from "react";
import { Button, Card, Container, Typography, withStyles } from "@material-ui/core";
import YouTubeIcon from '@material-ui/icons/YouTube';
import Image from '../UI/Image/Image';

const useStyles = theme => ({
  root: {
    padding: '32px 0',
  },
  title: {
    textAlign: 'center',
    '& a': {
    textDecoration: 'none',
    color: '#000',
    },
  },
  tags: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  img_ingredients_container: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  media: {
    width: '50%',
  },
  list: {
    width: 'fit-content',
  },
  info: {
    textAlign: 'justify',
    padding: '32px'
  },
  yt_button: {
    marginBottom: '16px',
    backgroundColor: '#FF0000',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#ff2e2e',
    }
  },
  '@media (max-width: 960px)' : {
    instructions: {
      fontSize: '0.8em',
    },
    title: {
      fontSize: '2em',
    },
  },
});

const recipe = (props) => {
  const generateIngredients = () =>
    props.ingredients.map((ingredient) => {
      return ingredient.name ? (
        <li key={ingredient.id}>
          {ingredient.value} {ingredient.name}
        </li>
      ) : null;
    });

  const { classes } = props;
  const ytButton = props.ytLink ? (
    <Button 
    className={classes.yt_button}
    variant="contained"
    color="primary"
    size="large"
    href={props.ytLink}
    target="_blank"
    startIcon={<YouTubeIcon />}>
      Video
    </Button>
  ) : null;
  const ingredientList = props.ingredients.length ? (
    <Container className={classes.list}>
      <ul className={null}>
        {generateIngredients()}
      </ul>
    </Container>
  ) : (<Container>
    <p>No listed ingredients</p>
  </Container>);

  return (
    <Card className={classes.root}>
      <Typography className={classes.title} variant="h2" gutterBottom>
        <a className={null} href={props.mealLink}>{props.name}</a>
      </Typography>
      <Typography className={classes.tags} variant="h5" >
        {props.tags}
      </Typography>
      <Container>
        <Container className={classes.img_ingredients_container}>
          <Image
            className={classes.media}
            alt="Meal picture"
            src={props.thumb}
            title={props.title}
          />
          {ingredientList}
        </Container>
        <Container className={classes.info}>
          {ytButton}
          <Typography variant="body1" className={classes.instructions}>
            {props.instructions}
          </Typography>
        </Container>
      </Container>
    </Card>
  );
};

export default withStyles(useStyles)(recipe);