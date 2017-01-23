import React, { Component } from "react";
import { Link } from "react-router";
import { GalNet, UniversalCartographics } from "elite/views/icons/Misc";

class Navigation extends Component {
  render() {
    return (
      <nav className="Navigation">
        <ul className="Navigation__list">
          <li className="Navigation__item">
            <Link className="Navigation__link" to={{ pathname: "/" }}>
              <GalNet />
            </Link>
          </li>
          <li className="Navigation__item">
            <Link className="Navigation__link" to={{ pathname: "/trading" }}>
              <GalNet />
            </Link>
          </li>
          <li className="Navigation__item">
            <Link className="Navigation__link" to={{ pathname: "/exploration" }}>
              <GalNet />
            </Link>
          </li>
          <li className="Navigation__item">
            <Link className="Navigation__link" to={{ pathname: "/customization" }}>
              <GalNet />
            </Link>
          </li>
          <li className="Navigation__item">
            <Link className="Navigation__link" to={{ pathname: "/community" }}>
              <GalNet />
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export class Layout extends Component {
  render() {
    return (
      <div className="Layout">
        <Navigation />
        <div className="Content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;
