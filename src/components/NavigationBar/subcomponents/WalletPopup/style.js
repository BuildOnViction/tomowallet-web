/**
 *
 * TomoWallet - Show Wallet Popup - Style
 *
 */
// ===== IMPORTS =====
// Modules
import styled from 'styled-components';
// Custom Component
import Popup from '../../../Popup';
// ===================

// ===== STYLE =====
const WalletPopupStyler = styled(Popup)`
  max-width: 570px;
  .modal-content {
    min-height: 450px;
    .modal-body {
      .content-warning {
        margin: 0px 65px;
        .conntent-warning__image {
          margin: auto;
          margin-bottom: 30px;
          width: 245px;
          height: 145px;
          text-align: center;
        }
      }
      .content-wallet-view {
        .nav-tabs {
          display: flex;
          justify-content: center;
        }
      }
    }
  }
`;
// =================

export { WalletPopupStyler };
