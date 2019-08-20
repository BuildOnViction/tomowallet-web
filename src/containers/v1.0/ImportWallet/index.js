/**
 *
 * Import Wallet Page
 *
 */
// Modules
import React, { PureComponent } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { get as _get, isEmpty as _isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import TransportU2F from '@ledgerhq/hw-transport-u2f';
import Eth from '@ledgerhq/hw-app-eth';
import * as HDKey from 'hdkey';
import * as ethUtils from 'ethereumjs-util';
import {
  CardBody,
  Row,
  Col,
  CardHeader,
  CardImg,
  CardText,
  CardFooter,
} from 'reactstrap';
// Custom Components
import {
  ContainerMin,
  ButtonStyler,
  HeadingLarge,
  TextBlue,
  ImporWalletStyler,
  BoxCardStyled,
} from '../../../styles';
import LedgerForm from './subcomponents/LedgerForm';
import RPOrPKForm from './subcomponents/RPOrPKForm';
import AddressPopup from './subcomponents/AddressPopup';
// Utilities, Constants & Styles
import { IMPORT_TYPES, DOMAIN_KEY } from './constants';
import { selectImportState, selectAddressPopup } from './selectors';
import {
  resetState,
  updateErrors,
  updateImportType,
  updateInput,
  loadWalletAddresses,
  toggleAddressPopup,
  updateChosenWallet,
} from './actions';
import reducer from './reducer';
import { ROUTE, MSG } from '../../../constants';
import {
  injectReducer,
  generateWeb3,
  getWalletInfo,
  setWeb3Info,
  withLoading,
  getValidations,
  setLedger,
} from '../../../utils';
import { withWeb3 } from '../../../components/Web3';
import { withIntl } from '../../../components/IntlProvider';
import { storeWallet } from '../../Global/actions';
import LogoLedger from '../../../assets/images/logo-ledger.png';
import LogoKey from '../../../assets/images/logo-key.png';

// ===== MAIN COMPONENT =====
class ImportWallet extends PureComponent {
  constructor(props) {
    super(props);

    this.LEDGER_WALLET_LIMIT = 5;

    this.handleAccessByLedger = this.handleAccessByLedger.bind(this);
    this.handleAccessByRecoveryPhrase = this.handleAccessByRecoveryPhrase.bind(
      this,
    );
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleCreateHWAddress = this.handleCreateHWAddress.bind(this);
    this.handleLoadLedgerWallets = this.handleLoadLedgerWallets.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleSelectHDPath = this.handleSelectHDPath.bind(this);
    this.handleUnlockLedger = this.handleUnlockLedger.bind(this);
    this.handleUpdateError = this.handleUpdateError.bind(this);
  }

  componentWillUnmount() {
    const { onResetState } = this.props;
    onResetState();
  }

  handleAccessByLedger() {
    const { addressPopup, onStoreWallet } = this.props;
    const chosenWallet = _get(addressPopup, [
      'wallets',
      _get(addressPopup, 'chosenIndex'),
    ]);

    if (chosenWallet) {
      setLedger(chosenWallet);
      onStoreWallet(chosenWallet);
    }
  }

  handleAccessByRecoveryPhrase() {
    const {
      history,
      importWallet,
      intl: { formatMessage },
      onStoreWallet,
      onUpdateErrors,
      rpcServer,
      toggleLoading,
      updateWeb3,
      web3,
    } = this.props;
    if (_get(importWallet, 'type') === IMPORT_TYPES.LEDGER) {
      this.handleSelectHDPath();
    } else if (_get(importWallet, 'type') === IMPORT_TYPES.RP_OR_PK) {
      const recoveryPhrase = _get(importWallet, 'input.recoveryPhrase', '');

      if (
        recoveryPhrase &&
        (web3.utils.isHex(recoveryPhrase) ||
          recoveryPhrase.split(' ').length === 12)
      ) {
        try {
          toggleLoading(true);
          const newWeb3 = generateWeb3(recoveryPhrase, rpcServer);
          getWalletInfo(newWeb3)
            .then(walletInfo => {
              onStoreWallet(walletInfo);
              updateWeb3(newWeb3);
              setWeb3Info({ recoveryPhrase, rpcServer });
            })
            .then(() => {
              toggleLoading(false);
              history.push(ROUTE.MY_WALLET);
            });
        } catch {
          toggleLoading(false);
          onUpdateErrors([
            formatMessage(MSG.IMPORT_WALLET_ERROR_INVALID_RECOVERY_PHRASE),
          ]);
        }
      } else {
        toggleLoading(false);
        onUpdateErrors([
          formatMessage(MSG.IMPORT_WALLET_ERROR_INVALID_RECOVERY_PHRASE),
        ]);
      }
    }
  }

  handleChangeType(newType) {
    const { onUpdateImportType } = this.props;
    onUpdateImportType(newType);
  }

  handleCreateHWAddress(payload, index) {
    const { web3 } = this.props;
    const { publicKey, chainCode } = payload;
    try {
      // Get wallet address from ledger payload & index
      const hdKey = new HDKey();
      hdKey.publicKey = Buffer.from(publicKey, 'hex');
      hdKey.chainCode = Buffer.from(chainCode, 'hex');
      const derivedKey = hdKey.derive('m/' + index);
      const convertedPubKey = ethUtils.bufferToHex(derivedKey.publicKey);
      const addressBuff = ethUtils.publicToAddress(convertedPubKey, true);
      const walletAddress = ethUtils.bufferToHex(addressBuff);

      // Return full wallet object
      return web3.eth.getBalance(walletAddress).then(balance => ({
        address: walletAddress,
        balance: Number(web3.utils.fromWei(balance)),
      }));
    } catch (error) {
      this.handleUpdateError(error.message);
    }
  }

  handleLoadLedgerWallets(payload, offset) {
    const { onLoadWalletAddresses, toggleLoading } = this.props;
    const walletPromises = [];

    for (let i = offset; i < offset + this.LEDGER_WALLET_LIMIT; i++) {
      walletPromises.push(this.handleCreateHWAddress(payload, i));
    }
    Promise.all(walletPromises)
      .then(wallets => {
        toggleLoading(false);
        onLoadWalletAddresses(wallets);
      })
      .catch(error => {
        this.handleUpdateError(error.message);
      });
  }

  handleRedirect(newRoute) {
    const { history } = this.props;
    history.push(newRoute);
  }

  handleSelectHDPath() {
    const { onUpdateErrors, toggleLoading } = this.props;
    const errorList = this.handleValidateHDPath();

    if (!_isEmpty(errorList)) {
      onUpdateErrors(Object.values(errorList));
    } else {
      toggleLoading(true);
      onUpdateErrors([]);
      this.handleUnlockLedger().then(payload =>
        this.handleLoadLedgerWallets(payload, 0),
      );
    }
  }

  handleValidateHDPath() {
    const { importWallet, web3 } = this.props;
    const { isRequired } = getValidations(web3);

    return {
      ...isRequired({
        name: 'hdPath',
        value: _get(importWallet, 'input.hdPath'),
      }),
    };
  }

  handleUnlockLedger() {
    const { importWallet } = this.props;
    const hdPath = _get(importWallet, 'input.hdPath', '');

    return TransportU2F.isSupported()
      .then(u2fSupported => {
        if (!u2fSupported) {
          throw new Error(
            'U2F not supported in this browser. Please try using Google Chrome with a secure (SSL / HTTPS) connection!',
          );
        }
        return TransportU2F.create()
          .then(transport => new Eth(transport).getAddress(hdPath, false, true))
          .catch(error => {
            this.handleUpdateError(error.message);
          });
      })
      .catch(error => {
        this.handleUpdateError(error.message);
      });
  }

  handleUpdateError(errorMsg) {
    const { onUpdateErrors, toggleLoading } = this.props;
    toggleLoading(false);
    onUpdateErrors([errorMsg]);
  }

  render() {
    const {
      addressPopup,
      importWallet,
      intl: { formatMessage },
      onToggleAddressPopup,
      onUpdateChosenWallet,
      onUpdateInput,
    } = this.props;

    return (
      <ContainerMin>
        <BoxCardStyled>
          <CardHeader>
            <HeadingLarge>
              {formatMessage(MSG.IMPORT_WALLET_HEADER_TITLE)}
            </HeadingLarge>
            <CardText>
              {`${formatMessage(MSG.IMPORT_WALLET_ALTERNATIVE_TEXT)} `}
              <TextBlue
                role='presentation'
                onClick={() => this.handleRedirect(ROUTE.CREATE_WALLET)}
              >
                {formatMessage(MSG.IMPORT_WALLET_ALTERNATIVE_LINK)}
              </TextBlue>
            </CardText>
          </CardHeader>
          <CardBody>
            <Row noGutters>
              <Col className='pr-5'>
                <ImporWalletStyler
                  isActive={_get(importWallet, 'type') === IMPORT_TYPES.LEDGER}
                  onClick={() => this.handleChangeType(IMPORT_TYPES.LEDGER)}
                >
                  <CardImg
                    src={LogoLedger}
                    alt={formatMessage(MSG.IMPORT_WALLET_TAB_LEDGER_IMAGE_ALT)}
                  />
                  <CardText className='mt-3'>
                    {formatMessage(MSG.IMPORT_WALLET_TAB_LEDGER_TEXT)}
                  </CardText>
                </ImporWalletStyler>
              </Col>
              <Col className='pl-5'>
                <ImporWalletStyler
                  isActive={
                    _get(importWallet, 'type') === IMPORT_TYPES.RP_OR_PK
                  }
                  onClick={() => this.handleChangeType(IMPORT_TYPES.RP_OR_PK)}
                >
                  <CardImg
                    src={LogoKey}
                    alt={formatMessage(
                      MSG.IMPORT_WALLET_TAB_RECOVERY_PHRASE_TEXT,
                    )}
                  />
                  <CardText className='mt-3'>
                    {formatMessage(MSG.IMPORT_WALLET_TAB_RECOVERY_PHRASE_TEXT)}
                  </CardText>
                </ImporWalletStyler>
              </Col>
            </Row>
            <Row noGutters className='mt-4'>
              <Col>
                {_get(importWallet, 'type') === IMPORT_TYPES.LEDGER && (
                  <LedgerForm
                    errors={_get(importWallet, 'errors', [])}
                    formValues={_get(importWallet, 'input', {})}
                    updateInput={onUpdateInput}
                  />
                )}
                {_get(importWallet, 'type') === IMPORT_TYPES.RP_OR_PK && (
                  <RPOrPKForm
                    errors={_get(importWallet, 'errors', [])}
                    formValues={_get(importWallet, 'input', {})}
                    updateInput={onUpdateInput}
                  />
                )}
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <Row>
              <Col size={6}>
                <ButtonStyler onClick={() => this.handleRedirect(ROUTE.LOGIN)}>
                  {formatMessage(MSG.COMMON_BUTTON_BACK)}
                </ButtonStyler>
              </Col>
              <Col size={6}>
                <ButtonStyler
                  btnYellow
                  onClick={this.handleAccessByRecoveryPhrase}
                >
                  {formatMessage(MSG.COMMON_BUTTON_IMPORT)}
                </ButtonStyler>
              </Col>
            </Row>
          </CardFooter>
        </BoxCardStyled>
        <AddressPopup
          accessByLedger={this.handleAccessByLedger}
          data={addressPopup}
          togglePopup={onToggleAddressPopup}
          updateChosenAddress={onUpdateChosenWallet}
        />
      </ContainerMin>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
ImportWallet.propTypes = {
  /** Ledger address popup's data */
  addressPopup: PropTypes.object,
  /** React Router's API object */
  history: PropTypes.object,
  /** Wallet import's data set */
  importWallet: PropTypes.object,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to save wallet information in global store */
  onStoreWallet: PropTypes.func,
  /** Action to show/hide ledger address popup */
  onToggleAddressPopup: PropTypes.func,
  /** Action to update chosen wallet address */
  onUpdateChosenWallet: PropTypes.func,
  /** Action to set error messages */
  onUpdateErrors: PropTypes.func,
  /** Action to change import tab */
  onUpdateImportType: PropTypes.func,
  /** Action to handle input change */
  onUpdateInput: PropTypes.func,
  /** Action to show/hide loading screen */
  toggleLoading: PropTypes.func,
};

ImportWallet.defaultProps = {
  addressPopup: {},
  history: {},
  importWallet: {},
  intl: {},
  onStoreWallet: () => {},
  onToggleAddressPopup: () => {},
  onUpdateChosenWallet: () => {},
  onUpdateErrors: () => {},
  onUpdateImportType: () => {},
  onUpdateInput: () => {},
  toggleLoading: () => {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    addressPopup: selectAddressPopup,
    importWallet: selectImportState,
  });
const mapDispatchToProps = dispatch => ({
  onLoadWalletAddresses: data => dispatch(loadWalletAddresses(data)),
  onResetState: () => dispatch(resetState()),
  onStoreWallet: wallet => dispatch(storeWallet(wallet)),
  onToggleAddressPopup: bool => dispatch(toggleAddressPopup(bool)),
  onUpdateChosenWallet: index => dispatch(updateChosenWallet(index)),
  onUpdateErrors: errors => dispatch(updateErrors(errors)),
  onUpdateImportType: type => dispatch(updateImportType(type)),
  onUpdateInput: (name, value) => dispatch(updateInput(name, value)),
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
  withRouter,
  withWeb3,
  withIntl,
  withLoading,
)(ImportWallet);
