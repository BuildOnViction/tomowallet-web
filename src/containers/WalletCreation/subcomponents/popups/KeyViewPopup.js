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
import { compose } from 'redux';
import { connect } from 'react-redux';
import _get from 'lodash.get';
import { CardText } from 'reactstrap';
// Custom Component
import Popup from '../../../../components/Popup';
import { HeadingMedium, BoxImages, TextBlue } from '../../../../styles';
// Utilities & Constants
import { withIntl } from '../../../../components/IntlProvider';
import { toggleClipboardCopyState } from '../../../Global/actions';
import { copyToClipboard } from '../../../../utils';
import { MSG } from '../../../../constants';
// ===================

// ===== SUB-COMPONENT =====
const Content = ({
  formatMessage,
  keyView,
  saveToClipboard,
  toggleKeyVisibile,
}) => (
  <div className='padding'>
    <HeadingMedium>
      {formatMessage(MSG.RECOVERY_PHRASE_POPUP_KEY_VIEW_CONTENT_TITLE)}
    </HeadingMedium>
    <CardText>
      {formatMessage(MSG.RECOVERY_PHRASE_POPUP_KEY_VIEW_CONTENT_TEXT)}
    </CardText>
    <BoxImages>
      {_get(keyView, 'isPKVisible') ? (
        <TextBlue
          role='presentation'
          onClick={saveToClipboard}
          className='d-block text-break text-center mt-3'
        >
          {_get(keyView, 'key')}
        </TextBlue>
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
  </div>
);
// =========================

// ===== MAIN COMPONENT =====
class KeyViewPopup extends PureComponent {
  constructor(props) {
    super(props);

    this.handleClosePopup = this.handleClosePopup.bind(this);
    this.handleCopyToClipboard = this.handleCopyToClipboard.bind(this);
  }

  handleClosePopup() {
    const { togglePopup, toggleKeyVisibile } = this.props;
    togglePopup(false);
    toggleKeyVisibile(false);
  }

  handleCopyToClipboard() {
    const { keyView, onToggleClipboardPopup } = this.props;
    copyToClipboard(_get(keyView, 'key'));
    onToggleClipboardPopup(true);
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
          saveToClipboard: this.handleCopyToClipboard,
          toggleKeyVisibile,
        }}
        button={{
          primary: {
            action: this.handleClosePopup,
            label: formatMessage(MSG.COMMON_BUTTON_CLOSE),
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

// ===== INJECTIONS =====
const mapDispatchToProps = dispatch => ({
  onToggleClipboardPopup: bool => dispatch(toggleClipboardCopyState(bool)),
});
const withConnect = connect(
  null,
  mapDispatchToProps,
);
// ======================

export default compose(
  withConnect,
  withIntl,
)(KeyViewPopup);
