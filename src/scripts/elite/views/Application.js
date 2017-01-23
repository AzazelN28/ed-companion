import React, { Component } from "react";
import { Link } from "react-router";

class Navigation extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link to={{ pathname: "/journal" }}>

            </Link>
          </li>
          <li>
            <Link to={{ pathname: "/trading" }}>

            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export class Application extends Component {
  render() {
    return (
      <div>Hola mundo</div>
    );
  }
}

export default Application;
