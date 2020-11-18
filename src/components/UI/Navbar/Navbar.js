import React, { useState } from 'react';
import { makeStyles, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
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
    '&:not(:last-child)' : {
      marginRight: theme.spacing(2),
    }
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const [themeHover, setHover] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const themeBtnHovered = () => {
    setHover(!themeHover);
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <IconButton edge="start" className={classes.button} color="inherit" aria-label="change theme" onClick={props.themeBtn} onMouseEnter={themeBtnHovered} onMouseLeave={themeBtnHovered}>
            {themeHover ? <Brightness4Icon /> : (props.theme ? <Brightness7Icon /> : <Brightness5Icon/>)}
          </IconButton>
          <IconButton edge="start" className={classes.button} color="inherit" aria-label="profile" onClick={handleClick}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}