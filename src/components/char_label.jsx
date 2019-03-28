import React, { Component } from "react";
import Sticker from "./sticker";
import "../css/char_label.css";

class CharLabel extends Component {
  render() {
    const { entry } = this.props;

    return (
      <div className="card m-2">
        <div className="row no-gutters p-2">
          <div className="col">{entry.rank}</div>
          <div className="col-6">
            <div>{entry.character.name}</div>
            <div>{entry.character.level}</div>
          </div>
          <div className="col">
            <Sticker
              text={entry.character.class}
              image={entry.character.class.toLowerCase()}
              variant="dark"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CharLabel;
