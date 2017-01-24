import React, { Component } from "react";
import { Link } from "react-router";
import { translate } from 'react-i18next';

export class Community extends Component {
  handleClick(link, e) {
    const shell = window.require("electron").shell;
    shell.openExternal(link.href);
  }

  render() {
    const links = [
      {
        "name": "Elite: Dangerous",
        "description": "La web oficial de Elite: Dangerous, mantenida por Frontier",
        "href": "https://www.elitedangerous.com/",
        "image": "assets/images/community/elitedangerous.com.png",
        "icon": ""
      },
      {
        "name": "EDSM",
        "description": "Una web estupenda dedicada a la exploración de sistemas, tienen un mapa 3D de la galaxia, rutas, distintivos y mucha información sobre las naves",
        "href": "https://www.edsm.net/",
        "image": "assets/images/community/edsm.net.png",
        "icon": ""
      },
      {
        "name": "EDDB",
        "description": "Web dedicada al comercio y las rutas comerciales, tiene información actualizada y posee un sistema de búsqueda de rutas comerciales muy detallado",
        "href": "https://eddb.io/",
        "image": "assets/images/community/eddb.io.png",
        "icon": ""
      },
      {
        "name": "Inara",
        "description": "Es la Web de Elite: Dangerous por antonomasia, tiene todo tipo de información, noticias, podcasts, datos de comercio y de la galaxia, etc.",
        "href": "http://inara.cz/",
        "image": "assets/images/community/inara.cz.png",
        "icon": ""
      },
      {
        "name": "Forum oficial",
        "description": "El foro oficial de Elite: Dangerous, muy útil si quieres estar al día de los descubrimientos de otros jugadores y de lo que se cuece en el mundo de Elite: Dangerous",
        "href": "https://forums.frontier.co.uk/forumdisplay.php/29-Elite-Dangerous",
        "image": "assets/images/community/forums.frontier.co.uk!forumdisplay.php!29-Elite-Dangerous.png",
        "icon": ""
      }
    ];

    const { t } = this.props;

    const linkList = links.map((link, index) => {
      return (
        <div className="Community__link" key={index} onClick={this.handleClick.bind(this, link)}>
          <div className="Community__preview">
            <img src={link.image} />
          </div>
          <div className="Community__info">
            <h3 className="Community__name">{link.name}</h3>
            <div className="Community__description">{link.description}</div>
          </div>
        </div>
      );
    });

    return (
      <div className="Community">
        <h2>{t("community.title")}</h2>
        {linkList}
      </div>
    );
  }
}

export default translate(["common"])(Community);
