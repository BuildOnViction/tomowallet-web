/**
 *
 * TomoWallet - Show Wallet Popup - Style
 *
 */
// ===== IMPORTS =====
// Modules
import styled from 'styled-components';
// Custom Component
import { MainTabWrapper } from '../../../../styles';
import Popup from '../../../Popup';
// ===================

// ===== STYLE =====
const StyledMainTabWrapper = styled(MainTabWrapper).attrs({
  className: 'main_tab content-wallet-view',
})``

const WalletPopupStyler = styled(Popup)`
  max-width: 570px;
  .modal-content {
    min-height: 450px;
    .modal-body {
      .content-warning {
        margin: auto;
        max-width: 382px;
        .conntent-warning__image {
          margin: auto;
          margin-bottom: 30px;
          width: 245px;
          text-align: center;
          img {
            max-height: 126px;
          }
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

export { StyledMainTabWrapper, WalletPopupStyler };
