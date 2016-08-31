import "babel-polyfill";
import "whatwg-fetch";
import React from "react";
import {render} from "react-dom";
import FastClick from "fastclick";
import {Provider} from "react-redux";
import {Router, Route, hashHistory, IndexRoute} from "react-router";
import NoteListPage from "./pages/notes";
import ErrorPage from "./pages/error";
import IdeasPage from "./pages/ideas";
import IdeasCreatePage from "./pages/ideas/create";
import NoteEditPage from "./pages/notes/edit";
import NoteCreatePage from "./pages/notes/create";
import NoteViewPage from "./pages/notes/view";
import SettingsPage from "./pages/settings";
import store from "./core/store";

function startApp() {
  var routes = (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/">

          <IndexRoute name="notes" component={NoteListPage}/>
          <Route name="notes.edit" path="/notes/edit/:id" component={NoteEditPage}/>
          <Route name="notes.view" path="/notes/view/:id" component={NoteViewPage}/>
          <Route name="notes.create" path="/notes/create" component={NoteCreatePage}/>

          <Route name="ideas" path="/ideas" component={IdeasPage}/>
          <Route name="ideas.create" path="/ideas/create" component={IdeasCreatePage}/>

          <Route name="settings" path="/settings" component={SettingsPage}/>
          <Route path="*" component={ErrorPage}/>
        </Route>
      </Router>
    </Provider>
  );

  render(routes, document.getElementById('container'));

  FastClick.attach(document.body);

  // Enable Hot Module Replacement (HMR)
  if (module.hot) {

  }
}

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}
