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
import { Row, Col, FormFeedback } from 'reactstrap';
// Utilities & Constants
import { withIntl } from '../../../../../components/IntlProvider';
import { MSG } from '../../../../../constants';
import { SEND_TOKEN_FIELDS, PORTFOLIO_COLUMNS } from '../../../constants';
// ===================

// ===== MAIN COMPONENT =====
class ConfirmationContent extends PureComponent {
  render() {
    const {
      errors,
      formValues,
      intl: { formatMessage },
      wallet,
    } = this.props;
    return (
      <div className='box-confirmation'>
        {errors.length > 0 && (
          <Row>
            <Col className='text-center'>
              {errors.map((err, errIdx) => (
                <div
                  key={`error_${errIdx + 1}`}
                  className='text-danger'
                >{`* ${err}`}</div>
              ))}
            </Col>
          </Row>
        )}
        <Row>
          <Col xs={4}>
            {formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_AMOUNT_LABEL)}
          </Col>
          <Col xs={8} className=''>
            {`${_get(formValues, [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT])} ${_get(
              formValues,
              [SEND_TOKEN_FIELDS.TOKEN, PORTFOLIO_COLUMNS.SYMBOL],
              '',
            )}`}
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            {formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_FROM_LABEL)}
          </Col>
          <Col xs={8}>
            <div className='text-truncate' title={_get(wallet, 'address', '')}>
              {_get(wallet, 'address', '')}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            {formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_TO_LABEL)}
          </Col>
          <Col xs={8}>
            <div className='text-truncate' title={_get(wallet, 'address', '')}>
              {_get(formValues, [SEND_TOKEN_FIELDS.RECIPIENT], '')}
            </div>
          </Col>
        </Row>
        {/* <Row>
          <Col xs={4}>
            {formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_MESSAGE_LABEL)}
          </Col>
          <Col xs={8}>{_get(formValues, [SEND_TOKEN_FIELDS.MESSAGE], '')}</Col>
        </Row> */}
        <Row>
          <Col xs={4}>
            {formatMessage(
              MSG.MY_WALLET_POPUP_SEND_TOKEN_INFO_TRANSACTION_FEE_LABEL,
            )}
          </Col>
          <Col xs={8}>
            {`${_get(
              formValues,
              [SEND_TOKEN_FIELDS.TOKEN, PORTFOLIO_COLUMNS.TRANSACTION_FEE],
              0,
            )} TOMO`}
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
  errors: PropTypes.arrayOf(PropTypes.string),
  /** Send token form's input values */
  formValues: PropTypes.object,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Wallet's information */
  wallet: PropTypes.object,
};

ConfirmationContent.defaultProps = {
  errors: [],
  formValues: {},
  intl: {},
  wallet: {},
};
// ======================

export default compose(withIntl)(ConfirmationContent);
