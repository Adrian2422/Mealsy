import React from 'react';
import { makeStyles, Drawer, List, ListItem, ListItemText } from '@material-ui/core';

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
  }
}));

export default function Sidebar(props) {
  const classes = useStyles();

  return (
    <div
      role="presentation"
      onClick={props.backdropClicked}
      onKeyDown={props.backdropClicked}
    >
      <Drawer open={props.opened}>
        <List className={classes.list}>
          {['Home', 'Draw a meal', 'Shopping list', 'Products'].map((text, index) => (
            <a key={text} href={'#'} className={classes.links}>
              <ListItem button  className={classes.listItem} onClick={props.chosenLink}>
                <ListItemText primary={text} primaryTypographyProps={{value: index}}/>
              </ListItem>
            </a>
          ))}
        </List>
      </Drawer>
    </div>
  );
}