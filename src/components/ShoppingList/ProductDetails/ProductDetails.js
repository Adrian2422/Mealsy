import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { ids, names, suffixes } from '../../../modules/nutrientData';

const useStyles = theme => ({
  table: {
    width: '100%'
  },
});

const productDetails = (props) => {
  const { classes } = props;

  const data = props.data;
  const nutrientArray = [];
  data.forEach((item) => {
    if(ids.includes(item['attr_id'])){
      const i = ids.findIndex((el) => el === item["attr_id"]);
      nutrientArray.splice(i, 1, {
        name: names[i],
        value: item["value"],
        suffix: suffixes[i],
        key: i,
      });
    }
  });

  function createData(name, value, suffix) {
    return { name, value, suffix };
  }
  const rows = nutrientArray.map((item)=>(
    createData(item.name, item.value, item.suffix)
  ));

  return ( 
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell><b>Nutrients (100g serving)</b></TableCell>
            <TableCell align="right"><b>Value</b></TableCell>
            <TableCell align="right"><b>Unit</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
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
 
export default withStyles(useStyles)(productDetails);