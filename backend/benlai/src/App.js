

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom'

import './App.css';

import Home from './page/home'
import Login from './page/login'



function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Redirect from="/" to="/login" exact />
      </Switch>
    </div>
  );
}

export default App;
