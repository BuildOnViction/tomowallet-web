/**
 *
 * TomoWallet - Wallet Creation Page - Recovery Phrase Generation
 *
 * This component shows user a randomly generated mnemonic phrase, waiting to be noted down offline
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { generateMnemonic } from 'bip39';
import _get from 'lodash.get';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardFooter,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Custom Component
import MnemonicBox from '../../../components/MnemonicBox';
import PasswordPopup from './popups/PasswordPopup';
import {
  ButtonStyler,
  HeadingLarge,
  HeadingMedium,
  TextLinkYellow,
  TextBlue,
} from '../../../styles';
// Utilities & Constants
import { withIntl } from '../../../components/IntlProvider';
import { withWeb3 } from '../../../components/Web3';
import { MSG } from '../../../constants';
import { FORM_STATES } from '../constants';
import { createStructuredSelector } from 'reselect';
import {
  setFormState,
  storeMnemonic,
  toggleConfirmationPopup,
  toggleKeyViewPopup,
  togglePasswordPopup,
} from '../actions';
import { selectMnemonic } from '../selectors';
// ===================

// ===== MAIN COMPONENT =====
class RecoveryPhrase extends PureComponent {
  constructor(props) {
    super(props);

    this.handleConvertMnemonic = this.handleConvertMnemonic.bind(this);
    this.handleReloadNewMnemonic = this.handleReloadNewMnemonic.bind(this);
  }

  handleConvertMnemonic() {
    const { mnemonicState } = this.props;
    return _get(mnemonicState, 'origin', '').split(' ');
  }

  handleReloadNewMnemonic() {
    const { onStoreMnemonic } = this.props;
    onStoreMnemonic(generateMnemonic());
  }

  render() {
    const {
      intl: { formatMessage },
      onSetFormState,
      onTogglePasswordPopup,
      onToggleConfirmationPopup,
      onToggleKeyViewPopup,
      rpcServer,
    } = this.props;
    const convertedMnemonic = this.handleConvertMnemonic();

    return (
      <Fragment>
        <Card>
          <CardHeader>
            <HeadingLarge>
              {formatMessage(MSG.RECOVERY_PHRASE_TITLE)}
            </HeadingLarge>
          </CardHeader>
          <CardBody>
            <HeadingMedium>
              {formatMessage(MSG.RECOVERY_PHRASE_NOTIFICATION_TITLE)}
            </HeadingMedium>
            <CardText>
              {formatMessage(MSG.RECOVERY_PHRASE_NOTIFICATION_DESCRIPTION)}
            </CardText>
            <CardText className='text-right'>
              <TextBlue
                role='presentation'
                onClick={this.handleReloadNewMnemonic}
                className='btn-reload'
                cursor="pointer"
              >
                <FontAwesomeIcon icon='sync-alt' className='mr-2' />
                {formatMessage(MSG.RECOVERY_PHRASE_BUTTON_RELOAD)}
              </TextBlue>
            </CardText>
            <MnemonicBox
              className='mb-4 mt-4 box-border'
              mnemonic={convertedMnemonic}
            />
            <Row noGutters>
              <Col>
                <TextLinkYellow onClick={() => onTogglePasswordPopup(true)}>
                  <FontAwesomeIcon icon={['far', 'save']} className='mr-2' />
                  {formatMessage(MSG.RECOVERY_PHRASE_BUTTON_SAVE)}
                </TextLinkYellow>
              </Col>
              <Col className='text-right'>
                <TextBlue
                  cursor="pointer"
                  role='presentation'
                  onClick={() => onToggleKeyViewPopup(true)}
                >
                  {formatMessage(MSG.RECOVERY_PHRASE_BUTTON_VIEW_PRIVATE_KEY)}
                  <FontAwesomeIcon icon='arrow-right' className='ml-2' />
                </TextBlue>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <Row>
              <Col size={6}>
                <ButtonStyler
                  onClick={() => onSetFormState(FORM_STATES.WARNING)}
                >
                  {formatMessage(MSG.COMMON_BUTTON_BACK)}
                </ButtonStyler>
              </Col>
              <Col size={6}>
                <ButtonStyler
                  btnYellow
                  onClick={() => onToggleConfirmationPopup(true)}
                >
                  {formatMessage(MSG.RECOVERY_PHRASE_BUTTON_CONFIRMATION)}
                </ButtonStyler>
              </Col>
            </Row>
          </CardFooter>
        </Card>
        <PasswordPopup rpcServer={rpcServer} />
      </Fragment>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
RecoveryPhrase.propTypes = {
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Recovery phrase generation's state */
  mnemonicState: PropTypes.object,
  /** Action to update Wallet Creation form state */
  onSetFormState: PropTypes.func,
  /** Action to save generated mnemonic into state */
  onStoreMnemonic: PropTypes.func,
  /** Action to toggle recovery phrase confirmation popup */
  onToggleConfirmationPopup: PropTypes.func,
  /** Action to toggle private key view popup */
  onToggleKeyViewPopup: PropTypes.func,
  /** Action to show/hide password popup */
  onTogglePasswordPopup: PropTypes.func,
  /** Current Web3 provider */
  web3: PropTypes.object,
  /** Current RPC server configuration */
  rpcServer: PropTypes.object,
};

RecoveryPhrase.defaultProps = {
  intl: {},
  mnemonicState: {},
  onSetFormState: () => {},
  onStoreMnemonic: () => {},
  onToggleConfirmationPopup: () => {},
  onToggleKeyViewPopup: () => {},
  onTogglePasswordPopup: () => {},
  web3: {},
  rpcServer: {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    mnemonicState: selectMnemonic,
  });
const mapDispatchToProps = dispatch => ({
  onSetFormState: newState => dispatch(setFormState(newState)),
  onStoreMnemonic: mnemonic => dispatch(storeMnemonic(mnemonic)),
  onToggleConfirmationPopup: bool => dispatch(toggleConfirmationPopup(bool)),
  onToggleKeyViewPopup: bool => dispatch(toggleKeyViewPopup(bool)),
  onTogglePasswordPopup: bool => dispatch(togglePasswordPopup(bool)),
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
)(RecoveryPhrase);
