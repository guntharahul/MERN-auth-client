import React, { Component } from 'react';
import { isAuth } from '../auth/helpers';
import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() ? (
        <Component {...props}></Component>
      ) : (
        <Redirect
          to={{ pathname: '/signin', state: { from: props.location } }}
        ></Redirect>
      )
    }
  ></Route>
);
export default PrivateRoute;
