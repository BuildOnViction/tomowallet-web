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
import { get as _get } from 'lodash';
import { Row, Col } from 'reactstrap';
import QRCode from 'qrcode.react';
// Custom Components
import { BigButtonStyler, HeadingSmall } from '../../../../styles';
// Utilities & Constants
import { withWeb3 } from '../../../../components/Web3';
import { withIntl } from '../../../../components/IntlProvider';
import { MSG } from '../../../../constants';
import { TextBlue } from '../../../../styles';
// -- TO-DO: Add style for Address Information section
// ===================

// ===== MAIN COMPONENT =====
class AddressInfo extends PureComponent {
  render() {
    const {
      intl: { formatMessage },
      openReceiveTokenPopup,
      openSendTokenPopup,
      wallet,
    } = this.props;
    return (
      <div>
        <HeadingSmall>
          {formatMessage(MSG.MY_WALLET_SECTION_ADDRESS_TITLE)}
        </HeadingSmall>
        <div className='box-address'>
          <Row className='align-items-center'>
            <Col md={6} className='pr-5'>
              <TextBlue>{_get(wallet, 'address', '')}</TextBlue>
              <Row className='mt-4'>
                <Col md={6} className='pr-2'>
                  <BigButtonStyler onClick={openSendTokenPopup}>
                    {formatMessage(MSG.COMMON_BUTTON_SEND)}
                  </BigButtonStyler>
                </Col>
                <Col md={6} className='pl-2'>
                  <BigButtonStyler btnBlue onClick={openReceiveTokenPopup}>
                    {formatMessage(MSG.COMMON_BUTTON_RECEIVE)}
                  </BigButtonStyler>
                </Col>
              </Row>
            </Col>
            <Col md={6} className='d-flex'>
              <QRCode value={_get(wallet, 'address', '')} />
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
