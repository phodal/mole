import "babel-polyfill";
import "whatwg-fetch";
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import FastClick from "fastclick";
import {Router, Route, browserHistory} from "react-router";
import HomePage from "./pages/home";
import ErrorPage from "./pages/error";
import IdeasPage from "./pages/ideas";
import TodoListPage from "./pages/todolist";
import store from "./core/store";

function startApp() {
  render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={HomePage}>
          <Route path="ideas" component={IdeasPage}/>
          <Route path="todolist" component={TodoListPage}/>
          <Route path="*" component={ErrorPage}/>
        </Route>
      </Router>
    </Provider>
  ), document.getElementById('container'));

  FastClick.attach(document.body);
}

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}
