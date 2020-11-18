import { Button, Container, Divider, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';


export default function ProductsInput(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexFlow: 'column',
      padding: 0,
    },
    button: {
      width: 'fit-content',
      margin: '32px auto'
    },
    '@media (max-width: 960px)' : {
      root: {
        display: 'none'
      },
    }
  }));

  const classes = useStyles();

  const [query, setQuery] = useState('');
  const buttonHandler = () => {
    if(query){
      setQuery('');
      return props.addProductBtn(query);
    }
  }

  return (
    <Container className={classes.root}>
      <TextField
          variant='outlined'
          className={classes.textField}
          id="standard-textarea"
          label="Add products"
          placeholder="e.g. '1 cup of rice, 2 apples'"
          value={query}
          onChange={(e) => {setQuery(e.target.value);}}
          required
          rows={4}
          multiline
        />
        <Button className={classes.button} variant="contained" size='large' color="secondary" onClick={() => buttonHandler()}>Add products</Button>
        <Divider/>
    </Container>
  );
}
