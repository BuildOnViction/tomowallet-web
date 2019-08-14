/**
 *
 * TomoWallet - My Wallet Page - Porfolio Table - Action Cell
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Custom Components
// -- TO-DO: Update style for Token Name column cell
import { ActionCellStyler } from '../style';
// Constants
import { MSG } from '../../../../../../constants';
import { SEND_TOKEN_FIELDS, PORFOLIO_COLUMNS } from '../../../constants';
// ===================

// ===== MAIN COMPONENT =====
class ActionCell extends PureComponent {
  render() {
    const { formatMessage, openSendTokenPopup, rowValues } = this.props;
    return (
      <ActionCellStyler>
        {/* <div className='block-send'>
          <div role='presentation' onClick={() => {}}>
            {formatMessage(MSG.COMMON_BUTTON_SEND)}
          </div>
        </div>
        <div className='block-receive'>
          <div role='presentation' onClick={() => {}}>
            {formatMessage(MSG.COMMON_BUTTON_RECEIVE)}
          </div>
        </div> */}
        {/* <div className='block-details'>
          <FontAwesomeIcon icon='ellipsis-v' />
        </div> */}
      </ActionCellStyler>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
ActionCell.propTypes = {
  /** React Intl's API to get message */
  formatMessageL: PropTypes.func,
  /** Action to show send token popup with corresponsing token */
  openSendTokenPopup: PropTypes.func,
  /** Table row's values */
  rowValues: PropTypes.object,
};
// ======================

export default ActionCell;
