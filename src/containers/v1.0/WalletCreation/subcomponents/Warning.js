/**
 *
 * TomoWallet - Wallet Creation Page - Warning Component
 *
 * This component shows first warning about the upcoming generated recovery phrase,
 * which user has to store somewhere outside of the computer for security purpose.
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { generateMnemonic } from 'bip39';
import {
  Card,
  CardHeader,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  CardFooter,
  Container,
  Row,
  Col,
} from 'reactstrap';
// Custom Components
// -- TO-DO: Update style for button & error text in the following styled components:
import {
  ButtonStyler,
  WarningImages,
  HeadingLarge,
  HeadingMedium,
  TextBlue,
  NoticeTextRed,
} from '../../../../styles';
// Utilities & Constants
import { withIntl } from '../../../../components/IntlProvider';
import { withWeb3 } from '../../../../components/Web3';
import { mnemonicToPrivateKey } from '../../../../utils';
import { FORM_STATES } from '../constants';
import { MSG, ROUTE } from '../../../../constants';
// -- TO-DO: Add style for Warning page
// IMAGES
import img_warning from '../../../../assets/images/img-warning.png';
// ===================

// ===== MAIN COMPONENT =====
class Warning extends PureComponent {
  constructor(props) {
    super(props);

    this.handleRedirect = this.handleRedirect.bind(this);
    this.handlePrepareMnemonic = this.handlePrepareMnemonic.bind(this);
  }

  handleRedirect(newRoute) {
    const { history } = this.props;
    history.push(newRoute);
  }

  handlePrepareMnemonic() {
    const {
      storeMnemonic,
      rpcServer,
      setPrivateKey,
      setFormState,
    } = this.props;
    new Promise(resolve => {
      const newMnemonic = generateMnemonic();
      storeMnemonic(newMnemonic);
      setPrivateKey(mnemonicToPrivateKey(newMnemonic, rpcServer));
      resolve();
    }).then(() => {
      setFormState(FORM_STATES.RECOVERY_PHRASE);
    });
  }

  render() {
    const {
      intl: { formatMessage },
    } = this.props;
    return (
      <div className='screen-st1'>
        <CardHeader className='text-center'>
          <HeadingLarge>{formatMessage(MSG.WARNING_HEADER_TITLE)}</HeadingLarge>
          <CardText>
            {`${formatMessage(MSG.WARNING_HEADER_ALTERNATIVE_TEXT)} `}
            <TextBlue
              role='presentation'
              onClick={() => this.handleRedirect(ROUTE.IMPORT_WALLET)}
              className='d-inline-block'
            >
              {formatMessage(MSG.WARNING_HEADER_ALTERNATIVE_LINK)}
            </TextBlue>
          </CardText>
        </CardHeader>
        {/* -- TO-DO: Add warning image's source */}
        <WarningImages>
          <CardImg
            src={img_warning}
            alt={formatMessage(MSG.WARNING_IMAGE_ALT)}
          />
        </WarningImages>
        <CardBody>
          <HeadingMedium>{formatMessage(MSG.WARNING_CONTENT_TITLE)}</HeadingMedium>
          <CardText>{formatMessage(MSG.WARNING_CONTENT_DESCRIPTION)}</CardText>
          <CardText>
            <NoticeTextRed>
              {formatMessage(MSG.WARNING_CONTENT_DESCRIPTION_DANGER)}
            </NoticeTextRed>
          </CardText>
        </CardBody>
        <CardFooter className='mt-5'>
          <Row>
            <Col size={6}>
              <ButtonStyler onClick={() => this.handleRedirect(ROUTE.LOGIN)}>
                {formatMessage(MSG.COMMON_BUTTON_BACK)}
              </ButtonStyler>
            </Col>
            <Col size={6}>
              <ButtonStyler btnYellow onClick={this.handlePrepareMnemonic}>
                {formatMessage(MSG.WARNING_BUTTON_NEXT_TO_RECOVERY_PHRASE)}
              </ButtonStyler>
            </Col>
          </Row>
        </CardFooter>
      </div>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
Warning.propTypes = {
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** React Router's API object */
  history: PropTypes.object,
  /** Current RPC server configuration */
  rpcServer: PropTypes.object,
  /** Action to update wallet creation form state */
  setFormState: PropTypes.func,
  /** Action to store private key */
  setPrivateKey: PropTypes.func,
  /** Action to store mnemonic into state */
  storeMnemonic: PropTypes.func,
};
Warning.defaultProps = {
  intl: {},
  history: {},
  rpcServer: {},
  setFormState: () => {},
  setPrivateKey: () => {},
  storeMnemonic: () => {},
};
// ======================

export default compose(
  withIntl,
  withRouter,
  withWeb3,
)(Warning);
