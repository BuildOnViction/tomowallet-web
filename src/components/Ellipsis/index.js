/**
 *
 * TomoWallet - Ellipsis Component
 *
 */
// ===== IMPORTS =====
// Modules
import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import generateHash from 'random-hash';
// Custom Components
import NormalEllipsis from './subcomponents/Left';
import MiddleEllipsis from './subcomponents/Middle';
import Tooltip from '../Tooltip';
// ===================

// ===== MAIN COMPONENT =====
class Ellipsis extends PureComponent {
  render() {
    const { children, middle } = this.props;
    const id = `ellipsis_${generateHash({ length: 7 })}`;

    return (
      <Fragment>
        {middle ? (
          <MiddleEllipsis id={id}>{children}</MiddleEllipsis>
        ) : (
          <NormalEllipsis id={id}>{children}</NormalEllipsis>
        )}
        <Tooltip placement='top' target={id}>
          {children}
        </Tooltip>
      </Fragment>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
Ellipsis.propTypes = {
  /** Condition flag to determine ellipsis's position */
  middle: PropTypes.bool,
};
// ======================

export default Ellipsis;
