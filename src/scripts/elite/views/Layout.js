import React, { Component } from "react";
import { Link } from "react-router";
import icons from "elite/views/icons";

class Navigation extends Component {
  render() {
    return (
      <nav className="Navigation">
        <ul className="Navigation__list">
          <li className="Navigation__item">
            <Link className="Navigation__link" to={{ pathname: "/" }}>
              <icons.Misc.GalNet />
            </Link>
          </li>
          <li className="Navigation__item">
            <Link className="Navigation__link" to={{ pathname: "/trading" }}>
              <icons.Misc.GalNet />
            </Link>
          </li>
          <li className="Navigation__item">
            <Link className="Navigation__link" to={{ pathname: "/exploration" }}>
              <icons.Misc.UniversalCartographics />
            </Link>
          </li>
          <li className="Navigation__item">
            <Link className="Navigation__link" to={{ pathname: "/customization" }}>
              <icons.Galaxy.Powerplay />
            </Link>
          </li>
          <li className="Navigation__item">
            <Link className="Navigation__link" to={{ pathname: "/community" }}>
              <icons.Misc.GalNet />
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
