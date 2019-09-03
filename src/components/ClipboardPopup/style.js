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
  border: 1px solid #9aaacc;
  border-radius: 20px;
  height: 70px;
  padding: 20px 40px;
  background-color: #9aaacc;
  color: #272d40;
  font-size: 15px;
  text-align: center;
  transition: all 0.5s;
`;
// =================

export { ClipboardPopupStyler };
