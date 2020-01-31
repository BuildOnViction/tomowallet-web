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
  position: relative;

  .rt-table {
    border-radius: 8px;
    background-color: ${props => props.theme.boxBackground};
    padding: 1em;
    .rt-th {
      display: inline-block;
      padding: 1em;
      width: auto !important;
      color: ${props => props.theme.tableHeaderCellColor};
      &.box_search {
        width: 100% !important;
      }
    }
    .rt-td {
      display: inline-block;
      padding: 1.5em 1em;
      width: auto !important;
      color: ${props => props.theme.tableBodyCellColor};
    }
  }
`;

const NoData = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
`

const PaginationStyler = styled(Pagination)`
  display: flex;
  justify-content: center;
  margin-top: 30px;

  .page-item.active .page-link {
    color: ${props => props.theme.paginationActiveColor};
  }

  .page-link {
    color: ${props => props.theme.paginationColor};
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

export { CommonTableStyler, PaginationStyler, NoData, EllipsisCellStyler };
