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
    grid-template-columns: 20% 15% 15% 15% 35%;
  }
  .rt-tbody {
    .rt-tr {
      grid-template-columns: 20% 15% 15% 15% 15% 15% 5%;
    }
  }
`;

// =================

export { TokenCellStyler, BoxPortfolio };
