import "babel-polyfill";
import "whatwg-fetch";
import React from "react";
import {render} from "react-dom";
import FastClick from "fastclick";
import {Router, Route, browserHistory} from "react-router";
import HomePage from "./pages/home";
import ErrorPage from "./pages/error";
import IdeasPage from "./pages/ideas";
import NoteEditPage from "./pages/notes/edit";
import NoteViewPage from "./pages/notes/edit";
import TodoListPage from "./pages/todolist";

function startApp() {
  var routs = (
    <Router history={browserHistory}>
      <Route name="app" path="/" component={HomePage}>
        <Route name="notes" path="/notes" component={HomePage}>
          <Route path="/edit" component={NoteEditPage}/>
          <Route path="/view" component={NoteViewPage}/>
        </Route>
        <Route name="ideas" path="/ideas" handler={IdeasPage}/>
        <Route name="todolist" path="/todolist" component={TodoListPage}/>
        <Route path="*" component={ErrorPage}/>
      </Route>
    </Router>
  );

  render(routs, document.getElementById('container'));

  FastClick.attach(document.body);
}

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}
