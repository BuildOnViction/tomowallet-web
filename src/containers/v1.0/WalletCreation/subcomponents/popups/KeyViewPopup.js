/**
 *
 * TomoWallet - Wallet Creation Page - Private Key View Popup
 *
 * This popup shows a private key string generated from mnemonic,
 * including a QR Code for convenient access
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { get as _get } from 'lodash';
import QRCode from 'qrcode.react';
// Custom Component
import Popup from '../../../../../components/Popup';
// Utilities & Constants
import { withIntl } from '../../../../../components/IntlProvider';
import { MSG } from '../../../../../constants';
// -- TO-DO: Add style for Private Key view popup
import {
  CardText,
} from 'reactstrap';
import {
  HeadingMedium,
  BoxImages
} from '../../../../../styles';
// ===================

// ===== SUB-COMPONENT =====
const Content = ({ formatMessage, keyView, toggleKeyVisibile }) => (
  <div className='padding'>
    <HeadingMedium>
      {formatMessage(MSG.RECOVERY_PHRASE_POPUP_KEY_VIEW_CONTENT_TITLE)}
    </HeadingMedium>
    <CardText>
      {formatMessage(MSG.RECOVERY_PHRASE_POPUP_KEY_VIEW_CONTENT_TEXT)}
    </CardText>
    {/* -- TO-DO: Rewrite style for this QR code cover box */}
    {/* -- NOTE: There hasn't been any UI design for it yet. Please use your imagination! :) */}
    <BoxImages>
      {_get(keyView, 'isPKVisible') ? (
        <QRCode value={_get(keyView, 'key')} />
      ) : (
        <div
          role='presentation'
          onClick={() => toggleKeyVisibile(true)}
          className='p-5 border rounded'
        >
          {formatMessage(MSG.RECOVERY_PHRASE_POPUP_KEY_VIEW_CONTENT_QRCODE_ALT)}
        </div>
      )}
    </BoxImages>
    <div className='text-break mt-3'>{_get(keyView, 'key')}</div>
  </div>
);
// =========================

// ===== MAIN COMPONENT =====
class KeyViewPopup extends PureComponent {
  constructor(props) {
    super(props);

    this.handleClosePopup = this.handleClosePopup.bind(this);
  }

  handleClosePopup() {
    const { togglePopup, toggleKeyVisibile } = this.props;
    togglePopup(false);
    toggleKeyVisibile(false);
  }

  render() {
    const {
      intl: { formatMessage },
      keyView,
      toggleKeyVisibile,
    } = this.props;
    return (
      <Popup
        isOpen={_get(keyView, 'isOpen', false)}
        toggle={this.handleClosePopup}
        title={formatMessage(MSG.RECOVERY_PHRASE_POPUP_KEY_VIEW_HEADER)}
        Content={Content}
        getContentProps={{
          formatMessage,
          keyView,
          toggleKeyVisibile,
        }}
        button={{
          primary: {
            label: formatMessage(MSG.COMMON_BUTTON_SAVE),
          },
          secondary: {
            label: formatMessage(MSG.COMMON_BUTTON_BACK),
            action: this.handleClosePopup,
          },
        }}
      />
    );
  }
}
// ==========================

// ===== PROP TYPES =====
KeyViewPopup.propTypes = {
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Popup's data set */
  keyView: PropTypes.object,
};

KeyViewPopup.defaultProps = {
  intl: {},
  keyView: {},
};
// ======================

export default withIntl(KeyViewPopup);
