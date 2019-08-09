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
import { ButtonStyler } from '../../../../styles';
// Utilities & Constants
import { withIntl } from '../../../../components/IntlProvider';
import { MSG } from '../../../../constants';
// ===================

// ===== MAIN COMPONENT =====
class AddressInfo extends PureComponent {
  render() {
    const {
      intl: { formatMessage },
      wallet,
    } = this.props;
    return (
      <div>
        <h3>{formatMessage(MSG.MY_WALLET_SECTION_ADDRESS_TITLE)}</h3>
        <div>{_get(wallet, 'address')}</div>
        <div>{`${_get(wallet, 'balance')} TOMO`}</div>
        <Row noGutters>
          <Col xs={12} sm={12} md={8} lg={6}>
            <Row>
              <Col xs={6} sm={6} md={6} lg={6} className='pr-2'>
                <ButtonStyler>
                  {formatMessage(MSG.COMMON_BUTTON_SEND)}
                </ButtonStyler>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6} className='pl-2'>
                <ButtonStyler>
                  {formatMessage(MSG.COMMON_BUTTON_RECEIVE)}
                </ButtonStyler>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
AddressInfo.propTypes = {
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Wallet's data */
  wallet: PropTypes.object,
};

AddressInfo.defaultProps = {
  intl: {},
  wallet: {},
};
// ======================

export default withIntl(AddressInfo);
