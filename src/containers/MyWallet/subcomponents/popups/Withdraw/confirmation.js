/**
 *
 * TomoWallet - My Wallet Page - Send Token Popup - Confirmation Form
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import _get from 'lodash.get';
import { Row, Col } from 'reactstrap';
// Utilities & Constants
import { withIntl } from '../../../../../components/IntlProvider';
import { removeTrailingZero } from '../../../../../utils';
import { MSG, ENUM } from '../../../../../constants';
import { WITHDRAW_PRIVACY_FIELDS, PORTFOLIO_COLUMNS } from '../../../constants';
// ===================

// ===== MAIN COMPONENT =====
class ConfirmationContent extends PureComponent {
  constructor(props) {
    super(props);

    this.handleGetFeeUnit = this.handleGetFeeUnit.bind(this);
  }

  handleGetFeeUnit() {
    const { formValues } = this.props;
    if (
      _get(formValues, [WITHDRAW_PRIVACY_FIELDS.TRANSACTION_FEE, 'type']) ===
        ENUM.TOKEN_TYPE.TRC20 ||
      _get(formValues, [WITHDRAW_PRIVACY_FIELDS.TRANSACTION_FEE, 'type']) ===
        ENUM.TOKEN_TYPE.CURRENCY
    ) {
      return 'TOMO';
    }
    return _get(formValues, [
      WITHDRAW_PRIVACY_FIELDS.TOKEN,
      PORTFOLIO_COLUMNS.SYMBOL,
    ]);
  }

  render() {
    const {
      errors,
      formValues,
      intl: { formatMessage },
      wallet,
    } = this.props;
    return (
      <div className='box-confirmation'>
        {Object.values(errors).length > 0 && (
          <Row>
            <Col className='text-center'>
              {Object.values(errors).map((err, errIdx) =>
                err.map(subErr => (
                  <div
                    key={`error_${errIdx + 1}`}
                    className='text-danger'
                  >{`* ${subErr}`}</div>
                )),
              )}
            </Col>
          </Row>
        )}
        <Row>
          <Col xs={4}>
            {formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_AMOUNT_LABEL)}
          </Col>
          <Col xs={8} className=''>
            {`${removeTrailingZero(
              _get(formValues, [WITHDRAW_PRIVACY_FIELDS.TRANSFER_AMOUNT]),
            )} ${_get(
              formValues,
              [WITHDRAW_PRIVACY_FIELDS.TOKEN, PORTFOLIO_COLUMNS.SYMBOL],
              '',
            )}`}
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            {formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_TO_LABEL)}
          </Col>
          <Col xs={8}>
            <div className='text-truncate' title={_get(wallet, 'address', '')}>
              {_get(wallet, 'address', '')}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            {formatMessage(
              MSG.MY_WALLET_POPUP_SEND_TOKEN_INFO_TRANSACTION_FEE_LABEL,
            )}
          </Col>
          <Col xs={8}>
            {`${removeTrailingZero(
              _get(formValues, [WITHDRAW_PRIVACY_FIELDS.TRANSACTION_FEE, 'amount']),
            )} ${this.handleGetFeeUnit()}`}
          </Col>
        </Row>
      </div>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
ConfirmationContent.propTypes = {
  /** List of error messages */
  errors: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  /** Send token form's input values */
  formValues: PropTypes.object,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Wallet's information */
  wallet: PropTypes.object,
};

ConfirmationContent.defaultProps = {
  errors: {},
  formValues: {},
  intl: {},
  wallet: {},
};
// ======================

export default compose(withIntl)(ConfirmationContent);
