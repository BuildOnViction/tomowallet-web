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
import {
  CardBody,
  Row,
  Col,
  Card,
  CardHeader,
  CardImg,
  CardTitle,
  CardText,
  CardFooter,
} from 'reactstrap';
// Custom Components
import { ImportTypeCardStyler, BoxInner } from './style';
import {
  ContainerMin,
  ButtonStyler,
  HeadingLarge,
  TextBlue,
} from '../../../styles';
import LedgerForm from './subcomponents/LedgerForm';
import RPOrPKForm from './subcomponents/RPOrPKForm';
// Utilities, Constants & Styles
import { IMPORT_TYPES, DOMAIN_KEY } from './constants';
import { selectImportState } from './selectors';
import {
  resetState,
  updateErrors,
  updateImportType,
  updateInput,
} from './actions';
import reducer from './reducer';
import { ROUTE, MSG } from '../../../constants';
import { injectReducer, generateWeb3, getWalletInfo } from '../../../utils';
import { withWeb3 } from '../../../components/Web3';
import { withIntl } from '../../../components/IntlProvider';
import { storeWallet } from '../../Global/actions';
// -- TO-DO: Add style for Import Wallet page

// IMAGES
import LogoLedger from '../../../assets/images/logo-ledger.png';
import LogoKey from '../../../assets/images/logo-key.png';

