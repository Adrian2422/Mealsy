import React, { useState } from 'react';
import { Box, Divider, Grid, TextField, Button, Select, MenuItem, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function PersonalSurvey(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      width: '100%',
      margin: '32px 0',
    },
    titleGrid: {
      margin: '0 0 32px 0',
      textAlign: 'center',
    },
    inputGroup: {
      width: '100%',
    },
    input:{
      margin: '5px 0'
    },
    button: {
      margin: '32px auto'
    },
    buttonGrid:{
      textAlign: 'center'
    },
    grid: {
      width: '100%',
    }
  }));

  const classes = useStyles();
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(null);
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [activity, setActivity] = useState(1);
  const genderHandler = (e) => setGender(e.target.value);
  const activityHandler = (e) => setActivity(e.target.value);
  const ageHandler = (e) => setAge(e.target.value);
  const weightHandler = (e) => setWeight(e.target.value);
  const heightHandler = (e) => setHeight(e.target.value);
  const buttonHandler = () => {
    const data = {gender, age, weight, height, activity};
    const dataarr = [gender, age, weight, height, activity];
    if(!dataarr.some((el) => { return (el <= 0 || el === null)})){
      return props.calculateKcalNeed(data);
    }
  }

  return ( 
    <React.Fragment>
      <Box className={classes.root}>
        <Grid container spacing={0} justify="center" alignItems="center" >
          <Grid item xs={12} className={classes.titleGrid}>
            {props.kcalNeed}
            {props.proportionResult}
          </Grid>
          <Grid item xs>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={genderHandler}>
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs >
            <FormControl className={classes.inputGroup} component="fieldset" autoComplete="off">
            <FormLabel component="legend">Parameters</FormLabel>
              <TextField className={classes.input} id="age-input" type='number' label="Age" onChange={ageHandler} />
              <TextField className={classes.input} id="weight-input" type='number' label="Weight (kg)" onChange={weightHandler} />
              <TextField className={classes.input} id="height-input" type='number' label="Height (cm)" onChange={heightHandler} />
                <Select className={classes.input} labelId="activity-select-label" id="activity-select" value={activity} onChange={activityHandler}>
                  <MenuItem value={1}>Low activity (sedentary lifestyle, little amount of exercise)</MenuItem>
                  <MenuItem value={2}>Average activity (walking, running, exercising 3-5 times a week)</MenuItem>
                  <MenuItem value={3}>High activity (heavy workouts, daily exercise)</MenuItem>
                </Select>
            </FormControl>
          </Grid>
          <Grid item xs className={classes.buttonGrid}>
            <Button className={classes.button} variant="contained" size='large' color="secondary" onClick={() => buttonHandler()}>Calculate</Button>
          </Grid>
        </Grid>
    </Box>
    <Divider />
    </React.Fragment>
   );
}