import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Height } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    backgroundColor: '#333333',
    minHeight: '100vh',
  },
}));

export default function Layout(props) {
  const classes = useStyles();

  return (
    <Container maxWidth='xl' className={classes.root}>
      {props.children}
    </Container>
  );
};