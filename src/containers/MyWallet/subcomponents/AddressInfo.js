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
// Custom Components
import ExchangeInfo from './ExchangeInfo';
import { MediumButtonStyler, HeadingSmall } from '../../../styles';
// Utilities & Constants
import { withWeb3 } from '../../../components/Web3';
import { withIntl } from '../../../components/IntlProvider';
import { MSG } from '../../../constants';
import { TextBlue } from '../../../styles';
import { toggleClipboardCopyState } from '../../Global/actions';
import { copyToClipboard } from '../../../utils';
// ===================

// ===== MAIN COMPONENT =====
class AddressInfo extends PureComponent {
  constructor(props) {
    super(props);

    this.handleCopyToClipboard = this.handleCopyToClipboard.bind(this);
  }

  handleCopyToClipboard() {
    const { onToggleClipboardPopup, wallet } = this.props;
    copyToClipboard(_get(wallet, 'address', ''));
    onToggleClipboardPopup(true);
  }

  render() {
    const {
      coinData,
      intl: { formatMessage },
      openReceiveTokenPopup,
      openSendTokenPopup,
      wallet,
    } = this.props;
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
                <ExchangeInfo coinData={coinData} />
              </div>
            </Col>
            <Col xs={12} lg={{ size: 7, order: 1 }}>
              <div className='d-flex align-items-center bg_gray'>
                <Row className='fullwidth align-items-center'>
                  <Col md={8}>
                    <HeadingSmall>
                      {formatMessage(MSG.MY_WALLET_SECTION_ADDRESS_TITLE)}
                    </HeadingSmall>
                    <TextBlue
                      role='presentation'
                      onClick={this.handleCopyToClipboard}
                      className='text-break'
                    >
                      {_get(wallet, 'address', '')}
                    </TextBlue>
                    <Row className='mt-4'>
                      <Col md={6} className='pr-2'>
                        <MediumButtonStyler onClick={openSendTokenPopup}>
                          {formatMessage(MSG.COMMON_BUTTON_SEND)}
                        </MediumButtonStyler>
                      </Col>
                      <Col md={6} className='pl-2'>
                        <MediumButtonStyler
                          btnBlue
                          onClick={openReceiveTokenPopup}
                        >
                          {formatMessage(MSG.COMMON_BUTTON_RECEIVE)}
                        </MediumButtonStyler>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={4} className='d-flex justify-content-end'>
                    <div className='qrc_bd'>
                      <QRCode value={_get(wallet, 'address', '')} />
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
  /** TomoChain coin data */
  coinData: PropTypes.object,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to show/hide clipboard popup */
  onToggleClipboardPopup: PropTypes.func,
  /** Action to show receive token popup */
  openReceiveTokenPopup: PropTypes.func,
  /** Action to show send token popup */
  openSendTokenPopup: PropTypes.func,
  /** Wallet's data */
  wallet: PropTypes.object,
};

AddressInfo.defaultProps = {
  coinData: {},
  intl: {},
  onToggleClipboardPopup: () => {},
  openReceiveTokenPopup: () => {},
  openSendTokenPopup: () => {},
  wallet: {},
};
// ======================

// ===== INJECTIONS =====
const mapDispatchToProps = dispatch => ({
  onToggleClipboardPopup: bool => dispatch(toggleClipboardCopyState(bool)),
});
const withConnect = connect(
  null,
  mapDispatchToProps,
);
// ======================

export default compose(
  withIntl,
  withWeb3,
  withConnect,
)(AddressInfo);
