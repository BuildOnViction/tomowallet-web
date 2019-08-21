/**
 *
 * TomoWallet - Import Wallet Page - Ledger Address Popup - Content
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash.get';
import { Row, Col } from 'reactstrap';
import { InputStylerRadio } from './style';
import { TextBlue, BoxText } from '../../../../../styles';
// ===================

// ===== MAIN COMPONENT =====
class AddressContent extends PureComponent {
  render() {
    const { data, updateChosenAddress } = this.props;
    return (
      <BoxText>
        {_get(data, 'wallets', []).map((wallet, walletIdx) => (
          <Row className='py-3'>
            <Col xs={7} lg={8}>
              <label className='pl-5 m-0 position-relative'>
                <InputStylerRadio
                  type='radio'
                  name='wallet'
                  checked={_get(data, 'chosenIndex') === walletIdx}
                  onChange={() => updateChosenAddress(walletIdx)}
                />
                <TextBlue>{wallet.address}</TextBlue>
              </label>
            </Col>
            <Col xs={5} lg={4} className='text-right'>
              {`${wallet.balance.toLocaleString(undefined, {
                minimumFractionDigits: 3,
              })} TOMO`}
            </Col>
          </Row>
        ))}
      </BoxText>
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
