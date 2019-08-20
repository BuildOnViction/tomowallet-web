/**
 *
 * TomoWallet - Common Table - Pagination Component
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PaginationItem, PaginationLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Custom Components
import { PaginationStyler } from '../style';
// ===================

// ===== MAIN COMPONENT =====
class CustomPagination extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleGetPageList = this.handleGetPageList.bind(this);
    this.isFirstPage = this.isFirstPage.bind(this);
    this.isLastPage = this.isLastPage.bind(this);
  }

  handleChangePage(newPage) {
    const { changePage, totalPages } = this.props;
    if (newPage >= 1 && newPage <= totalPages) {
      changePage(newPage);
    }
  }

  handleGetPageList() {
    const { currentPage, pageRange, totalPages } = this.props;
    const subRange = Math.floor(pageRange / 2);

    if (totalPages <= pageRange) {
      return [...Array(totalPages).keys()].map(num => ++num);
    } else if (currentPage <= subRange) {
      return [...Array(pageRange).keys()].map(num => ++num);
    } else if (currentPage > totalPages - subRange) {
      return [...Array(pageRange).keys()].map(
        num => totalPages - pageRange + 1 + num,
      );
    } else {
      return [...Array(pageRange).keys()].map(
        num => currentPage + subRange - pageRange + 1 + num,
      );
    }
  }

  isFirstPage() {
    const { currentPage } = this.props;
    return currentPage === 1;
  }

  isLastPage() {
    const { currentPage, totalPages } = this.props;
    return currentPage === totalPages;
  }

  render() {
    const { currentPage, totalPages } = this.props;
    const pageList = this.handleGetPageList();

    return (
      <PaginationStyler>
        <PaginationItem disabled={this.isFirstPage()}>
          <PaginationLink first onClick={() => this.handleChangePage(1)}>
            <FontAwesomeIcon icon='angle-double-left' />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={this.isFirstPage()}>
          <PaginationLink
            previous
            onClick={() => this.handleChangePage(currentPage - 1)}
          >
            <FontAwesomeIcon icon='chevron-left' />
          </PaginationLink>
        </PaginationItem>
        {pageList.map(num => (
          <PaginationItem key={`page_${num}`} active={currentPage === num}>
            <PaginationLink onClick={() => this.handleChangePage(num)}>
              {num}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem disabled={this.isLastPage()}>
          <PaginationLink
            next
            onClick={() => this.handleChangePage(currentPage + 1)}
          >
            <FontAwesomeIcon icon='chevron-right' />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={this.isLastPage()}>
          <PaginationLink
            last
            onClick={() => this.handleChangePage(totalPages)}
          >
            <FontAwesomeIcon icon='angle-double-right' />
          </PaginationLink>
        </PaginationItem>
      </PaginationStyler>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
CustomPagination.propTypes = {
  /** Action to handle page jump */
  changePage: PropTypes.func,
  /** Current table page */
  currentPage: PropTypes.number,
  /** Table pagination's range */
  pageRange: PropTypes.number,
  /** Total number of pages in table */
  totalPages: PropTypes.number,
};

CustomPagination.defaultProps = {
  changePage: () => {},
  currentPage: 1,
  pageRange: 7,
  totalPages: 0,
};
// ======================

export default CustomPagination;
