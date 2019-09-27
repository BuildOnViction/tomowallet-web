/**
 *
 * TomoWallet - Common Table - Style
 *
 */
// ===== IMPORTS =====
// Modules
import ReactTable from 'react-table';
import styled from 'styled-components';
import { Pagination } from 'reactstrap';
// ===================

// ===== STYLE =====
const CommonTableStyler = styled(ReactTable)`
  .rt-table {
    border-radius: 8px;
    background-color: #272d40;
    padding: 1em;
    .rt-th {
      display: inline-block;
      padding: 1em;
      width: auto !important;
      color: #5e677f;
      &.box_search {
        width: 100% !important;
      }
    }
    .rt-td {
      display: inline-block;
      padding: 1.5em 1em;
      width: auto !important;
    }
  }
`;

const PaginationStyler = styled(Pagination)`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  .page-link {
    color: #5e677f;
    &:focus {
      box-shadow: 0 0 0;
    }
  }
  .disabled {
    .page-link {
      opacity: 0.3;
    }
  }
  ul {
    margin: 0;
    * {
      background: transparent !important;
      border: 0;
    }
  }
`;

const EllipsisCellStyler = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
// =================

export { CommonTableStyler, PaginationStyler, EllipsisCellStyler };
