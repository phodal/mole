import "babel-polyfill";
import "whatwg-fetch";
import React from "react";
import {render} from 'react-dom'
import FastClick from "fastclick";
import {Router, Route, Link, browserHistory} from 'react-router'
import HomePage from './pages/home'
import ErrorPage from './pages/error'

let routes = require('./routes.json'); // Loaded with utils/routes-loader.js
const container = document.getElementById('container');

function startApp() {
// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
  render((
    <Router history={browserHistory}>
      <Route path="/" component={HomePage}>
        <Route path="*" component={ErrorPage}/>
      </Route>
    </Router>
  ), document.getElementById('container'));
  FastClick.attach(document.body);
}

//
// If running in cordova context, wait for deviceready to start the app, otherwise start immediately
//
if (window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}
