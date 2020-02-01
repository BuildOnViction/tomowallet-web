/**
 *
 * TomoWallet - Clipboard Popup - Style
 *
 */
// ===== IMPORT =====
// Modules
import styled from 'styled-components';
// ==================

// ===== STYLE =====
const ClipboardPopupStyler = styled.div`
  position: fixed;
  z-index: 9999;
  bottom: ${({ isOpen }) => (isOpen ? '100px' : '-70px')};
  left: calc(50% - 75px);
  border-radius: 20px;
  height: 70px;
  padding: 20px 40px;
  background-color: ${props => props.theme.notificationBackground};
  color: ${props => props.theme.notificationColor};
  font-size: 15px;
  text-align: center;
  transition: all 0.5s;
`;
// =================

export { ClipboardPopupStyler };
