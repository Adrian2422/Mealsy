import React from 'react';
import { makeStyles, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));

export default function Layout(props) {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      {props.children ? props.children : null}
    </Container>
  );
};