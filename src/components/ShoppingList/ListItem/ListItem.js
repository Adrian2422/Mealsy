import React from 'react';
import { IconButton, ListItem, ListItemSecondaryAction, ListItemText, Avatar, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = theme => ({
  table: {
    width: '100%'
  },
});

const listItem = (props) => {
  const { classes } = props;
  console.log(props)
  return ( 
    <ListItem className={classes.listItem} key={props.key} id={props.id}>
      <Avatar title={'Meal'} alt={'image'} src={props.thumb} className={classes.avatar}/>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id={`panel_${props.key}_header`}
        >
          <ListItemText primary={props.name}/>
          <ListItemText secondary={`${props.unit} ${props.weight}g`}/>
        </AccordionSummary>
        <AccordionDetails>
          {props.children}
        </AccordionDetails>
      </Accordion>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={props.deleteItemBtnHandler}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
   );
}
 
export default withStyles(useStyles)(listItem);