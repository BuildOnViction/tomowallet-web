/**
 *
 * TomoWallet - My Wallet Page - Receive Token Popup - Deposit Form
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _get from 'lodash.get';
import {
  Form,
  FormFeedback,
  Input,
  Label,
  Nav,
  NavItem,
} from 'reactstrap';
// Utilities & Constants
import { withIntl } from '../../../../../../components/IntlProvider';
import { MSG } from '../../../../../../constants';
import { createStructuredSelector } from 'reselect';
import { selectReceiveToKenPopup } from '../../../../selectors';
import {
  updateReceiveTokenInput,
  updateReceiveTokenErrors,
  resetReceiveToKenForm,
} from '../../../../actions';
import { StyledFormGroup } from '../../../../../styles';
// ===================

// ===== MAIN COMPONENT =====
class DepositForm extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  handleChangeInput(field) {
    const { onUpdateReceiveTokenInput } = this.props;
    return event =>
      onUpdateReceiveTokenInput(field, _get(event, 'target.value', event));
  }

  render() {
    const {
      intl: { formatMessage },
      receiveTokenPopup,
    } = this.props;
    const errors = _get(receiveTokenPopup, 'errors', {});
    const formValues = _get(receiveTokenPopup, 'input', {});

    return (
      <Form className='cm-form'>
        <StyledFormGroup>
          <Label for='amountInput'>
            {formatMessage(
              MSG.MY_WALLET_POPUP_RECEIVE_TOKEN_INPUT_AMOUNT_LABEL,
            )}
          </Label>
          <Input
            id='amountInput'
            type='number'
            name='amount'
            value={_get(formValues, 'amount', '')}
            placeholder={formatMessage(
              MSG.MY_WALLET_POPUP_RECEIVE_TOKEN_INPUT_AMOUNT_PLACEHOLDER,
            )}
            onChange={this.handleChangeInput('amount')}
            invalid={_get(errors, 'amount', []).length > 0}
          />
          <FormFeedback className='d-block'>
            <Nav>
              {_get(errors, 'amount', []).map((err, errIdx) => (
                <NavItem
                  key={`error_amount_${errIdx + 1}`}
                  className='text-danger'
                >
                  {`* ${err}`}
                </NavItem>
              ))}
            </Nav>
          </FormFeedback>
        </StyledFormGroup>
      </Form>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
DepositForm.propTypes = {
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Receive Token popup's data */
  receiveTokenPopup: PropTypes.object,
};

DepositForm.defaultProps = {
  intl: {},
  receiveTokenPopup: {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    receiveTokenPopup: selectReceiveToKenPopup,
  });
const mapDispatchToProps = dispatch => ({
  onResetReceiveTokenForm: () => dispatch(resetReceiveToKenForm()),
  onUpdateReceiveTokenErrors: errors =>
    dispatch(updateReceiveTokenErrors(errors)),
  onUpdateReceiveTokenInput: (name, value) =>
    dispatch(updateReceiveTokenInput(name, value)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
// ======================

export default compose(
  withConnect,
  withIntl,
)(DepositForm);
