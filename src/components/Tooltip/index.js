/**
 *
 * TomoWallet - Tooltip Component
 *
 * This component defines a custom component for tooltip
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
// Custom Components
import { TooltipStyler } from './style';
// ===================

// ===== MAIN COMPONENT =====
class Tooltip extends PureComponent {
  render() {
    const { children, ...remains } = this.props;
    return <TooltipStyler {...remains}>{children}</TooltipStyler>;
  }
}
// ==========================

export default Tooltip;
