/**
 *
 * TomoWallet - Welcome Page
 *
 * This is the default page when user visits TomoWallet Web.
 * It provides 2 options to access to wallet: "Create New Wallet" & "Import Wallet".
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import _get from 'lodash.get';
import { Helmet } from 'react-helmet';
// Custom Component
import FreshLogin from './subcomponents/FreshLogin';
import QuickAccess from './subcomponents/QuickAccess';
// Utilities, Constants & Styles
import { selectPasswordForm } from './selectors';
import {
  loadKeystoreData,
  resetState,
  togglePasswordForm,
  updatePasswordErrors,
  updatePasswordInput,
} from './action';
import { DOMAIN_KEY } from './constants';
import reducer from './reducer';
import { withIntl } from '../../components/IntlProvider';
import { withWeb3 } from '../../components/Web3';
import {
  injectReducer,
  decryptKeystore,
  isPrivateKey,
  withGlobal,
  createWeb3,
  setWeb3Info,
  isElectron,
  detectKeystore,
  readKeystore,
  getWalletInfo,
} from '../../utils';
import { MSG, ROUTE, ENUM } from '../../constants';
import { toggleLoading, storeWallet } from '../Global/actions';
import { detectRPFile, readRPFile } from '../../utils/electron';
// ===================

// ===== MAIN COMPONENT =====
class WelcomePage extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChangeLoginForm = this.handleChangeLoginForm.bind(this);
    this.handleChangePasswordInput = this.handleChangePasswordInput.bind(this);
    this.handleQuickAccess = this.handleQuickAccess.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleValidatePassword = this.handleValidatePassword.bind(this);
  }

  componentDidMount() {
    const { onLoadKeystoreData, onTogglePasswordForm } = this.props;
    if (isElectron()) {
      detectRPFile().then(({ error }) => {
        if (error) {
          detectKeystore().then(({ error }) => {
            if (error) {
              onTogglePasswordForm(false);
            } else {
              readKeystore().then(({ error, data }) => {
                if (error) {
                  onTogglePasswordForm(false);
                } else {
                  onLoadKeystoreData(JSON.parse(data));
                  onTogglePasswordForm(true);
                }
              });
            }
          });
        } else {
          readRPFile().then(({ error, data }) => {
            if (error) {
              onTogglePasswordForm(false);
            } else {
              this.handleQuickAccess(
                decryptKeystore(JSON.parse(data), 'recoveryPhrase'),
              );
            }
          });
        }
      });
    } else {
      onTogglePasswordForm(false);
    }
  }

  componentWillUnmount() {
    const { onResetState } = this.props;
    onResetState();
  }

  handleChangeLoginForm() {
    const { onTogglePasswordForm } = this.props;
    onTogglePasswordForm(false);
  }

  handleChangePasswordInput(newValue) {
    const { onUpdatePasswordInput } = this.props;
    onUpdatePasswordInput('password', newValue);
  }

  handleQuickAccess(addressObj) {
    const {
      intl: { formatMessage },
      onStoreWallet,
      onUpdatePasswordErrors,
      rpcServer,
      toggleLoading,
      updateWeb3,
    } = this.props;
    const privKey = _get(addressObj, 'privateKey', '');

    toggleLoading(true);
    if (isPrivateKey(privKey)) {
      try {
        const newWeb3 = createWeb3(privKey, rpcServer);
        updateWeb3(newWeb3);
        getWalletInfo(newWeb3)
          .then(walletInfo => {
            onStoreWallet(walletInfo);
            setWeb3Info({
              loginType: ENUM.LOGIN_TYPE.PRIVATE_KEY,
              recoveryPhrase: privKey,
              address: walletInfo.address,
            });
          })
          .then(() => {
            toggleLoading(false);
            this.handleRedirect(ROUTE.MY_WALLET);
          });
      } catch {
        toggleLoading(false);
        onUpdatePasswordErrors({
          password: [
            formatMessage(
              MSG.WELCOME_FORM_PASSWORD_ERROR_RETRIEVE_WALLET_FAILED,
            ),
          ],
        });
      }
    } else {
      toggleLoading(false);
      onUpdatePasswordErrors({
        password: [
          formatMessage(MSG.WELCOME_FORM_PASSWORD_ERROR_INVALID_PRIVATE_KEY),
        ],
      });
    }
  }

  handleRedirect(newRoute) {
    const { history } = this.props;
    history.push(newRoute);
  }

  handleValidatePassword() {
    const {
      intl: { formatMessage },
      onUpdatePasswordErrors,
      passwordForm,
    } = this.props;
    const pwd = _get(passwordForm, 'input.password', '');
    const keystoreData = _get(passwordForm, 'data', {});

    try {
      const addressObj = decryptKeystore(keystoreData, pwd);
      this.handleQuickAccess(addressObj);
    } catch (error) {
      onUpdatePasswordErrors({
        password: [
          formatMessage(MSG.WELCOME_FORM_PASSWORD_ERROR_INVALID_PASSWORD),
        ],
      });
    }
  }

  render() {
    const {
      intl: { formatMessage },
      passwordForm,
    } = this.props;
    const hasKeystore = _get(passwordForm, 'isOpen');

    return (
      <Fragment>
        <Helmet>
          <title>{formatMessage(MSG.WELCOME_TITLE)}</title>
        </Helmet>
        {(hasKeystore && (
          <QuickAccess
            address={_get(passwordForm, 'data.address', '')}
            changePasswordInput={this.handleChangePasswordInput}
            errors={_get(passwordForm, 'errors', {})}
            formValues={_get(passwordForm, 'input', {})}
            redirectToFreshLogin={this.handleChangeLoginForm}
            validatePassword={this.handleValidatePassword}
          />
        )) ||
          (hasKeystore === false && (
            <FreshLogin redirectTo={this.handleRedirect} />
          ))}
      </Fragment>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
WelcomePage.propTypes = {
  /** React Router's API object */
  history: PropTypes.object,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to reset page's state */
  onResetState: PropTypes.func,
  /** Action to save wallet information */
  onStoreWallet: PropTypes.func,
  /** Action to change between login form types */
  onTogglePasswordForm: PropTypes.func,
  /** Action to set password input's error messages */
  onUpdatePasswordErrors: PropTypes.func,
  /** Action to update password input's value */
  onUpdatePasswordInput: PropTypes.func,
  /** Password form data */
  passwordForm: PropTypes.object,
  /** Action to show/hide loading screen */
  toggleLoading: PropTypes.func,
  /** Action to modify Web3 provider */
  updateWeb3: PropTypes.func,
  /** Current Web3 provider */
  web3: PropTypes.object,
};

WelcomePage.defaultProps = {
  history: {},
  intl: {},
  onResetState: () => {},
  onStoreWallet: () => {},
  onTogglePasswordForm: () => {},
  onUpdatePasswordErrors: () => {},
  onUpdatePasswordInput: () => {},
  passwordForm: {},
  toggleLoading: () => {},
  updateWeb3: () => {},
  web3: {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    passwordForm: selectPasswordForm,
  });
const mapDispatchToProps = dispatch => ({
  onLoadKeystoreData: data => dispatch(loadKeystoreData(data)),
  onResetState: () => dispatch(resetState()),
  onStoreWallet: walletInfo => dispatch(storeWallet(walletInfo)),
  onTogglePasswordForm: bool => dispatch(togglePasswordForm(bool)),
  onUpdatePasswordErrors: errors => dispatch(updatePasswordErrors(errors)),
  onUpdatePasswordInput: (name, value) =>
    dispatch(updatePasswordInput(name, value)),
  toggleLoading: bool => dispatch(toggleLoading(bool)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: DOMAIN_KEY, reducer });
// ======================

export default compose(
  withConnect,
  withIntl,
  withGlobal,
  withReducer,
  withRouter,
  withWeb3,
)(WelcomePage);
