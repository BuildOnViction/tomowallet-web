/**
 *
 * TomoWallet - My Wallet Page - Success Popup Content
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { get as _get } from 'lodash';
import { Label } from 'reactstrap';
// Utilities & Constants
import { withIntl } from '../../../../../../components/IntlProvider';
import { MSG } from '../../../../../../constants';
import {
  BoxText,
  TextYellow,
  TextGray
} from '../../../../../../styles';
// ===================

// ===== MAIN COMPONENT =====
class SuccessContent extends PureComponent {
  render() {
    const {
      amount,
      intl: { formatMessage },
      symbol,
      txHash,
    } = this.props;
    return (
      <Fragment>
        <BoxText className='text-center word-break'>
          <div>
            <p><i className="font-icon-checkmark-outline"></i></p>
            <TextYellow>{formatMessage(MSG.SUCCESS_NOTIFICATION_IMAGE_ALT)}</TextYellow>
          </div>
          <div className='my-4'>
            {`${formatMessage(
              MSG.MY_WALLET_POPUP_SUCCESS_INFO_AMOUNT_SENT,
            )} ${amount} ${symbol}`}
          </div>
          <TextGray className='mb-3 '>
            {formatMessage(MSG.MY_WALLET_POPUP_SUCCESS_INFO_TRANSACTION_HASH)}
          </TextGray>
          <div>{_get(txHash, 'transactionHash')}</div>
        </BoxText>
      </Fragment>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
SuccessContent.propTypes = {
  /** Amount of sent token */
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Token symbol */
  symbol: PropTypes.string,
  /** Successful transaction's hash data */
  txHash: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

SuccessContent.defaultProps = {
  amount: 0,
  intl: {},
  symbol: '',
  txHash: '',
};
// ======================

export default withIntl(SuccessContent);
