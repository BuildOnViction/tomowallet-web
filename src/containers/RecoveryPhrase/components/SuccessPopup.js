/**
 *
 * Recovery Phrase - Verification Success Pop-up
 *
 */
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CardBody, CardTitle, CardText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Custom Components
import { SuccessPopupStyler } from '../style';

// ===== SUB-COMPONENTS =====
const SuccessContent = () => (
  <CardBody className='text-center'>
    <FontAwesomeIcon icon={['far', 'check-circle']} className='my-3' />
    <CardTitle className='mb-3'>Successful</CardTitle>
    <CardText className='mb-1'>
      You've created your new wallet successfully
    </CardText>
  </CardBody>
);
// ==========================

// ===== MAIN COMPONENT =====
class SuccessPopup extends PureComponent {
  render() {
    const { isOpen, handleExecution } = this.props;
    return (
      <SuccessPopupStyler
        backdrop='static'
        isOpen={isOpen}
        noHeader
        Content={SuccessContent}
        button={{
          primary: {
            label: 'Access your wallet now',
            action: handleExecution,
          },
        }}
      />
    );
  }
}
// ==========================

// ===== PROP TYPES =====
SuccessPopup.propTypes = {
  isOpen: PropTypes.bool,
  handleExecution: PropTypes.func,
};

SuccessPopup.defaultProps = {
  isOpen: false,
  handleExecution: () => {},
};
// ======================

export default SuccessPopup;
