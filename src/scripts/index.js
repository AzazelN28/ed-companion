import React from "react";
import { Router, Route, IndexRoute, Link, hashHistory } from "react-router";
import { render } from "react-dom";
import Layout from "elite/views/Layout";
import News from "elite/views/news";
import Journal from "elite/views/journal";
import Trading from "elite/views/trading";
import Exploration from "elite/views/exploration";
import Customization from "elite/views/customization";
import Community from "elite/views/community";

/**
 * Esta función es llamada cuando se carga el DOM.
 */
function domLoaded() {

  window.removeEventListener("DOMContentLoaded", domLoaded);
  render(
    <Router history={hashHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Journal} />
        <Route path="trading" component={Trading} />
        <Route path="exploration" component={Exploration} />
        <Route path="customization">
          <Route path="create" component={Customization.Create} />
          <IndexRoute component={Customization.List} />
        </Route>
        <Route path="community" component={Community} />
      </Route>
    </Router>,
    document.querySelector("#Application")
  );

}

window.addEventListener("DOMContentLoaded", domLoaded);
