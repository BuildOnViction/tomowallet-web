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
import { get as _get } from 'lodash';
import PropTypes from 'prop-types';
import { Container, Row, Col, CardBody, CardImg, CardTitle } from 'reactstrap';
import HDWalletProvider from 'truffle-hdwallet-provider';
// Custom Components
import { BackgroundStyler, ImportTypeCardStyler } from './style';
import LedgerForm from './components/LedgerForm';
import RPOrPKForm from './components/RPOrPKForm';
// Constants & Styles
import { IMPORT_TYPES, DOMAIN_KEY } from './constants';
import { selectImportState } from './selectors';
import {
  resetState,
  toggleLock,
  updateErrors,
  updateImportType,
  updateInput,
} from './actions';
import reducer from './reducer';
import { ROUTE, RPC_SERVER } from '../../constants';
import tomoIcon from '../../assets/images/tomo-icon.png';
import { injectReducer } from '../../utils';
import { withWeb3 } from '../../components/Web3';

// ===== MAIN COMPONENT =====
class ImportWallet extends PureComponent {
  constructor(props) {
    super(props);

    this.bip39 = require('bip39');

    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleToggleLock = this.handleToggleLock.bind(this);
    this.handleAccessWallet = this.handleAccessWallet.bind(this);
  }

  componentWillUnmount() {
    const { onResetState } = this.props;
    onResetState();
  }

  handleRedirect(newRoute) {
    const { history } = this.props;
    history.push(newRoute);
  }

  handleChangeType(newType) {
    const { onUpdateImportType } = this.props;
    onUpdateImportType(newType);
  }

  handleToggleLock() {
    const { importWallet, onToggleLock } = this.props;
    onToggleLock(!_get(importWallet, 'isLocked'));
  }

  handleAccessWallet() {
    const { web3, importWallet } = this.props;

    console.warn('create wallet', _get(importWallet, 'input.textValue', ''));

    const provider = new HDWalletProvider(
      _get(importWallet, 'input.textValue', ''),
      RPC_SERVER.TOMOCHAIN_TESTNET.host,
      0,
      1,
      true,
      RPC_SERVER.TOMOCHAIN_TESTNET.hdPath,
    );
    web3.setProvider(provider);
    console.warn('Import wallet', web3);
  }

  render() {
    const { importWallet, onUpdateInput } = this.props;
    return (
      <BackgroundStyler>
        <Container fluid>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} className='text-center'>
              <h1>Import your wallet</h1>
            </Col>
          </Row>
          <Row className='mt-2 mb-5'>
            <Col xs={12} sm={12} md={12} lg={12} className='text-center'>
              <div className='create-wallet__text'>
                {`Do not have a wallet? `}
                <div
                  role='presentation'
                  onClick={() => this.handleRedirect(ROUTE.RECOVERY_PHRASE)}
                  className='d-inline-block create-wallet__link'
                >
                  Create a new wallet
                </div>
              </div>
            </Col>
          </Row>
          <Row className='mt-4 mb-5'>
            <Col
              xs={12}
              sm={12}
              md={{ size: 6, offset: 3 }}
              lg={{ size: 4, offset: 4 }}
              className='text-center'
            >
              <Container fluid className='p-0 import-type'>
                <Row noGutters>
                  <Col className='pr-4'>
                    <ImportTypeCardStyler
                      isActive={
                        _get(importWallet, 'type') === IMPORT_TYPES.LEDGER
                      }
                      onClick={() => this.handleChangeType(IMPORT_TYPES.LEDGER)}
                    >
                      <div className='full-width mt-4'>
                        <CardImg alt='Ledger Wallet' src={tomoIcon} />
                      </div>
                      <CardBody>
                        <CardTitle>Ledger Wallet</CardTitle>
                      </CardBody>
                    </ImportTypeCardStyler>
                  </Col>
                  <Col className='pl-4'>
                    <ImportTypeCardStyler
                      isActive={
                        _get(importWallet, 'type') === IMPORT_TYPES.RP_OR_PK
                      }
                      onClick={() =>
                        this.handleChangeType(IMPORT_TYPES.RP_OR_PK)
                      }
                    >
                      <div className='full-width mt-4'>
                        <CardImg
                          alt='Recovery Phrase / Private Key'
                          src={tomoIcon}
                        />
                      </div>
                      <CardBody>
                        <CardTitle>
                          {'Recovery Phrase/'}
                          <br />
                          {'Private Key'}
                        </CardTitle>
                      </CardBody>
                    </ImportTypeCardStyler>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
          <Row>
            <Col
              xs={12}
              sm={12}
              md={{ size: 6, offset: 3 }}
              lg={{ size: 4, offset: 4 }}
              className='text-center'
            >
              {_get(importWallet, 'type') === IMPORT_TYPES.LEDGER && (
                <LedgerForm />
              )}
              {_get(importWallet, 'type') === IMPORT_TYPES.RP_OR_PK && (
                <RPOrPKForm
                  isLocked={_get(importWallet, 'isLocked')}
                  toggleLock={this.handleToggleLock}
                  updateInput={onUpdateInput}
                  accessWallet={this.handleAccessWallet}
                  formValues={_get(importWallet, 'input', {})}
                />
              )}
            </Col>
          </Row>
        </Container>
      </BackgroundStyler>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
ImportWallet.propTypes = {
  history: PropTypes.object,
  importWallet: PropTypes.object,
  onToggleLock: PropTypes.func,
  onUpdateErrors: PropTypes.func,
  onUpdateImportType: PropTypes.func,
  onUpdateInput: PropTypes.func,
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    importWallet: selectImportState,
  });
const mapDispatchToProps = dispatch => ({
  onResetState: () => dispatch(resetState()),
  onToggleLock: bool => dispatch(toggleLock(bool)),
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
)(ImportWallet);
