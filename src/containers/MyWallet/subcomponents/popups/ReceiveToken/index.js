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
import _isEmpty from 'lodash.isempty';
// Custom Components
import DepositForm from './subcomponents/DepositForm';
import ReceiveForm from './subcomponents/ReceiveForm';
import { ReceiveTokenPopupStyler } from './style';
// Utilities & Constants
import { withIntl } from '../../../../../components/IntlProvider';
import { withWeb3 } from '../../../../../components/Web3';
import { MSG } from '../../../../../constants';
import {
  withGlobal,
  validations,
  depositPrivateCoin,
} from '../../../../../utils';
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

    this.handleDepositCoin = this.handleDepositCoin.bind(this);
    this.handleValidateForm = this.handleValidateForm.bind(this);
    this.renderPopupButtons = this.renderPopupButtons.bind(this);
    this.renderPopupContent = this.renderPopupContent.bind(this);
  }

  handleDepositCoin() {
    const { onUpdateReceiveTokenErrors, popupData, wallet, web3 } = this.props;
    const formValues = _get(popupData, 'input');
    const errorList = this.handleValidateForm();

    if (!_isEmpty(errorList)) {
      onUpdateReceiveTokenErrors(errorList);
    } else {
      depositPrivateCoin(web3, {
        ...wallet,
        amount: formValues.amount,
        from: wallet.privAddr,
      })
        .then(successInfo => console.warn('Success! -- ', successInfo))
        .catch(error => {
          console.error('[ERROR in Deposit]: ', error);
          onUpdateReceiveTokenErrors({
            amount: [error.message],
          });
        });
    }
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

  renderPopupButtons() {
    const {
      intl: { formatMessage },
      onTogglePopup,
      privacyMode,
    } = this.props;
    if (privacyMode) {
      return {
        secondary: {
          label: formatMessage(MSG.COMMON_BUTTON_BACK),
          action: () => onTogglePopup(false),
        },
        primary: {
          btnYellow: true,
          label: formatMessage(MSG.COMMON_BUTTON_DEPOSIT),
          action: this.handleDepositCoin,
        },
      };
    }
    return {
      primary: {
        label: formatMessage(MSG.COMMON_BUTTON_CLOSE),
        action: () => onTogglePopup(false),
      },
    };
  }

  renderPopupContent() {
    const { privacyMode } = this.props;

    if (privacyMode) {
      return DepositForm;
    }
    return ReceiveForm;
  }

  render() {
    const {
      intl: { formatMessage },
      privacyMode,
      popupData,
    } = this.props;
    return (
      <ReceiveTokenPopupStyler
        Content={this.renderPopupContent()}
        isOpen={_get(popupData, 'isOpen', false)}
        title={formatMessage(
          privacyMode
            ? MSG.MY_WALLET_POPUP_RECEIVE_TOKEN_TITLE_DEPOSIT
            : MSG.MY_WALLET_POPUP_RECEIVE_TOKEN_TITLE,
        )}
        button={this.renderPopupButtons()}
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
  /** Condition flag to enable/disable privacy mode */
  privacyMode: PropTypes.bool,
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
  privacyMode: false,
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
