import "babel-polyfill";
import "whatwg-fetch";
import React from "react";
import {render} from "react-dom";
import FastClick from "fastclick";
import {Router, Route, browserHistory} from "react-router";
import HomePage from "./pages/home";
import ErrorPage from "./pages/error";
import IdeasPage from "./pages/ideas";
import TodoListPage from "./pages/todolist";

function startApp() {
  render((
    <Router history={browserHistory}>
      <Route path="/" component={HomePage}>
        <Route path="ideas" component={IdeasPage}/>
        <Route path="todolist" component={TodoListPage}/>
        <Route path="*" component={ErrorPage}/>
      </Route>
    </Router>
  ), document.getElementById('container'));
  FastClick.attach(document.body);
}

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}
