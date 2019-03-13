import React, { Component } from "react";
import { Pagination, PageItem } from "react-bootstrap";
import CharLabel from "./char_label";
import "../css/ladder.css";

class Ladder extends Component {
  render() {
    const {
      itemsPerPage,
      entries,
      curPage,
      ascendancy,
      league,
      onPageClick,
      onPrevClick,
      onNextClick
    } = this.props;

    const filteredEntries = entries.filter(
      entry => ascendancy === "All" || entry.character.class === ascendancy
    );
    const items = [];
    const pageCount = filteredEntries.length / itemsPerPage;
    const paginationStartIndex = Math.max(
      Math.floor((curPage - 1) / 10) * 10 + 1,
      1
    );
    const paginationEndIndex = Math.min(paginationStartIndex + 9, pageCount);

    var message =
      filteredEntries.length === 0
        ? league === "Select"
          ? "Select a league to continue..."
          : "No matching characters found..."
        : "";

    // insert page numbers at the bottom of the screen
    for (var i = paginationStartIndex; i <= paginationEndIndex; i++) {
      items.push(i);
    }

    return (
      <div>
        <p>{message}</p>
        {filteredEntries
          .slice((curPage - 1) * itemsPerPage, curPage * itemsPerPage)
          .map(entry => (
            <CharLabel key={entry.id} entry={entry} />
          ))}

        <Pagination>
          <Pagination.Prev
            style={{
              display: filteredEntries.length < 1 ? "none" : "inline"
            }}
            onClick={() => onPrevClick()}
          />
          {items.map(item => (
            <PageItem
              id="pageItem"
              key={item}
              active={item === curPage}
              onClick={() => onPageClick(item)}
            >
              {item}
            </PageItem>
          ))}
          <Pagination.Next
            style={{
              display: filteredEntries.length < 1 ? "none" : "inline"
            }}
            onClick={() => onNextClick(pageCount)}
          />
        </Pagination>
      </div>
    );
  }
}

export default Ladder;
