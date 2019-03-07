import React, { Component } from "react";
import { Pagination, PageItem } from "react-bootstrap";
import CharLabel from "./char_label";
import "../css/ladder.css";

class Ladder extends Component {
  render() {
    const {
      limit,
      max,
      itemsPerPage,
      entries,
      curPage,
      onPageClick
    } = this.props;
    const items = [];
    const paginationStartIndex = Math.max(1, curPage - 5);
    for (var i = paginationStartIndex; i < paginationStartIndex + 10; i++) {
      if (i < max / itemsPerPage) {
        items.push(i);
      }
    }

    return (
      <div>
        {entries.map(entry => (
          <CharLabel key={entry.id} entry={entry} />
        ))}

        <Pagination className="py-2">
          {items.map(item => (
            <PageItem
              id="pageItem"
              active={item === curPage}
              onClick={() => onPageClick(item)}
            >
              {item}
            </PageItem>
          ))}
        </Pagination>
      </div>
    );
  }
}

export default Ladder;
