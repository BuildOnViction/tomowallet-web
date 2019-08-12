/**
 *
 * TomoWallet - Common Table Style
 *
 */
// ===== IMPORTS =====
// Modules
import ReactTable from 'react-table';
import styled from 'styled-components';
// ===================

// ===== STYLE =====
const CommonTableStyler = styled(ReactTable)`
  .rt-table {
    .rt-thead {
      .rt-th {
        display: inline-block;
      }
    }
  }
`;

const TokenCellStyler = styled.div`
  display: flex;
`;
// =================

export { CommonTableStyler };
