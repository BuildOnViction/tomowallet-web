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
import Popup from '../../../../../components/Popup';
// Utilities & Constants
import { withIntl } from '../../../../../components/IntlProvider';
import { MSG } from '../../../../../constants';
import { FORM_STATES } from '../../constants';
// -- TO-DO: Add style for Confirmation popup
// ===================

// ===== SUB-COMPONENT =====
const Content = ({ formatMessage }) => (
  <div className='text-center'>
    {/* -- TO-DO: Add confirmation image's source */}
    <div>
      <CardImg
        src=''
        alt={formatMessage(MSG.RECOVERY_PHRASE_POPUP_CONFIRMATION_IMAGE_ALT)}
      />
    </div>
    <span>{formatMessage(MSG.RECOVERY_PHRASE_POPUP_CONFIRMATION_CONTENT)}</span>
  </div>
);
// =========================

// ===== MAIN COMPONENT =====
class ConfirmationPopup extends PureComponent {
  render() {
    const {
      intl: { formatMessage },
      isOpen,
      setFormState,
      toggleConfirmationPopup,
    } = this.props;
    return (
      <Popup
        isOpen={isOpen}
        Content={Content}
        getContentProps={{
          formatMessage,
        }}
        button={{
          primary: {
            label: formatMessage(MSG.COMMON_BUTTON_NEXT),
            action: () => setFormState(FORM_STATES.VERIFICATION),
          },
          secondary: {
            label: formatMessage(MSG.COMMON_BUTTON_BACK),
            action: () => toggleConfirmationPopup(false),
          },
        }}
      />
    );
  }
}
// ==========================

// ===== PROP TYPES =====
ConfirmationPopup.propTypes = {
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Condition flag to show/hide popup */
  isOpen: PropTypes.bool,
  /** Action to update wallet creation form state */
  setFormState: PropTypes.func,
  /** Action to toggle recovery phrase confirmation popup */
  toggleConfirmationPopup: PropTypes.func,
};
// ======================

export default withIntl(ConfirmationPopup);
