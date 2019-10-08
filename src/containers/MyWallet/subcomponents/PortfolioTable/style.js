/**
 *
 * TomoWallet - My Wallet Page - Portfolio Table - Styles
 *
 */
// ===== IMPORTS =====
// Modules
import styled from 'styled-components';
// ===================

// ===== STYLE =====
const TokenCellStyler = styled.div`
  display: flex;
  align-items: center;
  .block-symbol {
    img {
      width: 34px;
    }
  }
  .block-token {
    padding-left: 10px;
    line-height: 1;
    .block-token__name {
      font-size: 16px;
      color: #9eaacc;
    }
    .block-token__publisher {
      font-size: 14px;
      color: #5e677f;
      margin-top: 5px;
    }
  }
`;

const BoxPortfolio = styled.div`
  .rt-tr {
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
    .rt-th {
      position: relative;
      &:not(.no-header):before {
        content '';
        position: absolute;
        bottom: 0;
        left: 2%;
        width: 20px;
        height: 0;
        border-left: 10px solid #5e677f;
        border-bottom: 3px solid #5e677f;
        border-top: 3px solid transparent;
        border-right: 10px solid transparent;
      }
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 2%;
        width: 96%;
        height: 1px;
        background-color: #5e677f;
      }
    }
  }
  .rt-tbody {
    .rt-tr {
      grid-template-columns: 20% 20% 20% 20% 15% 5%;
    }
  }
`;

// =================

export { TokenCellStyler, BoxPortfolio };
