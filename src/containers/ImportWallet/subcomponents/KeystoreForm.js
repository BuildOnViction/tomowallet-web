/**
 *
 * TomoWallet - Import Wallet Page - Keystore Form
 *
 * This component define a file upload form for user to upload their keystore file
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
import FileUploadInput from '../../../components/FileUpload';
import PasswordPopup from './PasswordPopup';
// Utilities & Constants
import { withIntl } from '../../../components/IntlProvider';
import { withWeb3 } from '../../../components/Web3';
import { selectPasswordPopup } from '../selectors';
import {
  loadKeystoreFile,
  togglePasswordPopup,
  updatePasswordPopupErrors,
  updateInput,
} from '../actions';
import { decryptKeystore, isElectron, writeKeystore } from '../../../utils';
import { MSG } from '../../../constants';
// ===================

// ===== MAIN COMPONENT =====
class KeystoreForm extends PureComponent {
  constructor(props) {
    super(props);

    this.handleDecryptFileData = this.handleDecryptFileData.bind(this);
    this.handleLoadKeystore = this.handleLoadKeystore.bind(this);
  }

  handleDecryptFileData() {
    const {
      accessWallet,
      intl: { formatMessage },
      onTogglePasswordPopup,
      onUpdateInput,
      onUpdatePasswordPopupErrors,
      passwordPopup,
    } = this.props;
    const password = _get(passwordPopup, 'input.password', '');
    const fileData = _get(passwordPopup, 'fileData', {});
    try {
      const decryptedData = decryptKeystore(fileData, password);

      if (isElectron()) {
        writeKeystore(fileData).then(({ error }) => {
          if (error) {
            onUpdatePasswordPopupErrors({
              password: error.message,
            });
          }
        });
      }

      new Promise(r =>
        r(onUpdateInput('privateKey', _get(decryptedData, 'privateKey'))),
      )
        .then(() => {
          accessWallet('keystore');
        })
        .then(() => {
          onTogglePasswordPopup(false);
        });
    } catch {
      onUpdatePasswordPopupErrors({
        password: formatMessage(
          MSG.IMPORT_WALLET_POPUP_PASSWORD_INPUT_INVALID_PASSWORD,
        ),
      });
    }
  }

  handleLoadKeystore(fileData) {
    const { onLoadKeystoreFile, onTogglePasswordPopup } = this.props;
    onLoadKeystoreFile(fileData);
    onTogglePasswordPopup(true);
  }

  render() {
    return (
      <div className='justify-content-center text-center'>
        <FileUploadInput onLoaded={this.handleLoadKeystore} />
        <PasswordPopup decryptData={this.handleDecryptFileData} />
      </div>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
KeystoreForm.propTypes = {
  /** Action to start accessing to user wallet */
  accessWallet: PropTypes.func,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to store keystore file's content */
  onLoadKeystoreFile: PropTypes.func,
  /** Action to handle input change */
  onUpdateInput: PropTypes.func,
  /** Action to set password popup's error messages */
  onUpdatePasswordPopupErrors: PropTypes.func,
  /** Password popup's state */
  passwordPopup: PropTypes.object,
  /** Web3 object */
  web3: PropTypes.object,
};

KeystoreForm.defaultProps = {
  accessWallet: () => {},
  intl: {},
  onLoadKeystoreFile: () => {},
  onUpdateInput: () => {},
  onUpdatePasswordPopupErrors: () => {},
  passwordPopup: {},
  web3: {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    passwordPopup: selectPasswordPopup,
  });
const mapDispatchToProps = dispatch => ({
  onLoadKeystoreFile: data => dispatch(loadKeystoreFile(data)),
  onTogglePasswordPopup: bool => dispatch(togglePasswordPopup(bool)),
  onUpdateInput: (name, value) => dispatch(updateInput(name, value)),
  onUpdatePasswordPopupErrors: errors =>
    dispatch(updatePasswordPopupErrors(errors)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
// ======================

export default compose(
  withConnect,
  withIntl,
  withWeb3,
)(KeystoreForm);
