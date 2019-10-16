/**
 *
 * TomoWallet - Ellipsis Component - Middle Type
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
// Custom Components
import { EllipsisStyler } from '../style';
// ===================

// ===== MAIN COMPONENT =====
class NormalEllipsis extends PureComponent {
  render() {
    const { children, ...remains } = this.props;

    return <EllipsisStyler {...remains}>{children}</EllipsisStyler>;
  }
}
// ==========================

export default NormalEllipsis;
