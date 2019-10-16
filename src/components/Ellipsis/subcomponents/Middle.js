/**
 *
 * TomoWallet - Ellipsis Component - Middle Type
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
// Custom Components
import { MiddleEllipsisStyler } from '../style';
// ===================

// ===== MAIN COMPONENT =====
class MiddleEllipsis extends PureComponent {
  render() {
    const { children, ...remains } = this.props;

    return (
      <MiddleEllipsisStyler {...remains}>
        <span>{children}</span>
        <span>{children}</span>
      </MiddleEllipsisStyler>
    );
  }
}
// ==========================

export default MiddleEllipsis;
