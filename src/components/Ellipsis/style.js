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
  position: relative;
  span {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    &:first-child {
      width: 50%;
      text-overflow: ellipsis;
    }
    + span {
      position: absolute;
      right: 0;
      width: 53%;
      text-overflow: ellipsis;
      direction: rtl;
      text-align: right;
    }
  }
`;
// =================

export { EllipsisStyler, MiddleEllipsisStyler };
