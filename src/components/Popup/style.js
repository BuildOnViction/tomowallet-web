/**
 *
 * TomoWallet - Common Popup - Style
 *
 */
// ===== IMPORTS =====
// Modules
import styled from 'styled-components';
import { Modal } from 'reactstrap';
// ===================

// ===== STYLE =====
const ModalStyles = styled(Modal)`
  .modal-content {
    padding: 2em;
    color: ${props => props.theme.modalColor};
    background-color: ${props => props.theme.boxBackground};
    .modal-title {
      color: ${props => props.theme.modalColor};
    }
  }
  .modal-header {
    justify-content: center;
    border: 0;
    padding: 0;
    button.close {
      display: none;
      position: absolute;
      top: 15px;
      right: 15px;
    }
  }
  .modal-body {
    padding: 3em 0;
  }
  .modal-footer {
    border: 0;
    padding: 0;
  }
`;
// =================

export default ModalStyles;
