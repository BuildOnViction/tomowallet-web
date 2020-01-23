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
    background-color: ${props => props.theme.mnemonicBackground};
    border-radius: 8px;
    border: 1px solid ${props => props.theme.mnemonicBorder};
  }
`;
// =================

export { MnemonicBoxStyler };
