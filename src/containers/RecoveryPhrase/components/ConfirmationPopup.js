/**
 *
 * Recovery Phrase - Mnemonic Noted Confirmation Pop-up
 *
 */
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CardBody, CardText } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
// Custom Components
import { ConfirmationPopupStyler } from '../style';

// ===== SUB-COMPONENTS =====
const ConfirmationContent = () => (
  <CardBody className='text-center'>
    <CardText>
      <FontAwesome name='edit' />
    </CardText>
    <CardText>Are you sure you have noted down your Recovery Phrase?</CardText>
  </CardBody>
);
// ==========================

// ===== MAIN COMPONENT =====
class ConfirmationPopup extends PureComponent {
  render() {
    const { isOpen, handleExecution, hidePopup } = this.props;
    return (
      <ConfirmationPopupStyler
        backdrop='static'
        isOpen={isOpen}
        toggle={hidePopup}
        Content={ConfirmationContent}
        button={{
          primary: {
            label: 'Next',
            action: handleExecution,
          },
          secondary: {
            label: 'Go back',
            action: hidePopup,
          },
        }}
      />
    );
  }
}
// ==========================

// ===== PROP TYPES =====
ConfirmationPopup.propTypes = {
  isOpen: PropTypes.bool,
  handleExecution: PropTypes.func,
  hidePopup: PropTypes.func,
};

ConfirmationPopup.defaultProps = {
  isOpen: false,
  handleExecution: () => {},
  hidePopup: () => {},
};
// ======================

export default ConfirmationPopup;
