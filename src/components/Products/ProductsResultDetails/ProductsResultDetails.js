import React, { useEffect } from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ids, names, suffixes } from '../../../modules/nutrientData';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '16px 32px',
    width: '100%'
  },
  table: {
    width: '100%'
  },
  productHead: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginBottom: '16px'
  },
  productTitle: {
    marginLeft: '16px',
    textTransform: 'capitalize',
  },
  productImage: {
    maxWidth: '150px',
    width: '25%'
  },
  '@media (max-width: 960px)' : {

  }
}));


export default function ProductsResultDetails(props){
  const classes = useStyles();
  useEffect(() => {
    props.loaded();
  });

  const data = props.data;
  const nutrientArray = [];
  data['full_nutrients'].forEach((item) => {
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
    <Paper className={classes.root}>
      <Container className={classes.productHead}>
        <img alt={data.food_name} src={data.photo.thumb} className={classes.productImage}></img>
        <Typography variant="h4" className={classes.productTitle}>{(data.food_name)}</Typography>
      </Container>
      <TableContainer component={Paper} elevation={2}>
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
    </Paper>
  );
};