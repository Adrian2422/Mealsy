import React from 'react';
import { makeStyles, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { Link } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import CasinoIcon from '@material-ui/icons/Casino';
import ListIcon from '@material-ui/icons/List';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    flexGrow: 1,
  },
  list: {
    width: 250,
    height: '100%',
    backgroundColor: '#333',
  },
  listItem: {
    '&:hover': {
      backgroundColor: '#424242'
    }
  },
  links: {
    textDecoration: 'none',
    color: '#fff',
    '& *':{
      color: 'inherit',
    }
  }
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const links = ['Home', 'Draw a meal', 'Shopping list', 'Products'];
  const urls = ['/', '/draw_a_meal', '/shopping_list', '/products'];
  const icons = [<HomeIcon />, <CasinoIcon />, <ListIcon/>, <SearchIcon />];
  return (
    <div
      role="presentation"
      onClick={props.backdropClicked}
      onKeyDown={props.backdropClicked}
    >
      <Drawer open={props.opened}>
          <List className={classes.list}>
            {links.map((text, index) => (
              <Link key={index} to={urls[index]} className={classes.links}>
                <ListItem button  className={classes.listItem}>
                  <ListItemIcon>
                    {icons[index]}
                  </ListItemIcon>
                  <ListItemText primary={text} primaryTypographyProps={{value: index}}/>
                </ListItem>
              </Link>
            ))}
          </List>
      </Drawer>
    </div>
  );
}