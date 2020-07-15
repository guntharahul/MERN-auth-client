import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Activate from './auth/Activate';
import Private from './core/Private';
import Admin from './core/Admin';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Forgot from './auth/Forgot';
import Reset from './auth/Reset';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={App}></Route>
        <Route path='/signup' exact component={Signup}></Route>
        <Route path='/signin' exact component={Signin}></Route>
        <Route path='/auth/activate/:token' exact component={Activate}></Route>
        <Route path='/auth/password/forgot' exact component={Forgot}></Route>
        <Route
          path='/auth/password/reset/:token'
          exact
          component={Reset}
        ></Route>
        <PrivateRoute path='/private' exact component={Private}></PrivateRoute>
        <AdminRoute path='/admin' exact component={Admin}></AdminRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
