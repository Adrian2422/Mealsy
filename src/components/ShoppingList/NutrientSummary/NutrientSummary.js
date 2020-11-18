import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  table: {
    width: '100%'
  },
}));

export default function NutrientSummary(props){
  const classes = useStyles();
  const short_nutrients = props.nutrientList;

  function createData(name, value, suffix, key) {
    return { name, value, suffix, key};
  }
  const rows = short_nutrients.map((item)=>(
    createData(item.name, item.value, item.suffix, item.key)
  ));

  return ( 
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell><b>Nutrients (whole list)</b></TableCell>
            <TableCell align="right"><b>Value</b></TableCell>
            <TableCell align="right"><b>Unit</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.key}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.value.toFixed(2)}</TableCell>
              <TableCell align="right">{row.suffix}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   );
}