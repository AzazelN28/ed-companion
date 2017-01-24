import React, { Component } from "react";
import { Route, IndexRoute, Link } from "react-router";
import classNames from "classnames";
import themes from "./hud/themes";

export class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: [
        1.00,0.00,0.00,0,0,
        0.00,1.00,0.00,0,0,
        0.00,0.00,1.00,0,0,
        0.00,0.00,0.00,1,0
      ],
      negative: false,
      amplitude: 1,
      interpolation: "auto",
      view: "center",
      name: "Untitled",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleReset(e) {
    e.preventDefault();
    this.setState({
      matrix: [
        1.00,0.00,0.00,0,0,
        0.00,1.00,0.00,0,0,
        0.00,0.00,1.00,0,0,
        0.00,0.00,0.00,1,0
      ]
    });
  }

  handleSave(e) {
    e.preventDefault();
    // TODO: Ver qué se hace con esto.
  }

  handleChange(e) {
    const input = e.target;
    if (input.tagName.toLowerCase() === "input") {
      if (input.type === "range") {
        if (input.id === "amplitude") {
          this.setState({
            amplitude: input.value
          });
        } else {
          const index = parseInt(input.id,10);
          this.state.matrix[index] = input.value;
          this.forceUpdate();
        }
      } else if (input.type === "checkbox") {
        this.setState({
          [input.id]: input.checked
        });
      } else if (input.type === "text") {
        this.setState({
          [input.id]: input.value
        });
      }
    } else {
      this.setState({
        [input.id]: input.value
      });
    }
  }

  render() {
    const min = this.state.negative ? -1 * this.state.amplitude : 0;
    const max = this.state.amplitude;

    const bg = `assets/images/hud/${this.state.view}_bg.png`;
    const hud = `assets/images/hud/${this.state.view}_hud.png`;
    return (
      <div className="ThemeCreate">
        <div className="ThemeCreate__preview">
          <svg width="100%" height="100%">
            <defs>
              <filter id="colorMatrixFilter" filterUnits="objectBoundingBox" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters={this.state.interpolation}>
                <feColorMatrix id="colorMatrix" type="matrix" in="SourceGraphic" values={this.state.matrix.join(" ")} />
              </filter>
            </defs>
            <image id="bg" width="100%" height="100%" xlinkHref={bg}/>
            <image id="hud" width="100%" height="100%" xlinkHref={hud} filter="url(#colorMatrixFilter)" />
          </svg>
        </div>
        <div className="ThemeCreate__settings">
          <div className="ThemeCreate__settingsColumn">
            <input id="00" type="range" min={min} max={max} step="0.01" value={this.state.matrix[0]} onChange={this.handleChange}/>
            <input id="01" type="range" min={min} max={max} step="0.01" value={this.state.matrix[1]} onChange={this.handleChange}/>
            <input id="02" type="range" min={min} max={max} step="0.01" value={this.state.matrix[2]} onChange={this.handleChange}/>
          </div>
          <div className="ThemeCreate__settingsColumn">
            <input id="05" type="range" min={min} max={max} step="0.01" value={this.state.matrix[5]} onChange={this.handleChange}/>
            <input id="06" type="range" min={min} max={max} step="0.01" value={this.state.matrix[6]} onChange={this.handleChange}/>
            <input id="07" type="range" min={min} max={max} step="0.01" value={this.state.matrix[7]} onChange={this.handleChange}/>
          </div>
          <div className="ThemeCreate__settingsColumn">
            <input id="10" type="range" min={min} max={max} step="0.01" value={this.state.matrix[10]} onChange={this.handleChange}/>
            <input id="11" type="range" min={min} max={max} step="0.01" value={this.state.matrix[11]} onChange={this.handleChange}/>
            <input id="12" type="range" min={min} max={max} step="0.01" value={this.state.matrix[12]} onChange={this.handleChange}/>
          </div>
          <div className="ThemeCreate__settingsColumn">
            <label htmlFor="negative">
              <input id="negative" type="checkbox" value={this.state.negative} onChange={this.handleChange} />
              Negativo?
            </label>
            <input id="amplitude" type="range" min="1" max="3" value={this.state.amplitude} onChange={this.handleChange} />
            <select id="interpolation" value={this.state.interpolation} onChange={this.handleChange}>
              <option value="auto">Auto</option>
              <option value="linearRGB">linearRGB</option>
              <option value="sRGB">sRGB</option>
            </select>
            <select id="view" value={this.state.view} onChange={this.handleChange}>
              <option value="left">Izquierda</option>
              <option value="center">Centro</option>
              <option value="right">Derecha</option>
              <option value="outfitting">Outfitting</option>
              <option value="radar">Radar</option>
              <option value="collage">Collage</option>
            </select>
          </div>
          <div className="ThemeCreate__settingsColumn">
            <input id="name" type="text" value={this.state.name} onChange={this.handleChange} />
            <button type="reset" onClick={this.handleReset}>
              Resetear
            </button>
            <button type="submit" onClick={this.handleSave}>
              Guardar
            </button>
            <Link to={{pathname:"/customization"}}>Volver</Link>
          </div>
        </div>
      </div>
    );
  }
}

export class List extends Component {
  render() {
    const themeList = themes.map((theme, index) => {
      const preview = `assets/images/hud/themes/${theme.preview}`;
      const key = `${theme.file}_${index}`;
      return (
        <div className="Theme" key={key}>
          <div className="Theme__content">
            <img className="Theme__preview" src={preview} />
            <div className="Theme__info">
              <h3 className="Theme__name">
                {theme.name}
              </h3>
              <div className="Theme__metadata">
                <div className="Theme__contributors">
                  Creadores: {theme.contributors}
                </div>
                <div className="Theme__radar">
                  <div className="Theme__radarFriendlies">Amistosos: {theme.friendlies}</div>
                  <div className="Theme__radarHostiles">Hostiles: {theme.hostiles}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="Customization">
        <h2>Personalización</h2>
        <div className="Themes">
          <div className="Theme">
            <Link className="Theme__content" to={{pathname:"/customization/create"}}>
              <img className="Theme__preview" src="assets/images/hud/create.jpg" />
              <div className="Theme__create">
                <h2 className="Theme__createText">Crear</h2>
              </div>
            </Link>
          </div>
          {themeList}
        </div>
      </div>
    );
  }
}

export default {
  List,
  Create
};
