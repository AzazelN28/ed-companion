import React, { Component } from "react";
import { Link } from "react-router";
import themes from "./hud/themes";

export class Customization extends Component {
  render() {
    const themeList = themes.map((theme) => {
      const preview = `assets/images/hud/themes/${theme.preview}`;
      return (
        <div className="Theme">
          <div className="Theme__content">
            <img className="Theme__preview" src={preview} />
            <div className="Theme__info">
              {theme.name}
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="Customization">
        Customization
        <div className="Themes">
          {themeList}
        </div>
      </div>
    );
  }
}

export default Customization;
