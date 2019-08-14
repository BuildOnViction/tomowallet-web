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
import { get as _get } from 'lodash';
import { Row, Col } from 'reactstrap';
// Custom Components
import {
  BigButtonStyler,
  HeadingSmall,
} from '../../../../styles';
// Utilities & Constants
import { withIntl } from '../../../../components/IntlProvider';
import { MSG } from '../../../../constants';
// -- TO-DO: Add style for Address Information section
// ===================

// ===== MAIN COMPONENT =====
class AddressInfo extends PureComponent {
  render() {
    const {
      intl: { formatMessage },
      openSendTokenPopup,
      wallet,
    } = this.props;
    return (
      <div>
        <HeadingSmall>{formatMessage(MSG.MY_WALLET_SECTION_ADDRESS_TITLE)}</HeadingSmall>
        <div className='box-address'>
          <Row>
            <Col sm={12} md={8} className='pr-5'>
              <div className=''>{_get(wallet, 'address')}</div>
              <div className='my-3'>{`${_get(wallet, 'balance')} TOMO`}</div>
              <Row className='my-3'>
                <Col xs={6} sm={6} md={6} lg={6} className='pr-2'>
                  <BigButtonStyler
                    onClick={() => openSendTokenPopup()}>
                    {formatMessage(MSG.COMMON_BUTTON_SEND)}
                  </BigButtonStyler>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} className='pl-2'>
                  <BigButtonStyler btnBlue>
                    {formatMessage(MSG.COMMON_BUTTON_RECEIVE)}
                  </BigButtonStyler>
                </Col>
              </Row>
            </Col>
            <Col sm={12} md={4}>
              IMG
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
  /** Action to show send token popup */
  openSendTokenPopup: PropTypes.func,
  /** Wallet's data */
  wallet: PropTypes.object,
};

AddressInfo.defaultProps = {
  intl: {},
  openSendTokenPopup: () => {},
  wallet: {},
};
// ======================

export default withIntl(AddressInfo);
