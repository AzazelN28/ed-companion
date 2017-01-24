import React, { Component } from "react";
import { Link } from "react-router";
import Loader from "elite/views/Loader";

export class Journal extends Component {
  render() {
    return (
      <div className="Journal">
        <h2>Diario</h2>
        <Loader />
      </div>
    );
  }
}

export default Journal;
