import React from "react";

export class HUD extends React.Component {
  render() {
    return (

    );
    <div id="images">
      <svg width="1280px" height="720px" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="colormatrixfilter" filterUnits="objectBoundingBox" x="0%" y="0%" width="100%" height="100%">
              <feColorMatrix id="colormatrix" type="matrix" in="SourceGraphic" values="0 0 1 0 0  0 1 0 0 0  0.36 0 0 0 0  0 0 0 1 0"></feColorMatrix>
            </filter>
          </defs>
          <image id="hud1" width="100%" height="100%" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="ed_collage.jpg" filter="url(#colormatrixfilter)">

          </image>
      </svg>
    </div>
  }
}
