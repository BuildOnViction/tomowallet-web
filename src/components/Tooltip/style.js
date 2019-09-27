/**
 *
 * TomoWallet - Tooltip Component - Style
 */
// ===== IMPORTS =====
// Modules
import styled from 'styled-components';
import { UncontrolledTooltip } from 'reactstrap';
// ===================

// ===== STYLE =====
const TooltipStyler = styled(UncontrolledTooltip)`
  .tooltip-inner {
    padding: 10px;
    border-radius: 10px;
    background-color: #202533;
    color: white;
    font-size: 12px;
  }
  .arrow::before {
    border-top-color: #202533;
  }
`;
// =================

export { TooltipStyler };
