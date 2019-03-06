import React, { Component } from "react";
import { Pagination, PageItem } from "react-bootstrap";
import CharLabel from "./char_label";
import "../css/ladder.css";

class Ladder extends Component {
  render() {
    const { limit, entries, curPage, onPageClick } = this.props;
    const items = [];
    for (
      var i = Math.max(1, curPage - 5);
      i < Math.min(limit / 50, curPage + 6);
      i++
    ) {
      items.push(i);
    }

    return (
      <div>
        {entries.map(entry => (
          <CharLabel key={entry.id} entry={entry} />
        ))}

        <Pagination size="sm" className="py-2">
          {items.map(item => (
            <PageItem id="pageItem" onClick={() => onPageClick(item)}>
              {item}
            </PageItem>
          ))}
        </Pagination>
      </div>
    );
  }
}

export default Ladder;
