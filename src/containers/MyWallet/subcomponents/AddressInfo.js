/**
 *
 * TomoWallet - My Wallet Page - Address Information
 *
 * This component shows basic information of current account address,
 * including options to send/receive tokens.
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _get from 'lodash.get';
import { Row, Col } from 'reactstrap';
import QRCode from 'qrcode.react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Custom Components
import ExchangeInfo from './ExchangeInfo';
import Ellipsis from '../../../components/Ellipsis';
import { MediumButtonStyler, HeadingSmall } from '../../../styles';
// Utilities & Constants
import { withWeb3 } from '../../../components/Web3';
import { withIntl } from '../../../components/IntlProvider';
import { MSG } from '../../../constants';
import { TextBlue } from '../../../styles';
import { withGlobal } from '../../../utils';
import { createStructuredSelector } from 'reselect';
import { selectPrivacyMode } from '../../Global/selectors';
// ===================

// ===== MAIN COMPONENT =====
class AddressInfo extends PureComponent {
  render() {
    const {
      intl: { formatMessage },
      handleCopyToClipboard,
      openReceiveTokenPopup,
      openSendTokenPopup,
      wallet,
      privacyMode,
    } = this.props;
    const walletAddress = _get(wallet, 'address', '');
    const privacyAddress = _get(wallet, ['privacy', 'privacyAddress', 'pubAddr'], '');

    return (
      <div>
        <div className='box-address'>
          <Row>
            <Col
              xs={12}
              lg={{ size: 5, order: 12 }}
              className='mb-sm-3 mb-lg-0'
            >
              <div className='bg_gray'>
                <ExchangeInfo />
              </div>
            </Col>
            <Col xs={12} lg={{ size: 7, order: 1 }}>
              <div className='d-flex align-items-center bg_gray'>
                <Row className='fullwidth align-items-center'>
                  { !privacyMode ?
                  // Privacy address
                  <Col md={8}>
                    <HeadingSmall>
                      <FontAwesomeIcon icon='wallet' className='mr-2' />
                      {formatMessage(MSG.MY_WALLET_SECTION_PRIVACY_ADDRESS_TITLE)}
                    </HeadingSmall>
                    <TextBlue
                      role='presentation'
                      onClick={() => handleCopyToClipboard(privacyAddress)}
                      className='text-break'
                    >
                      <Ellipsis middle>{privacyAddress}</Ellipsis>
                    </TextBlue>
                    <Row className='mt-4'>
                      <Col md={6} className='pr-2'>
                        <MediumButtonStyler onClick={openSendTokenPopup}>
                          {formatMessage(MSG.COMMON_BUTTON_SEND)}
                          <FontAwesomeIcon icon='share' className='ml-2' />
                        </MediumButtonStyler>
                      </Col>
                      <Col md={6} className='pl-2'>
                        <MediumButtonStyler
                          btnBlue
                          onClick={openReceiveTokenPopup}
                        >
                          <FontAwesomeIcon icon='reply' className='mr-2' />
                          {formatMessage(MSG.COMMON_BUTTON_RECEIVE)}
                        </MediumButtonStyler>
                      </Col>
                    </Row>
                  </Col>
                  // Normal address
                  :
                  <Col md={8}>
                    <HeadingSmall>
                      <FontAwesomeIcon icon='wallet' className='mr-2' />
                      {formatMessage(MSG.MY_WALLET_SECTION_ADDRESS_TITLE)}
                    </HeadingSmall>
                    <TextBlue
                      role='presentation'
                      onClick={() => handleCopyToClipboard(walletAddress)}
                      className='text-break'
                    >
                      <Ellipsis middle>{walletAddress}</Ellipsis>
                    </TextBlue>
                    <Row className='mt-4'>
                      <Col md={6} className='pr-2'>
                        <MediumButtonStyler onClick={openSendTokenPopup}>
                          {formatMessage(MSG.COMMON_BUTTON_SEND)}
                          <FontAwesomeIcon icon='share' className='ml-2' />
                        </MediumButtonStyler>
                      </Col>
                      <Col md={6} className='pl-2'>
                        <MediumButtonStyler
                          btnBlue
                          onClick={openReceiveTokenPopup}
                        >
                          <FontAwesomeIcon icon='reply' className='mr-2' />
                          {formatMessage(MSG.COMMON_BUTTON_RECEIVE)}
                        </MediumButtonStyler>
                      </Col>
                    </Row>
                  </Col>
                  }
                  <Col md={4} className='d-flex justify-content-end'>
                    <div className='qrc_bd'>
                      <QRCode value={privacyMode ? privacyAddress : walletAddress} />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
AddressInfo.propTypes = {
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to show/hide clipboard popup */
  handleCopyToClipboard: PropTypes.func,
  /** Action to show receive token popup */
  openReceiveTokenPopup: PropTypes.func,
  /** Action to show send token popup */
  openSendTokenPopup: PropTypes.func,
  /** Wallet's data */
  wallet: PropTypes.object,
  /** Action to get privacy data */
  onLoadPrivacyData: PropTypes.func
};

AddressInfo.defaultProps = {
  intl: {},
  handleCopyToClipboard: () => {},
  openReceiveTokenPopup: () => {},
  openSendTokenPopup: () => {},
  wallet: {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    privacyMode: selectPrivacyMode
  });
const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
// ======================

export default compose(
  withGlobal,
  withIntl,
  withWeb3,
  withConnect,
)(AddressInfo);
