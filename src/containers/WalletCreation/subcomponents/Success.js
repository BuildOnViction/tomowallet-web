/**
 *
 * TomoWallet - Wallet Creation Page - Success Notification
 *
 * This component simply tell users that they've created their wallet successfully
 * and are about to redirect to homepage.
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// Custom Componentsimport {
import { Row, Col } from 'reactstrap';
import { BoxText, TextYellow, ButtonStyler } from '../../../styles';
import { RowCentered } from '../style'
// Utilities
import { withIntl } from '../../../components/IntlProvider';
import { MSG, ROUTE } from '../../../constants';
// ===================

// ===== MAIN COMPONENT =====
class SuccessNotification extends PureComponent {
  constructor(props) {
    super(props);

    this.handleConfirmSuccess = this.handleConfirmSuccess.bind(this);
  }

  handleConfirmSuccess() {
    const { confirmSuccess, history } = this.props;
    confirmSuccess();
    history.push(ROUTE.MY_WALLET);
  }

  render() {
    const {
      intl: { formatMessage },
    } = this.props;
    return (
      <BoxText className='text-center word-break'>
        <div>
          <p>
            <i className='font-icon-checkmark-outline' />
          </p>
          <TextYellow>
            {formatMessage(MSG.SUCCESS_NOTIFICATION_CONTENT_TITLE)}
          </TextYellow>
        </div>
        <div className='my-4'>
          {formatMessage(MSG.SUCCESS_NOTIFICATION_CONTENT_DESCRIPTION)}
        </div>
        <RowCentered>
            <ButtonStyler width='auto' btnYellow onClick={this.handleConfirmSuccess}>
              {formatMessage(MSG.SUCCESS_NOTIFICATION_BUTTON_ACCESS_WALLET)}
            </ButtonStyler>
        </RowCentered>
      </BoxText>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
SuccessNotification.propTypes = {
  /** Action to storing wallet data */
  confirmSuccess: PropTypes.func,
  /** React Router's API object */
  history: PropTypes.object,
  /** React Intl's instance object */
  intl: PropTypes.object,
};

SuccessNotification.defaultProps = {
  confirmSuccess: () => {},
  history: {},
  intl: {},
};
// ======================

export default compose(
  withRouter,
  withIntl,
)(SuccessNotification);
