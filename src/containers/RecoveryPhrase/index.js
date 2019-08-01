/**
 *
 * Create New Wallet Page
 *
 */
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { isEqual as _isEqual, get as _get } from 'lodash';
import { Container, Row, Col } from 'reactstrap';
// Custom Components
import Warning from './components/Warning';
import PhraseGenerator from './components/PhraseGenerator';
import ConfirmationPopup from './components/ConfirmationPopup';
import VerificationPopup from './components/VerificationPopup';
import SuccessPopup from './components/SuccessPopup';
import { BackgroundStyler } from './style';
// Utilites, Constants & Styles
import reducer from './reducer';
import {
  generateMnemonic,
  addMnemonicWord,
  removeMnemonicWord,
  verifyMnemonic,
  updateFormState,
  resetState,
  toggleConfirmationPopup,
  toggleVerificationPopup,
  toggleSuccessPopup,
  resetVerificationForm,
  updateErrors,
} from './actions';
import {
  selectMnemonicState,
  selectPopupState,
  selectFormState,
} from './selectors';
import { injectReducer, shuffleArray } from '../../utils';
import { withWeb3 } from '../../components/Web3';
import { DOMAIN_KEY, FORM_STATES } from './constants';
import { ROUTE, RPC_SERVER } from '../../constants';

import HDWalletProvider from 'truffle-hdwallet-provider';

// ===== MAIN COMPONENT =====
class RecoveryPhrase extends PureComponent {
  constructor(props) {
    super(props);

    this.bip39 = require('bip39');

    this.handleGenerateMnemonic = this.handleGenerateMnemonic.bind(this);
    this.handleVerifyMnemonic = this.handleVerifyMnemonic.bind(this);
    this.handleUpdateFormState = this.handleUpdateFormState.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleAccessNewWallet = this.handleAccessNewWallet.bind(this);
  }

  componentWillUnmount() {
    const { onResetState } = this.props;
    onResetState();
  }

  handleGenerateMnemonic() {
    const { onGenerateMnemonic } = this.props;
    const newMnemonic = this.bip39
      .generateMnemonic()
      .trim()
      .split(/\s+/g);
    onGenerateMnemonic(shuffleArray(newMnemonic));
  }

  handleVerifyMnemonic() {
    const { mnemonic, onVerifyMnemonic, onUpdateErrors } = this.props;
    // if (_isEqual(_get(mnemonic, 'origin'), _get(mnemonic, 'compare'))) {
    //   onVerifyMnemonic(true);
    // } else {
    //   onUpdateErrors([
    //     'Verification failed. Please choose a different order of words.',
    //   ]);
    // }
    onVerifyMnemonic(true);
  }

  handleUpdateFormState(newState) {
    const { onUpdateFormState } = this.props;
    onUpdateFormState(newState);
  }

  handleRedirect(newRoute) {
    const { history } = this.props;
    history.push(newRoute);
  }

  handleAccessNewWallet() {
    const { mnemonic, web3 } = this.props;

    const provider = new HDWalletProvider(
      _get(mnemonic, 'origin', []).join(' '),
      RPC_SERVER.GANACHE.host,
      0,
      1,
      true,
      RPC_SERVER.GANACHE.hdPath,
    );
    web3.setProvider(provider);
  }

  render() {
    const {
      mnemonic,
      popupFlag,
      formState,
      onToggleConfirmationPopup,
      onToggleVerificationPopup,
      onAddMnemonicWord,
      onRemoveMnemonicWord,
      onResetVerificationForm,
    } = this.props;

    return (
      <BackgroundStyler>
        <Container fluid>
          <Row className='mb-3'>
            <Col xs={12} sm={12} md={12} lg={12} className='text-center'>
              <h1>Create New Wallet</h1>
            </Col>
          </Row>
          <Row className='my-3'>
            <Col xs={12} sm={12} md={12} lg={12} className='text-center'>
              <div className='import-wallet'>
                {`Already have a wallet? `}
                <div
                  role='presentation'
                  onClick={() => this.handleRedirect(ROUTE.IMPORT_WALLET)}
                  className='d-inline-block import-wallet__link'
                >
                  Import your wallet
                </div>
              </div>
            </Col>
          </Row>
          <Row className='my-4'>
            <Col
              xs={12}
              sm={12}
              md={{ size: 6, offset: 3 }}
              lg={{ size: 4, offset: 4 }}
              className='text-center'
            >
              {(_isEqual(formState, FORM_STATES.WARNING) && (
                <Warning updateFormState={this.handleUpdateFormState} />
              )) ||
                (_isEqual(formState, FORM_STATES.PHRASE) && (
                  <PhraseGenerator
                    mnemonic={mnemonic}
                    generateMnemonic={this.handleGenerateMnemonic}
                    toggleConfirmationPopup={onToggleConfirmationPopup}
                    updateFormState={this.handleUpdateFormState}
                  />
                ))}
            </Col>
          </Row>
        </Container>
        <ConfirmationPopup
          isOpen={_get(popupFlag, 'confirmation', false)}
          handleExecution={() => {
            onToggleConfirmationPopup(false);
            onToggleVerificationPopup(true);
          }}
          hidePopup={() => onToggleConfirmationPopup(false)}
        />
        <VerificationPopup
          isOpen={_get(popupFlag, 'verification', false)}
          hidePopup={() => onToggleVerificationPopup(false)}
          handleExecution={() => {}}
          mnemonic={mnemonic}
          addWord={onAddMnemonicWord}
          removeWord={onRemoveMnemonicWord}
          verifyMnemonic={this.handleVerifyMnemonic}
          resetVerificationForm={onResetVerificationForm}
        />
        <SuccessPopup
          isOpen={_get(popupFlag, 'success', false)}
          handleExecution={this.handleAccessNewWallet}
        />
      </BackgroundStyler>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
RecoveryPhrase.propTypes = {
  mnemonic: PropTypes.object,
  formState: PropTypes.number,
  onGenerateMnemonic: PropTypes.func,
  onAddMnemonicWord: PropTypes.func,
  onRemoveMnemonicWord: PropTypes.func,
  onVerifyMnemonic: PropTypes.func,
  onUpdateFormState: PropTypes.func,
  onToggleConfirmationPopup: PropTypes.func,
  onToggleVerificationPopup: PropTypes.func,
  onResetState: PropTypes.func,
  onResetVerificationForm: PropTypes.func,
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    mnemonic: selectMnemonicState,
    popupFlag: selectPopupState,
    formState: selectFormState,
  });

const mapDispatchToProps = dispatch => ({
  onGenerateMnemonic: mnemonic => dispatch(generateMnemonic(mnemonic)),
  onAddMnemonicWord: word => dispatch(addMnemonicWord(word)),
  onRemoveMnemonicWord: index => dispatch(removeMnemonicWord(index)),
  onVerifyMnemonic: () => dispatch(verifyMnemonic()),
  onUpdateFormState: newState => dispatch(updateFormState(newState)),
  onToggleConfirmationPopup: bool => dispatch(toggleConfirmationPopup(bool)),
  onToggleVerificationPopup: bool => dispatch(toggleVerificationPopup(bool)),
  onToggleSuccessPopup: bool => dispatch(toggleSuccessPopup(bool)),
  onResetState: () => dispatch(resetState()),
  onResetVerificationForm: () => dispatch(resetVerificationForm()),
  onUpdateErrors: errors => dispatch(updateErrors(errors)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: DOMAIN_KEY, reducer });
// ======================

export default compose(
  withConnect,
  withReducer,
  withWeb3,
)(RecoveryPhrase);
