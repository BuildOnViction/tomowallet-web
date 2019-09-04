/**
 *
 * TomoWallet - Wallet Creation Page - Recovery Phrase Generation
 *
 * This component shows user a randomly generated mnemonic phrase, waiting to be noted down offline
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import moment from 'moment';
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
import {
  downloadFile,
  encryptKeystore,
  mnemonicToPrivateKey,
  decryptKeystore,
} from '../../../utils';
// ===================

// ===== MAIN COMPONENT =====
class RecoveryPhrase extends PureComponent {
  constructor(props) {
    super(props);

    this.handleConvertMnemonic = this.handleConvertMnemonic.bind(this);
    this.handleDownloadRPFile = this.handleDownloadRPFile.bind(this);
  }

  handleConvertMnemonic() {
    const { mnemonic } = this.props;
    return mnemonic.split(' ');
  }

  handleDownloadRPFile() {
    const { mnemonic, rpcServer, web3 } = this.props;
    const privKey = mnemonicToPrivateKey(mnemonic, rpcServer);
    const keystore = encryptKeystore(web3, `0x${privKey}`);
    const timePrefix = moment().format('ZZ--YYYY-MM-DD-HH-mm');
    const address = decryptKeystore(web3, keystore).address;

    downloadFile({
      content: JSON.stringify(keystore),
      name: `${timePrefix}.${address}`,
    });
  }

  render() {
    const {
      intl: { formatMessage },
      setFormState,
      toggleConfirmationPopup,
      toggleKeyViewPopup,
    } = this.props;
    const convertedMnemonic = this.handleConvertMnemonic();

    return (
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
          <MnemonicBox
            className='mb-4 mt-4 box-border'
            mnemonic={convertedMnemonic}
          />
          <Row noGutters>
            <Col>
              <TextLinkYellow onClick={this.handleDownloadRPFile}>
                <FontAwesomeIcon icon={['far', 'save']} className='mr-2' />
                {formatMessage(MSG.RECOVERY_PHRASE_BUTTON_SAVE)}
              </TextLinkYellow>
            </Col>
            <Col className='text-right'>
              <TextBlue
                role='presentation'
                onClick={() => toggleKeyViewPopup(true)}
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
              <ButtonStyler onClick={() => setFormState(FORM_STATES.WARNING)}>
                {formatMessage(MSG.COMMON_BUTTON_BACK)}
              </ButtonStyler>
            </Col>
            <Col size={6}>
              <ButtonStyler
                btnYellow
                onClick={() => toggleConfirmationPopup(true)}
              >
                {formatMessage(MSG.RECOVERY_PHRASE_BUTTON_CONFIRMATION)}
              </ButtonStyler>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
RecoveryPhrase.propTypes = {
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Recovery phrase string (12 words) */
  mnemonic: PropTypes.string,
  /** Action to update Recovery Phrase form state */
  setFormState: PropTypes.func,
  /** Action to toggle recovery phrase confirmation popup */
  toggleConfirmationPopup: PropTypes.func,
  /** Action to toggle private key view popup */
  toggleKeyViewPopup: PropTypes.func,
  /** Current Web3 provider */
  web3: PropTypes.object,
};

RecoveryPhrase.defaultProps = {
  intl: {},
  mnemonic: '',
  setFormState: () => {},
  toggleConfirmationPopup: () => {},
  toggleKeyViewPopup: () => {},
  web3: {},
};
// ======================

export default compose(
  withIntl,
  withWeb3,
)(RecoveryPhrase);
