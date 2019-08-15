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
import { get as _get } from 'lodash';
import { Container, Row, Col, Label } from 'reactstrap';
// Utilities & Constants
import { withIntl } from '../../../../../../components/IntlProvider';
import { MSG } from '../../../../../../constants';
import { SEND_TOKEN_FIELDS, PORFOLIO_COLUMNS } from '../../../constants';
// -- TO-DO: Add style for Confirmation Content of Send Token Popup
// ===================

// ===== MAIN COMPONENT =====
class ConfirmationContent extends PureComponent {
  render() {
    const {
      formValues,
      intl: { formatMessage },
      wallet,
    } = this.props;
    return (
      <Container fluid>
        <Row>
          <Col xs={4} sm={4} md={4} lg={3}>
            <Label>
              {formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_AMOUNT_LABEL)}
            </Label>
          </Col>
          <Col xs={8} sm={8} md={8} lg={9}>
            <div>{`${_get(formValues, [
              SEND_TOKEN_FIELDS.TRANSFER_AMOUNT,
            ])} ${_get(
              formValues,
              [SEND_TOKEN_FIELDS.TOKEN, PORFOLIO_COLUMNS.SYMBOL],
              '',
            )}`}</div>
          </Col>
        </Row>
        <Row>
          <Col xs={4} sm={4} md={4} lg={3}>
            <Label>
              {formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_FROM_LABEL)}
            </Label>
          </Col>
          <Col xs={8} sm={8} md={8} lg={9}>
            <div className='text-truncate' title={_get(wallet, 'address', '')}>
              {_get(wallet, 'address', '')}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={4} sm={4} md={4} lg={3}>
            <Label>
              {formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_TO_LABEL)}
            </Label>
          </Col>
          <Col xs={8} sm={8} md={8} lg={9}>
            <div className='text-truncate' title={_get(wallet, 'address', '')}>
              {_get(formValues, [SEND_TOKEN_FIELDS.RECIPIENT], '')}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={4} sm={4} md={4} lg={3}>
            <Label>
              {formatMessage(
                MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_MESSAGE_LABEL,
              )}
            </Label>
          </Col>
          <Col xs={8} sm={8} md={8} lg={9}>
            <div>{_get(formValues, [SEND_TOKEN_FIELDS.MESSAGE], '')}</div>
          </Col>
        </Row>
        <Row>
          <Col xs={4} sm={4} md={4} lg={3}>
            <Label>
              {formatMessage(
                MSG.MY_WALLET_POPUP_SEND_TOKEN_INFO_TRANSACTION_FEE_LABEL,
              )}
            </Label>
          </Col>
          <Col xs={8} sm={8} md={8} lg={9}>
            <div>{`${_get(
              formValues,
              [SEND_TOKEN_FIELDS.TOKEN, PORFOLIO_COLUMNS.TRANSACTION_FEE],
              0,
            )} TOMO`}</div>
          </Col>
        </Row>
      </Container>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
ConfirmationContent.propTypes = {
  /** Send token form's input values */
  formValues: PropTypes.object,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Wallet's information */
  wallet: PropTypes.object,
};

ConfirmationContent.defaultProps = {
  formValues: {},
  intl: {},
  wallet: {},
};
// ======================

export default compose(withIntl)(ConfirmationContent);
