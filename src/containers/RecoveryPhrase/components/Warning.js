// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
} from 'reactstrap';
// Custom Components
import { ButtonStyler, ErrorTextStyler } from '../../../styles';
// Styles
import warningIcon from '../../../assets/images/warning-icon.png';
import { FORM_STATES } from '../constants';

// ===== MAIN COMPONENT =====
class Warning extends PureComponent {
  render() {
    const { updateFormState } = this.props;
    return (
      <Card className='warning-content p-4'>
        <div className='full-width mt-3'>
          <CardImg draggable src={warningIcon} />
        </div>
        <CardBody className='text-center'>
          <CardTitle className='mb-4'>{`Let's secure your account`}</CardTitle>
          <CardText className='text-left mb-4'>
            Your backup phrase contains all of the private keys within your
            wallet. Please write down these 12 words, in order, and keep them
            somewhere safe offline. This phrase will gives you (or anyone who
            has it) a way to restore your wallet and access your funds. In the
            event that you lose your password or our service is unavailable,
            this will be your safety net.
          </CardText>
          <CardText className='text-left mb-4'>
            <ErrorTextStyler>
              If you lose your recovery phrase, you will be unable to recover
              access to your account
            </ErrorTextStyler>
          </CardText>
          <CardText>
            <ButtonStyler onClick={() => updateFormState(FORM_STATES.PHRASE)}>
              Next to Recovery Phrase
            </ButtonStyler>
          </CardText>
        </CardBody>
      </Card>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
Warning.propTypes = {
  updateFormState: PropTypes.func,
};
// ======================

export default Warning;
