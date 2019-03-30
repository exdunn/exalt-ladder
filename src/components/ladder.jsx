import React, { Component } from "react";
import CharLabel from "./char_label";
import PageBar from "./page_bar";
import "../css/ladder.css";

class Ladder extends Component {
  filter = entries => {};

  render() {
    const {
      itemsPerPage,
      entries,
      curPage,
      ascendancy,
      league,
      name,
      onPageClick,
      onPrevClick,
      onNextClick,
      onAscendancyClick
    } = this.props;

    const filteredEntries = entries
      .filter(
        entry => ascendancy === "All" || entry.character.class === ascendancy
      )
      .filter(entry =>
        name != ""
          ? entry.account.name.toUpperCase().includes(name.toUpperCase()) ||
            entry.character.name.toUpperCase().includes(name.toUpperCase())
          : true
      );

    const pageNumbers = [];
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
      pageNumbers.push(i);
    }

    return (
      <div>
        <p>{message}</p>
        <PageBar
          hideArrows={filteredEntries.length === 0}
          pageNumbers={pageNumbers}
          pageCount={pageCount}
          curPage={curPage}
          onPrevClick={onPrevClick}
          onPageClick={onPageClick}
          onNextClick={onNextClick}
        />
        {filteredEntries
          .slice((curPage - 1) * itemsPerPage, curPage * itemsPerPage)
          .map(entry => (
            <CharLabel
              key={entry.id}
              entry={entry}
              onAscendancyClick={onAscendancyClick}
            />
          ))}
        <PageBar
          hideArrows={filteredEntries.length === 0}
          pageNumbers={pageNumbers}
          pageCount={pageCount}
          curPage={curPage}
          onPrevClick={onPrevClick}
          onPageClick={onPageClick}
          onNextClick={onNextClick}
        />
      </div>
    );
  }
}

export default Ladder;
