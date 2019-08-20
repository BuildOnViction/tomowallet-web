/**
 *
 * TomoWallet - Import Wallet Page - Ledger Address Popup - Content
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { get as _get } from 'lodash';
import { Input, Container, Row, Col } from 'reactstrap';
// ===================

// ===== MAIN COMPONENT =====
class AddressContent extends PureComponent {
  render() {
    const { data, updateChosenAddress } = this.props;
    return (
      <Container fluid>
        {_get(data, 'wallets', []).map((wallet, walletIdx) => (
          <Row>
            <Col xs={1}>
              <Input
                type='radio'
                name='wallet'
                checked={_get(data, 'chosenIndex') === walletIdx}
                onChange={() => updateChosenAddress(walletIdx)}
              />
            </Col>
            <Col xs={6} lg={7} className='pl-2'>
              {wallet.address}
            </Col>
            <Col xs={5} lg={4} className='text-right'>
              {`${wallet.balance.toLocaleString(undefined, {
                minimumFractionDigits: 3,
              })} TOMO`}
            </Col>
          </Row>
        ))}
      </Container>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
AddressContent.propTypes = {
  /** Popup's data */
  data: PropTypes.object,
  /** Action to update chosen wallet address */
  updateChosenAddress: PropTypes.func,
};

AddressContent.defaultProps = {
  data: {},
  updateChosenAddress: () => {},
};
// ======================

export default AddressContent;
