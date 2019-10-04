/**
 *
 * TomoWallet - Import Wallet Page - Recovery Phrase/Private Key Tab - Style
 *
 */
// ===== IMPORTS =====
// Modules
import styled from 'styled-components';
// ===================

// ===== STYLE =====
const RPOrPKFormStyler = styled.div`
  ul.nav-tabs {
    border: 0;
    border-bottom: 1px dashed #444b63;
    font-size: 16px;
    .nav-link {
      background: transparent !important;
      border: 0;
      color: #5e677f;
      margin-right: 50px;
      padding: 0 0 5px;
      cursor: pointer;
      position: relative;
      &.active {
        color: #9eaacc;
        &::before {
          content: '';
          background-color: #5692cd;
          border-radius: 25px;
          width: 30px;
          height: 2px;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
    }
  }
`;
// =================

export { RPOrPKFormStyler };
