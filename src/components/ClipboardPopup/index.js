/**
 *
 * TomoWallet - Clipboard Popup
 *
 * This component notices the user that some text content has been copied to clipboard
 */
// ===== IMPORT =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// Custom Components
import { ClipboardPopupStyler } from './style';
// Utilities & Constants
import { selectClipboardPopup } from '../../containers/Global/selectors';
import { toggleClipboardCopyState } from '../../containers/Global/actions';
import { getMessage } from '../IntlProvider';
import { MSG } from '../../constants';
// ==================

// ===== MAIN COMPONENT =====
class ClipboardPopup extends PureComponent {
  componentDidUpdate() {
    const { data, onTogglePopup } = this.props;
    if (data.isOpen) {
      setTimeout(() => {
        onTogglePopup(false);
      }, 1500);
    }
  }

  render() {
    const { data } = this.props;
    return (
      <ClipboardPopupStyler isOpen={data.isOpen}>
        {getMessage(MSG.POPUP_CLIPBOARD_CONTENT_MESSAGE)}
      </ClipboardPopupStyler>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
ClipboardPopup.propTypes = {
  /** Popup's data */
  data: PropTypes.object,
  /** Action to show/hide clipboard popup */
  onTogglePopup: PropTypes.func,
};

ClipboardPopup.defaultProps = {
  data: {},
  onTogglePopup: () => {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    data: selectClipboardPopup,
  });
const mapDispatchToProps = dispatch => ({
  onTogglePopup: bool => dispatch(toggleClipboardCopyState(bool)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
// ======================

export default withConnect(ClipboardPopup);
