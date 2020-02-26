/**
 *
 * TomoWallet - My Wallet Page - Receive Token Popup - Receive Form
 *
 */
// ===== IMPORTS =====
// Modules
import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _get from 'lodash.get';
import QRCode from 'qrcode.react';
// Custom Components
import { AddressBox, AddressText } from '../style';
import { BoxImages, TextLinkYellow } from '../../../../../../styles';
import { Copy } from '../../../../../../components/Icons';
// Utilities & Constants
import { withGlobal, truncateMiddle } from '../../../../../../utils';
import { withIntl } from '../../../../../../components/IntlProvider';
import { selectWallet, selectPrivacyMode, selectPrivacyWallet } from '../../../../../Global/selectors';
import { MSG } from '../../../../../../constants';
// ===================

// ===== MAIN COMPONENT =====
class ReceiveContent extends PureComponent {
  render() {
    const {
      intl: { formatMessage },
      wallet,
      privacyMode,
      handleCopyToClipboard,
      privacyWallet,
    } = this.props;

    const address = _get(wallet, 'address', '');
    const privacyAddress = _get(privacyWallet, ['privacyAddress', 'pubAddr'], '');
    const currentAddress = privacyMode ? privacyAddress : address;

    return (
      <Fragment>
        <div className='text-center'>
          {privacyMode ?
            formatMessage(MSG.MY_WALLET_POPUP_RECEIVE_TOKEN_PRIVACY_CONTENT_MESSAGE)
            :
            formatMessage(MSG.MY_WALLET_POPUP_RECEIVE_TOKEN_CONTENT_MESSAGE)
          }
        </div>
        <BoxImages className='mt-5 mb-5'>
          <div className='qrc_bd'>
            <QRCode value={privacyMode ? privacyAddress : address} />
          </div>
        </BoxImages>
        <AddressBox>
          <AddressText>{privacyMode ? truncateMiddle(currentAddress, 18, 18) : currentAddress}</AddressText>
          <TextLinkYellow onClick={() => handleCopyToClipboard(currentAddress)}>
            <Copy /> {formatMessage(MSG.COMMON_BUTTON_COPY)}
          </TextLinkYellow>
        </AddressBox>
      </Fragment>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
ReceiveContent.propTypes = {
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Current wallet's data */
  wallet: PropTypes.object,
  /** Current privacy wallet's data */
  privacyWallet: PropTypes.object,
};

ReceiveContent.defaultProps = {
  intl: {},
  wallet: {},
  privacyWallet: {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    wallet: selectWallet,
    privacyMode: selectPrivacyMode,
    privacyWallet: selectPrivacyWallet,
  });
const withConnect = connect(mapStateToProps);
// ======================

export default compose(
  withGlobal,
  withConnect,
  withIntl,
)(ReceiveContent);
