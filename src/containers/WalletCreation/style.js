/**
 *
 * TomoWallet - Wallet Creation Page - Style
 *
 */
// ===== IMPORT =====
// Modules
import styled from 'styled-components';
// Custom Component
import { ContainerMin } from '../../styles';
// ==================

// ===== STYLE =====
const WalletCreationStyler = styled(ContainerMin)`
  .btn-reload {
    font-size: 15px;
    &:hover {
      svg {
        animation: roller 2s linear infinite;
      }
    }
  }
`;
// =================

export { WalletCreationStyler };
