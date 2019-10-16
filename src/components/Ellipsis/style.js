/**
 *
 * TomoWallet - Ellipsis Component - Style
 *
 */
// ===== IMPORTS =====
// Modules
import styled from 'styled-components';
// ===================

// ===== STYLE =====
const EllipsisStyler = styled.div`
  width: 100%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const MiddleEllipsisStyler = styled.div`
  span {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    &:first-child {
      width: 50%;
      text-overflow: ellipsis;
    }
    + span {
      width: calc(50% - 10px);
      direction: rtl;
      text-align: right;
    }
  }
`;
// =================

export { EllipsisStyler, MiddleEllipsisStyler };
