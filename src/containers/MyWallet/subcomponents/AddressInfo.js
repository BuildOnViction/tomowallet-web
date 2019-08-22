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
import { compose } from 'redux';
import PropTypes from 'prop-types';
import _get from 'lodash.get';
import { Row, Col } from 'reactstrap';
import QRCode from 'qrcode.react';
// Custom Components
import { MediumButtonStyler, HeadingSmall } from '../../../styles';
// Utilities & Constants
import { withWeb3 } from '../../../components/Web3';
import { withIntl } from '../../../components/IntlProvider';
import { MSG } from '../../../constants';
import { TextBlue } from '../../../styles';
// ===================

// ===== MAIN COMPONENT =====
class AddressInfo extends PureComponent {
  componentDidMount() {
    const addScript = document.createElement('script')
    addScript.setAttribute('src', 'https://files.coinmarketcap.com/static/widget/currency.js')
    document.body.appendChild(addScript)
  }
  render() {
    const {
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
                <div
                  className='coinmarketcap-currency-widget'
                  data-currencyid='2570'
                  data-base='USD'
                  data-secondary='BTC'
                  data-ticker='true'
                  data-rank='true'
                  data-marketcap='true'
                  data-volume='true'
                  data-stats='USD'
                  data-statsticker='true'
                />
              </div>
            </Col>
            <Col xs={12} lg={{ size: 7, order: 1 }}>
              <div className='d-flex align-items-center bg_gray'>
                <Row className='fullwidth align-items-center'>
                  <Col md={8}>
                    <HeadingSmall>
                      {formatMessage(MSG.MY_WALLET_SECTION_ADDRESS_TITLE)}
                    </HeadingSmall>
                    <TextBlue>{_get(wallet, 'address', '')}</TextBlue>
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
                    <div className='qrc_bd'><QRCode value={_get(wallet, 'address', '')} /></div>
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
  /** Action to show receive token popup */
  openReceiveTokenPopup: PropTypes.func,
  /** Action to show send token popup */
  openSendTokenPopup: PropTypes.func,
  /** Wallet's data */
  wallet: PropTypes.object,
};

AddressInfo.defaultProps = {
  intl: {},
  openReceiveTokenPopup: () => {},
  openSendTokenPopup: () => {},
  wallet: {},
};
// ======================

export default compose(
  withIntl,
  withWeb3,
)(AddressInfo);
