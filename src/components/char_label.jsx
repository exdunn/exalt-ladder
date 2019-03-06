import React, { Component } from "react";
import "../css/char_label.css";

class CharLabel extends Component {
  render() {
    const { id, char } = this.props.entry;
    return (
      <div className="card m-2">
        <div className="row no-gutters p-2">
          <div className="col">{char.name}</div>
          <div className="col">{char.level}</div>
          <div className="col">{char.class}</div>
        </div>
      </div>
    );
  }
}

export default CharLabel;
