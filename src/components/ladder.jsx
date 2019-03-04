import React, { Component } from "react";
import CharLabel from "./char_label";

class Ladder extends Component {
  render() {
    const { entries } = this.props;

    return (
      <div className="container">
        {entries.map(entry => (
          <CharLabel key={entry.id} entry={entry} />
        ))}
      </div>
    );
  }
}

export default Ladder;