// ===== MAIN COMPONENT =====
class ImportWallet extends PureComponent {
  constructor(props) {
    super(props);

    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
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

  handleAccessWallet() {
    const {
      history,
      importWallet,
      intl: { formatMessage },
      onStoreWallet,
      onUpdateErrors,
      rpcServer,
      updateWeb3,
      web3,
    } = this.props;
    if (_get(importWallet, 'type') === IMPORT_TYPES.LEDGER) {
      const hdPath = _get(importWallet, 'input.hdPath', '');
      if (!hdPath) {
        onUpdateErrors([
          formatMessage(MSG.IMPORT_WALLET_ERROR_INVALID_HD_PATH),
        ]);
      }
    } else if (_get(importWallet, 'type') === IMPORT_TYPES.RP_OR_PK) {
      const recoveryPhrase = _get(importWallet, 'input.recoveryPhrase', '');

      if (
        recoveryPhrase &&
        (web3.utils.isHex(recoveryPhrase) ||
          recoveryPhrase.split(' ').length === 12)
      ) {
        const newWeb3 = generateWeb3(recoveryPhrase, rpcServer);
        getWalletInfo(newWeb3).then(walletInfo => {
          onStoreWallet(walletInfo);
          updateWeb3(newWeb3);
          history.push(ROUTE.MY_WALLET);
        });
      } else {
        onUpdateErrors([
          formatMessage(MSG.IMPORT_WALLET_ERROR_INVALID_RECOVERY_PHRASE),
        ]);
      }
    }
  }

  render() {
    const {
      importWallet,
      onUpdateInput,
      intl: { formatMessage },
    } = this.props;
    return (
<<<<<<< HEAD
      <ContainerMin>
        <Card>
          <CardHeader>
            <HeadingLarge>{formatMessage(MSG.IMPORT_WALLET_HEADER_TITLE)}</HeadingLarge>
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
              <Col className='pr-4'>
                <ImportTypeCardStyler
                  isActive={
                    _get(importWallet, 'type') === IMPORT_TYPES.LEDGER
                  }
                  onClick={() => this.handleChangeType(IMPORT_TYPES.LEDGER)}
                >
                  <BoxInner>
                    <CardImg
                      src={LogoLedger}
                      alt={formatMessage(
                        MSG.IMPORT_WALLET_TAB_LEDGER_IMAGE_ALT,
                      )}
                    />
                    <CardTitle>
                      {formatMessage(MSG.IMPORT_WALLET_TAB_LEDGER_TEXT)}
                    </CardTitle>
                  </BoxInner>
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
                      src={LogoKey}
                      alt={formatMessage(
                        MSG.IMPORT_WALLET_TAB_RECOVERY_PHRASE_TEXT,
                      )}
                    />
                  </div>
                  <CardTitle>
                    {formatMessage(
                      MSG.IMPORT_WALLET_TAB_RECOVERY_PHRASE_TEXT,
=======
      <Container fluid>
        <Row noGutters>
          <Col
            xs={12}
            sm={12}
            md={{ size: 10, offset: 1 }}
            lg={{ size: 6, offset: 3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>
                  {formatMessage(MSG.IMPORT_WALLET_HEADER_TITLE)}
                </CardTitle>
                <CardText>
                  {`${formatMessage(MSG.IMPORT_WALLET_ALTERNATIVE_TEXT)} `}
                  <span
                    role='presentation'
                    onClick={() => this.handleRedirect(ROUTE.CREATE_WALLET)}
                  >
                    {formatMessage(MSG.IMPORT_WALLET_ALTERNATIVE_LINK)}
                  </span>
                </CardText>
              </CardHeader>
              <Container fluid className='px-0'>
                <Row noGutters>
                  <Col className='pr-4 text-center'>
                    <ImportTypeCardStyler
                      isActive={
                        _get(importWallet, 'type') === IMPORT_TYPES.LEDGER
                      }
                      onClick={() => this.handleChangeType(IMPORT_TYPES.LEDGER)}
                    >
                      <div className='full-width mt-4'>
                        <CardImg
                          src=''
                          alt={formatMessage(
                            MSG.IMPORT_WALLET_TAB_LEDGER_IMAGE_ALT,
                          )}
                        />
                      </div>
                      <CardTitle>
                        {formatMessage(MSG.IMPORT_WALLET_TAB_LEDGER_TEXT)}
                      </CardTitle>
                    </ImportTypeCardStyler>
                  </Col>
                  <Col className='pl-4 text-center'>
                    <ImportTypeCardStyler
                      isActive={
                        _get(importWallet, 'type') === IMPORT_TYPES.RP_OR_PK
                      }
                      onClick={() =>
                        this.handleChangeType(IMPORT_TYPES.RP_OR_PK)
                      }
                    >
                      <CardTitle>
                        {formatMessage(
                          MSG.IMPORT_WALLET_TAB_RECOVERY_PHRASE_TEXT,
                        )}
                      </CardTitle>
                    </ImportTypeCardStyler>
                  </Col>
                </Row>
                <Row noGutters>
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
>>>>>>> eed8f17656288978276e835a18811da21b391746
                    )}
                  </CardTitle>
                </ImportTypeCardStyler>
              </Col>
            </Row>
            <Row noGutters>
              <Col>
                {_get(importWallet, 'type') === IMPORT_TYPES.LEDGER && (
                  <LedgerForm />
                )}
                {_get(importWallet, 'type') === IMPORT_TYPES.RP_OR_PK && (
                  <RPOrPKForm
                    updateInput={onUpdateInput}
                    formValues={_get(importWallet, 'input', {})}
                  />
                )}
              </Col>
            </Row>
          </CardBody>
          <CardFooter className='mt-3'>
            <Row>
              <Col size={6}>
                <ButtonStyler
                  onClick={() => this.handleRedirect(ROUTE.LOGIN)}
                >
                  {formatMessage(MSG.COMMON_BUTTON_BACK)}
                </ButtonStyler>
              </Col>
              <Col size={6}>
                <ButtonStyler btnYellow onClick={this.handleAccessWallet}>
                  {formatMessage(MSG.COMMON_BUTTON_IMPORT)}
                </ButtonStyler>
              </Col>
            </Row>
          </CardFooter>
        </Card>
      </ContainerMin>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
ImportWallet.propTypes = {
  /** React Router's API object */
  history: PropTypes.object,
  /** Wallet import's data set */
  importWallet: PropTypes.object,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to save wallet information in global store */
  onStoreWallet: PropTypes.func,
  /** Action to set error messages */
  onUpdateErrors: PropTypes.func,
  /** Action to change import tab */
  onUpdateImportType: PropTypes.func,
  /** Action to handle input change */
  onUpdateInput: PropTypes.func,
};

ImportWallet.defaultProps = {
  history: {},
  importWallet: {},
  intl: {},
  onStoreWallet: () => {},
  onUpdateErrors: () => {},
  onUpdateImportType: () => {},
  onUpdateInput: () => {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    importWallet: selectImportState,
  });
const mapDispatchToProps = dispatch => ({
  onResetState: () => dispatch(resetState()),
  onStoreWallet: wallet => dispatch(storeWallet(wallet)),
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
)(ImportWallet);
