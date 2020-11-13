import React from 'react';
import { makeStyles, AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    flexGrow: 1,
  },

  button: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.button} color="inherit" aria-label="menu" onClick={props.hamburgerClicked}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Mealsy
          </Typography>
          <IconButton edge="start" className={classes.button} color="inherit" aria-label="change theme" onClick={props.themeBtn} onMouseEnter={props.themeBtnHovered} onMouseLeave={props.themeBtnHovered}>
            {props.themeHover ? <Brightness4Icon /> : (props.theme ? <Brightness7Icon /> : <Brightness5Icon/>)}
          </IconButton>
          <IconButton edge="start" className={classes.button} color="inherit" aria-label="profile" onClick={props.themeBtn}>
            <AccountCircleIcon /> 
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}