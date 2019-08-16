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
        margin: 10px 65px;
        div:has(> img) {
          width: 245px;
          height: 145px;
        }
      }
    }
  }
`;
// =================

export { WalletPopupStyler };
