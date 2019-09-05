/**
 *
 * Import Wallet Page - Recovery Phrase/Private Key Form
 *
 */
// Modules
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _get from 'lodash.get';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Custom Components
import FileUploadInput from '../../../components/FileUpload';
import PasswordPopup from './PasswordPopup';
// Utilities & Constants
import { withIntl } from '../../../components/IntlProvider';
import { withWeb3 } from '../../../components/Web3';
import { MSG } from '../../../constants';
import { selectImportState, selectPasswordPopup } from '../selectors';
import {
  updateInput,
  loadKeystoreFile,
  togglePasswordPopup,
  updatePasswordPopupErrors,
} from '../actions';
import { decryptKeystore } from '../../../utils';

// ===== MAIN COMPONENT =====
class RPOrPKForm extends PureComponent {
  constructor(props) {
    super(props);

    this.handleDecryptFileData = this.handleDecryptFileData.bind(this);
    this.handleLoadKeystore = this.handleLoadKeystore.bind(this);
  }

  handleDecryptFileData() {
    const {
      intl: { formatMessage },
      onTogglePasswordPopup,
      onUpdateInput,
      onUpdatePasswordPopupErrors,
      passwordPopup,
      web3,
    } = this.props;
    const password = _get(passwordPopup, 'input.password', '');
    const fileData = _get(passwordPopup, 'fileData', {});
    try {
      const decryptedData = decryptKeystore(web3, fileData, password);

      onUpdateInput('recoveryPhrase', _get(decryptedData, 'privateKey'));
      onTogglePasswordPopup(false);
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
    const {
      importWallet,
      intl: { formatMessage },
      onUpdateInput,
    } = this.props;
    const errors = _get(importWallet, 'errors', []);

    return (
      <Fragment>
        <FormGroup>
          <Label>
            {formatMessage(MSG.IMPORT_WALLET_TAB_RECOVERY_PHRASE_INPUT_LABEL)}
            <FontAwesomeIcon icon='unlock' />
          </Label>
          <Input
            type='textarea'
            name='recoveryPhrase'
            placeholder={formatMessage(
              MSG.IMPORT_WALLET_TAB_RECOVERY_PHRASE_INPUT_PLACEHOLDER,
            )}
            value={_get(importWallet, 'input.recoveryPhrase', '')}
            onChange={e => onUpdateInput('recoveryPhrase', e.target.value)}
            invalid={errors.length > 0}
          />
          <FileUploadInput onLoaded={this.handleLoadKeystore} />
          <FormFeedback>
            {errors.map((err, errIdx) => (
              <div key={`error_${errIdx + 1}`}>{`* ${err}`}</div>
            ))}
          </FormFeedback>
        </FormGroup>
        <PasswordPopup decryptData={this.handleDecryptFileData} />
      </Fragment>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
RPOrPKForm.propTypes = {
  /** Import Wallet page's state */
  importWallet: PropTypes.object,
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

RPOrPKForm.defaultProps = {
  importWallet: {},
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
    importWallet: selectImportState,
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
)(RPOrPKForm);
