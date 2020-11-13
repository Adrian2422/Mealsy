import { Container, TextField } from '@material-ui/core';
import React from 'react';

export default function ProductsInput(props) {
  const useStyles = theme => ({
    root: {
      padding: 0,
    },
    textField: {
      color: '#fff',
    },
    input: {
      color: 'white'
  }
  });

  const classes = useStyles();

  return (
    <Container>
      <TextField
          className={classes.textField}
          id="standard-textarea"
          label="Add products"
          placeholder="ex.g. '1 cup of rice, 2 apples'"
          InputProps={{
            className: classes.input,
          }}
          multiline
        />
    </Container>
  );
}
