import React from "react";
import { Router, Route, IndexRoute, Link, hashHistory } from "react-router";
import { render } from "react-dom";

import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { syncHistoryWithStore } from "react-router-redux";

import store from "elite/store";
import i18n from "elite/i18n";

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

  const reducers = [];

  const history = syncHistoryWithStore(hashHistory, store);

  window.removeEventListener("DOMContentLoaded", domLoaded);
  render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Router history={history}>
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
        </Router>
      </Provider>
    </I18nextProvider>,
    document.querySelector("#Application")
  );

}

window.addEventListener("DOMContentLoaded", domLoaded);
