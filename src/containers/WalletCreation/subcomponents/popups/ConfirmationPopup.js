/**
 *
 * TomoWallet - Wallet Creation Page - Confirmation Popup
 *
 * This popup requires users to ensure that they've noted the recovery phrase
 * in somewhere safe & offline, in order to proceed.
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CardImg } from 'reactstrap';
// Custom Component
import Popup from '../../../../components/Popup';
// Utilities, Constants & Styles
import { withIntl } from '../../../../components/IntlProvider';
import { MSG } from '../../../../constants';
import { FORM_STATES } from '../../constants';
import { BoxImages } from '../../../../styles';
import imgRecovery from '../../../../assets/images/img-recovery.png';
// ===================

// ===== SUB-COMPONENT =====
const Content = ({ formatMessage }) => (
  <div className='text-center'>
    <BoxImages>
      <CardImg
        className='w-80'
        src={imgRecovery}
        alt={formatMessage(MSG.RECOVERY_PHRASE_POPUP_CONFIRMATION_IMAGE_ALT)}
      />
    </BoxImages>
    <div className='mt-3'>
      {formatMessage(MSG.RECOVERY_PHRASE_POPUP_CONFIRMATION_CONTENT)}
    </div>
  </div>
);
// =========================

// ===== MAIN COMPONENT =====
class ConfirmationPopup extends PureComponent {
  constructor(props) {
    super(props);

    this.handleClosePopup = this.handleClosePopup.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handleClosePopup() {
    const { togglePopup } = this.props;
    togglePopup(false);
  }

  handleNext() {
    const { setFormState, togglePopup } = this.props;
    togglePopup(false);
    setFormState(FORM_STATES.VERIFICATION);
  }

  render() {
    const {
      confirmation,
      intl: { formatMessage },
    } = this.props;
    return (
      <Popup
        isOpen={confirmation.isOpen}
        toggle={this.handleClosePopup}
        title={formatMessage(MSG.RECOVERY_PHRASE_POPUP_CONFIRMATION_HEADER)}
        Content={Content}
        getContentProps={{
          formatMessage,
        }}
        button={{
          primary: {
            action: this.handleNext,
            btnYellow: true,
            label: formatMessage(MSG.COMMON_BUTTON_NEXT),
          },
          secondary: {
            action: this.handleClosePopup,
            label: formatMessage(MSG.COMMON_BUTTON_BACK),
          },
        }}
      />
    );
  }
}
// ==========================

// ===== PROP TYPES =====
ConfirmationPopup.propTypes = {
  /** Popup's data set */
  confirmation: PropTypes.object,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to update wallet creation form state */
  setFormState: PropTypes.func,
  /** Action to toggle recovery phrase confirmation popup */
  togglePopup: PropTypes.func,
};

ConfirmationPopup.defaultProps = {
  confirmation: {},
  intl: {},
  setFormState: () => {},
  togglePopup: () => {},
};
// ======================

export default withIntl(ConfirmationPopup);
