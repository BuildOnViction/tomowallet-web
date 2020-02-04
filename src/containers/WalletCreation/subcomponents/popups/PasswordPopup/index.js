/**
 *
 * TomoWallet - Create Wallet Page - Password Popup
 *
 * This component defines a password form in order to encrypt user's keystore file.
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _get from 'lodash.get';
import _isEmpty from 'lodash.isempty';
import _isEqual from 'lodash.isequal';
import moment from 'moment';
// Custom Components
import { PasswordPopupStyler } from './style';
import PasswordContent from './content';
// Utilities
import { withIntl } from '../../../../../components/IntlProvider';
import { selectPasswordPopup, selectMnemonic } from '../../../selectors';
import {
  revealPasswordInput,
  togglePasswordPopup,
  updatePasswordPopupErrors,
  updatePasswordPopupInput,
  updatePasswordPopupState,
} from '../../../actions';
import {
  encryptKeystore,
  mergeErrors,
  mnemonicToPrivateKey,
  validations,
  decryptKeystore,
  downloadFile,
} from '../../../../../utils';
import { MSG } from '../../../../../constants';
import { PASSWORD_POPUP_STATES } from '../../../constants';
// ===================

// ===== MAIN COMPONENT =====
class PasswordPopup extends PureComponent {
  constructor(props) {
    super(props);

    this.handleEncryptData = this.handleEncryptData.bind(this);
    this.handleMoveToConfirmationForm = this.handleMoveToConfirmationForm.bind(
      this,
    );
    this.handleMoveToPasswordForm = this.handleMoveToPasswordForm.bind(this);
    this.handleValidateForm = this.handleValidateForm.bind(this);
  }

  handleEncryptData() {
    const {
      intl: { formatMessage },
      mnemonicState,
      onTogglePopup,
      onUpdateErrors,
      popupData,
      rpcServer,
    } = this.props;

    if (
      !_isEqual(
        _get(popupData, 'input.password'),
        _get(popupData, 'input.confirmation'),
      )
    ) {
      onUpdateErrors({
        confirmation: [
          formatMessage(
            MSG.CREATE_WALLET_POPUP_PASSWORD_ERROR_INVALID_CONFIRMATION,
          ),
        ],
      });
    } else {
      const privKey = mnemonicToPrivateKey(
        _get(mnemonicState, 'origin', ''),
        rpcServer,
      );
      const encryptedData = encryptKeystore(
        `0x${privKey}`,
        _get(popupData, 'input.password', ''),
      );
      const timePrefix = moment().format('ZZ--YYYY-MM-DD-HH-mm-ss');
      const { address } =
        decryptKeystore(encryptedData, _get(popupData, 'input.password', '')) ||
        {};

      downloadFile({
        content: JSON.stringify(encryptedData),
        name: `${timePrefix}.${address}`,
      });
      onTogglePopup(false);
    }
  }

  handleMoveToConfirmationForm() {
    const { onUpdateErrors, onUpdateState } = this.props;
    const errors = this.handleValidateForm();

    if (!_isEmpty(errors)) {
      onUpdateErrors(errors);
    } else {
      onUpdateState(PASSWORD_POPUP_STATES.CONFIRMATION);
    }
  }

  handleMoveToPasswordForm() {
    const { onUpdateInput, onUpdateState } = this.props;

    onUpdateState(PASSWORD_POPUP_STATES.PASSWORD);
    onUpdateInput('confirmation', '');
  }

  handleValidateForm() {
    const {
      intl: { formatMessage },
      popupData,
    } = this.props;
    const { isRequired, isMinLength } = validations;

    return mergeErrors(
      [
        {
          ...isRequired(
            { name: 'password', value: _get(popupData, 'input.password', '') },
            formatMessage(
              MSG.CREATE_WALLET_POPUP_PASSWORD_ERROR_PASSWORD_REQUIRED,
            ),
          ),
          ...isMinLength(
            {
              name: 'password',
              value: _get(popupData, 'input.password'),
              min: 8,
            },
            formatMessage(
              MSG.CREATE_WALLET_POPUP_PASSWORD_ERROR_MINIMUM_PASSWORD,
            ),
          ),
        },
      ],
      _get(popupData, 'errors'),
    );
  }

  render() {
    const {
      intl: { formatMessage },
      onRevealPasswordInput,
      onTogglePopup,
      onUpdateInput,
      popupData,
    } = this.props;
    const formState = _get(popupData, 'state');

    return (
      <PasswordPopupStyler
        button={
          (formState === PASSWORD_POPUP_STATES.PASSWORD && {
            primary: {
              action: this.handleMoveToConfirmationForm,
              btnYellow: true,
              label: formatMessage(MSG.COMMON_BUTTON_NEXT),
            },
            secondary: {
              action: () => onTogglePopup(false),
              label: formatMessage(MSG.COMMON_BUTTON_BACK),
            },
          }) ||
          (formState === PASSWORD_POPUP_STATES.CONFIRMATION && {
            primary: {
              action: this.handleEncryptData,
              btnYellow: true,
              label: formatMessage(MSG.COMMON_BUTTON_SAVE),
            },
            secondary: {
              action: this.handleMoveToPasswordForm,
              label: formatMessage(MSG.COMMON_BUTTON_BACK),
            },
          })
        }
        Content={PasswordContent}
        getContentProps={{
          errors: _get(popupData, 'errors', {}),
          formState: _get(popupData, 'state', PASSWORD_POPUP_STATES.PASSWORD),
          formValues: _get(popupData, 'input', {}),
          isRevealed: _get(popupData, 'isRevealed', false),
          revealText: onRevealPasswordInput,
          updateInput: onUpdateInput,
          handleSubmit:
            formState === PASSWORD_POPUP_STATES.PASSWORD
              ? this.handleMoveToConfirmationForm
              : this.handleEncryptData,
        }}
        isOpen={_get(popupData, 'isOpen', false)}
        title={formatMessage(MSG.CREATE_WALLET_POPUP_PASSWORD_TITLE)}
      />
    );
  }
}
// ==========================

// ===== PROP TYPES =====
PasswordPopup.propTypes = {
  /** Mnemonic generation's state */
  mnemonicState: PropTypes.object,
  /** Action to hide/reveal password input */
  onRevealPasswordInput: PropTypes.func,
  /** Action to show/hide popup */
  onTogglePopup: PropTypes.func,
  /** Action to update popup's error messages */
  onUpdateErrors: PropTypes.func,
  /** Action to handle input change */
  onUpdateInput: PropTypes.func,
  /** Action to change password popup form state */
  onUpdateState: PropTypes.func,
  /** Popup's data */
  popupData: PropTypes.object,
  /** Current RPC server configuration */
  rpcServer: PropTypes.object,
};

PasswordPopup.defaultProps = {
  mnemonicState: {},
  onRevealPasswordInput: () => {},
  onTogglePopup: () => {},
  onUpdateErrors: () => {},
  onUpdateInput: () => {},
  onUpdateState: () => {},
  popupData: {},
  rpcServer: {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    mnemonicState: selectMnemonic,
    popupData: selectPasswordPopup,
  });
const mapDispatchToProps = dispatch => ({
  onRevealPasswordInput: bool => dispatch(revealPasswordInput(bool)),
  onTogglePopup: bool => dispatch(togglePasswordPopup(bool)),
  onUpdateErrors: errors => dispatch(updatePasswordPopupErrors(errors)),
  onUpdateInput: (name, value) =>
    dispatch(updatePasswordPopupInput(name, value)),
  onUpdateState: state => dispatch(updatePasswordPopupState(state)),
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
