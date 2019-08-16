/**
 *
 * TomoWallet - Loading Screen - Style
 *
 */
// ===== IMPORTS =====
// Modules
import styled from 'styled-components';
// ===================

// ===== STYLE =====
const LoadingStyler = styled.div`
  display: ${({ loading }) => (loading ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  width: 100vw;
  height: 100vh;
  padding-left: calc(50vw - 30px);
  padding-top: calc(50vh - 30px);
  background-color: black;
  opacity: 0.5;
  .spinner-border {
    width: 60px;
    height: 60px;
  }
`;
// =================

export { LoadingStyler };
