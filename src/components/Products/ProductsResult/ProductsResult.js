import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {List, ListItem, ListItemAvatar,ListItemText, Avatar} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
}));

export default function ProductsResult(props){

  const classes = useStyles();
  const resultsCommon = props.resultsCommon.map((item, key) => 
    <ListItem component='li' button key={key} id={item['my_id']}  onClick={props.chosenItemHandler}>
      <ListItemAvatar>
        <Avatar alt={item.food_name} src={item.photo.thumb} className={classes.avatar}/>
      </ListItemAvatar>
      <ListItemText primary={item.food_name} />
    </ListItem>
  );

  return ( 
    <div className={classes.root}>
      <List aria-label="product search results">
        {resultsCommon}
      </List>
    </div>
   );
}