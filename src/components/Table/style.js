/**
 *
 * TomoWallet - Common Table Style
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
    .rt-tr {
      display: grid;
      grid-template-columns: 20% 15% 15% 15% 15% 15% 5%;
    }
    .rt-th {
      display: inline-block;
      padding: 1em .7em;
      width: auto !important;
      color: #5e677f;
    }
    .rt-td {
      display: inline-block;
      padding: 1.5em .7em;
      width: auto !important;
    }
  }
`;

const PaginationStyler = styled(Pagination)``;

const EllipsisCellStyler = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
// =================

export { CommonTableStyler, PaginationStyler, EllipsisCellStyler };
