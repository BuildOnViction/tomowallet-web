/**
 *
 * TomoWallet - Import Wallet Page - Password Popup
 *
 * This component shows a form of password for user to encrypt their keystore
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _get from 'lodash.get';
// Custom Components
import { PasswordPopupStyler } from './style';
import PasswordContent from './content';
// Utilities & Constants
import { withIntl } from '../../../../components/IntlProvider';
import { selectPasswordPopup } from '../../selectors';
import {
  loadKeystoreFile,
  revealPasswordInput,
  togglePasswordPopup,
  updatePasswordPopupInput,
} from '../../actions';
import { MSG } from '../../../../constants';
// ===================

// ===== MAIN COMPONENT =====
class PasswordPopup extends PureComponent {
  constructor(props) {
    super(props);

    this.handleClosePasswordPopup = this.handleClosePasswordPopup.bind(this);
  }

  handleClosePasswordPopup() {
    const { onLoadKeystoreFile, onTogglePasswordPopup } = this.props;
    onLoadKeystoreFile({});
    onTogglePasswordPopup(false);
  }

  render() {
    const {
      decryptData,
      intl: { formatMessage },
      onRevealPasswordInput,
      onUpdatePasswordPopupInput,
      popupData,
    } = this.props;
    return (
      <PasswordPopupStyler
        button={{
          primary: {
            action: decryptData,
            btnYellow: true,
            label: formatMessage(MSG.COMMON_BUTTON_CONFIRM),
          },
          secondary: {
            action: this.handleClosePasswordPopup,
            label: formatMessage(MSG.COMMON_BUTTON_BACK),
          },
        }}
        Content={PasswordContent}
        getContentProps={{
          decryptData,
          errors: _get(popupData, 'errors', {}),
          isRevealed: _get(popupData, 'isRevealed', false),
          revealText: onRevealPasswordInput,
          updateInput: onUpdatePasswordPopupInput,
          value: _get(popupData, 'input.password', ''),
        }}
        isOpen={_get(popupData, 'isOpen', false)}
        title={formatMessage(MSG.IMPORT_WALLET_POPUP_PASSWORD_TITLE)}
      />
    );
  }
}
// ==========================

// ===== PROP TYPES =====
PasswordPopup.propTypes = {
  /** Action to start decrypt imported keystore by given password */
  decryptData: PropTypes.func,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to hide/reveal password as plain text */
  onRevealPasswordInput: PropTypes.func,
  /** Action to show/hide popup */
  onTogglePasswordPopup: PropTypes.func,
  /** Action to update popup form's input */
  onUpdatePasswordPopupInput: PropTypes.func,
  /** Popup's state */
  popupData: PropTypes.object,
};

PasswordPopup.defaultProps = {
  decryptData: () => {},
  intl: {},
  onRevealPasswordInput: () => {},
  onTogglePasswordPopup: () => {},
  onUpdatePasswordPopupInput: () => {},
  popupData: {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    popupData: selectPasswordPopup,
  });
const mapDispatchToProps = dispatch => ({
  onLoadKeystoreFile: data => dispatch(loadKeystoreFile(data)),
  onRevealPasswordInput: bool => dispatch(revealPasswordInput(bool)),
  onTogglePasswordPopup: bool => dispatch(togglePasswordPopup(bool)),
  onUpdatePasswordPopupInput: (name, value) =>
    dispatch(updatePasswordPopupInput(name, value)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
// ======================

export default compose(
  withConnect,
  withIntl,
)(PasswordPopup);
