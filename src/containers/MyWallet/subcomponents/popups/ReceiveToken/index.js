/**
 *
 * TomoWallet - My Wallet Page - Receive Token Popup
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _get from 'lodash.get';
// Custom Components
import ReceiveForm from './subcomponents/ReceiveForm';
import { ReceiveTokenPopupStyler } from './style';
// Utilities & Constants
import { withIntl } from '../../../../../components/IntlProvider';
import { withWeb3 } from '../../../../../components/Web3';
import { MSG } from '../../../../../constants';
import { withGlobal, validations } from '../../../../../utils';
import { createStructuredSelector } from 'reselect';
import { selectReceiveToKenPopup } from '../../../selectors';
import {
  toggleReceiveTokenPopup,
  updateReceiveTokenErrors,
} from '../../../actions';
import { selectWallet } from '../../../../Global/selectors';
// ===================

// ===== MAIN COMPONENT =====
class ReceiveTokenPopup extends PureComponent {
  constructor(props) {
    super(props);

    this.handleValidateForm = this.handleValidateForm.bind(this);
  }

  handleValidateForm() {
    const {
      intl: { formatMessage },
      popupData,
    } = this.props;
    const { isRequired } = validations;
    const formValues = _get(popupData, 'input', {});

    return {
      ...isRequired(
        { name: 'amount', value: formValues.amount },
        formatMessage(MSG.MY_WALLET_POPUP_RECEIVE_TOKEN_ERROR_AMOUNT_REQUIRED),
      ),
    };
  }

  render() {
    const {
      intl: { formatMessage },
      onTogglePopup,
      popupData,
    } = this.props;
    return (
      <ReceiveTokenPopupStyler
        Content={ReceiveForm}
        isOpen={_get(popupData, 'isOpen', false)}
        title={formatMessage(MSG.MY_WALLET_POPUP_RECEIVE_TOKEN_TITLE)}
        button={{
          primary: {
            label: formatMessage(MSG.COMMON_BUTTON_CLOSE),
            action: () => onTogglePopup(false),
          },
        }}
      />
    );
  }
}
// ==========================

// ===== PROP TYPES =====
ReceiveTokenPopup.propTypes = {
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to show/hide popup */
  onTogglePopup: PropTypes.func,
  /** Action to update deposit form's errors */
  onUpdateReceiveTokenErrors: PropTypes.func,
  /** Receive token popup's data */
  popupData: PropTypes.object,
  /** Wallet's data */
  wallet: PropTypes.object,
  /** Current Web3 provider */
  web3: PropTypes.object,
};

ReceiveTokenPopup.defaultProps = {
  depositCoin: () => {},
  intl: {},
  onTogglePopup: () => {},
  onUpdateReceiveTokenErrors: () => {},
  popupData: {},
  wallet: {},
  web3: {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    popupData: selectReceiveToKenPopup,
    wallet: selectWallet,
  });
const mapDispatchToProps = dispatch => ({
  onTogglePopup: bool => dispatch(toggleReceiveTokenPopup(bool)),
  onUpdateReceiveTokenErrors: errors =>
    dispatch(updateReceiveTokenErrors(errors)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
// ======================

export default compose(
  withConnect,
  withGlobal,
  withIntl,
  withWeb3,
)(ReceiveTokenPopup);
