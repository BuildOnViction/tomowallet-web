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
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  CardFooter,
} from 'reactstrap';
// Custom Components
import { ButtonStyler } from '../../../../styles';
// Utilities
import { withIntl } from '../../../../components/IntlProvider';
import { MSG, ROUTE } from '../../../../constants';
// -- TO-DO: Add style for Success Notification component
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
      <Card className='text-center'>
        <CardBody>
          {/* -- TO-DO: Add Success image's source */}
          <CardImg
            src=''
            alt={formatMessage(MSG.SUCCESS_NOTIFICATION_IMAGE_ALT)}
          />
          <CardTitle>
            {formatMessage(MSG.SUCCESS_NOTIFICATION_CONTENT_TITLE)}
          </CardTitle>
          <CardText>
            {formatMessage(MSG.SUCCESS_NOTIFICATION_CONTENT_DESCRIPTION)}
          </CardText>
        </CardBody>
        <CardFooter>
          <ButtonStyler btnYellow onClick={this.handleConfirmSuccess}>
            {formatMessage(MSG.SUCCESS_NOTIFICATION_BUTTON_ACCESS_WALLET)}
          </ButtonStyler>
        </CardFooter>
      </Card>
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
