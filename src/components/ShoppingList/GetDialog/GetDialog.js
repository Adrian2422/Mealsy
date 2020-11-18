import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';


export default function GetDialog(props){
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexFlow: 'column',
      padding: 0,
    },
    input: {
      width: '100%',
    },
    button: {
      width: 'fit-content',
      margin: '32px auto'
    },
  }));

  const classes = useStyles();

  const [query, setQuery] = useState('');
  const buttonHandler = () => {
    if(query){
      setQuery('');
      props.onClose();
      return props.addProductBtn(query);
    }
  };

  return (
    <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Type products you want to add:</DialogTitle>
        <DialogContent>
        <TextField
          variant='outlined'
          className={classes.input}
          id="standard-textarea"
          placeholder="e.g. '1 cup of rice, 2 apples'"
          value={query}
          onChange={(e) => {setQuery(e.target.value);}}
          required
          multiline
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={buttonHandler} color="secondary">
            Add products
          </Button>
        </DialogActions>
      </Dialog>
  )

};