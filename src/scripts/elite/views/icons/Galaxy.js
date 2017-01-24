import React from "react";
import { getDefaultColor } from "./utils.js";

export function Powerplay(props) {
  const color = getDefaultColor(props);
  return (
    <svg viewBox="0 0 960 960">
      <rect x="173" y="549" fill={color} width="158" height="294"/>
      <rect x="410" y="112" fill={color} width="158" height="731"/>
      <rect x="647" y="352" fill={color} width="158" height="491"/>
    </svg>
  );
}

export default {
  Powerplay
}
