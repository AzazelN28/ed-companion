import { createStore, combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

export const store = window.store = createStore(
  combineReducers({
    routing: routerReducer
  })
);

export default store;
