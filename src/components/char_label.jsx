import React, { Component } from "react";
import "../css/char_label.css";

class CharLabel extends Component {
  render() {
    const { id, char } = this.props.entry;
    return (
      <div className="card m-2">
        <div className="row no-gutters p-2">
          <div className="col-4 pl-4">{char.name}</div>
          <div className="col-4">{char.level}</div>
          <div className="col-4">{char.class}</div>
        </div>
      </div>
    );
  }
}

export default CharLabel;
