import React from "react";
import { Router, Route, Link, hashHistory } from "react-router";
import { render } from "react-dom";
import Application from "elite/views/Application";

/**
 * Esta función es llamada cuando se carga el DOM.
 */
function domLoaded() {

  window.removeEventListener("DOMContentLoaded", domLoaded);
  render(
    <Router history={hashHistory}>
      <Route path="/" component={Application} />
    </Router>,
    document.querySelector("#Application")
  );

}

window.addEventListener("DOMContentLoaded", domLoaded);
