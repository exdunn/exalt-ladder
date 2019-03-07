import React, { Component } from "react";
import "../css/char_label.css";

class CharLabel extends Component {
  render() {
    const { id, character } = this.props.entry;
    return (
      <div className="card m-2">
        <div className="row no-gutters p-2">
          <div className="col">{character.name}</div>
          <div className="col">{character.level}</div>
          <div className="col">{character.class}</div>
        </div>
      </div>
    );
  }
}

export default CharLabel;
