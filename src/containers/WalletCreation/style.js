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
const Wrapper = styled.div`
  padding: 34px 0;
`

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

const RowCentered = styled.div`
  display: flex;
  justify-content: center;
`
// =================

export { Wrapper, WalletCreationStyler, RowCentered };
