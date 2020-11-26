import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isLogged: IsLogged, ...rest }) => (
  <Route {...rest} render={(props) => (
    IsLogged === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

export default PrivateRoute;