import { PinDropSharp } from '@material-ui/icons';
import React from 'react';
import { Redirect } from 'react-router-dom';

export default function Logout(props) {
  props.logout();
  return <Redirect to='/'/>;
}