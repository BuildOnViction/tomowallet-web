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
// Custom Components
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
    const { onChangePage } = this.props;
    Promise.all([
      this.setState({ currentPage: newPage }),
      onChangePage(newPage),
    ]);
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
    return (
      <PaginationStyler>
        <PaginationItem>
          <PaginationLink />
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
};
// ======================
