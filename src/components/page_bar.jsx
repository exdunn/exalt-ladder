import React, { Component } from "react";
import { Pagination, PageItem } from "react-bootstrap";

class PageBar extends Component {
  render() {
    const {
      hideArrows,
      pageNumbers,
      pageCount,
      curPage,
      onPrevClick,
      onPageClick,
      onNextClick
    } = this.props;
    return (
      <Pagination>
        <Pagination.Prev
          style={{
            display: hideArrows ? "none" : "inline"
          }}
          onClick={() => onPrevClick()}
        />
        {pageNumbers.map(pageNumber => (
          <PageItem
            id="pageItem"
            key={pageNumber}
            active={pageNumber === curPage}
            onClick={() => onPageClick(pageNumber)}
          >
            {pageNumber}
          </PageItem>
        ))}
        <Pagination.Next
          style={{
            display: hideArrows ? "none" : "inline"
          }}
          onClick={() => onNextClick(pageCount)}
        />
      </Pagination>
    );
  }
}

export default PageBar;
