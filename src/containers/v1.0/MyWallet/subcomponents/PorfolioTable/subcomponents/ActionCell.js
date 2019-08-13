/**
 *
 * TomoWallet - My Wallet Page - Porfolio Table - Action Cell
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Custom Components
// -- TO-DO: Update style for Token Name column cell
import { ActionCellStyler } from '../style';
// Constants
import { MSG } from '../../../../../../constants';
// ===================

// ===== MAIN COMPONENT =====
class ActionCell extends PureComponent {
  render() {
    const { formatMessage } = this.props;
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
        <div className='block-details'>
          <FontAwesomeIcon icon='ellipsis-v' />
        </div>
      </ActionCellStyler>
    );
  }
}
// ==========================

export default ActionCell;
