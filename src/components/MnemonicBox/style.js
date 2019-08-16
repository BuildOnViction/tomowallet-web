/**
 *
 * TomoWallet - Recovery Phrase Box Style
 *
 */
// ===== IMPORTS =====
// Modules
import styled from 'styled-components';
import { Row } from 'reactstrap';
// ===================

// ===== STYLE =====
const MnemonicBoxStyler = styled(Row)`
  &.bordered {
    border-radius: 8px;
    border: 1px solid #444b64;
  }
`;
// =================

export { MnemonicBoxStyler };
