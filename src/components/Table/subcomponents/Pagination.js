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
// -- TO-DO: Update style for custom Pagination component
import { PaginationStyler } from '../style';
// ===================

// ===== MAIN COMPONENT =====
class CustomPagination extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.isFirstPage = this.isFirstPage.bind(this);
    this.isLastPage = this.isLastPage.bind(this);
  }

  handleChangePage(newPage) {
    const { onChangePage, totalPages } = this.props;
    if (newPage >= 1 && newPage <= totalPages) {
      Promise.all([
        this.setState({ currentPage: newPage }),
        onChangePage(newPage),
      ]);
    }
  }

  isFirstPage() {
    const { currentPage } = this.state;
    return currentPage === 1;
  }

  isLastPage() {
    const { totalPages } = this.props;
    const { currentPage } = this.state;
    return currentPage === totalPages;
  }

  render() {
    const { totalPages } = this.props;
    const { currentPage } = this.state;
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
        {Array(totalPages)
          .fill(null)
          .map((_, index) => (
            <PaginationItem
              key={`page_${index + 1}`}
              active={currentPage === index + 1}
            >
              <PaginationLink onClick={() => this.handleChangePage(index + 1)}>
                {index + 1}
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
  onChangePage: PropTypes.func,
  /** Total number of pages in table */
  totalPages: PropTypes.number,
};

CustomPagination.defaultProps = {
  onChangePage: () => {},
  totalPages: 5,
};
// ======================

export default CustomPagination;
