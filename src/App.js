import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Discover from './components/Discover/Discover';
import Bookcase from './components/Bookcase/Bookcase';
import Requests from './components/Requests/Requests';

import './styles/main.css';

const App = () => (
  <div>
    <Header title="inCase" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/discover"
          component={Discover}
        />
        <Route
          path="/bookcase"
          component={Bookcase}
        />
        <Route
          path="/requests"
          component={Requests}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
