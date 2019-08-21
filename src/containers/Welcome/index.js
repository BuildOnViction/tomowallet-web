/**
 *
 * TomoWallet - Welcome Page
 *
 * This is the default page when user visits TomoWallet Web.
 * It provides 2 options to access to wallet: "Create New Wallet" & "Import Wallet".
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col, CardImg } from 'reactstrap';
// Custom Component
import { BigButtonStyler, BoxBtnStyler, HeadingBig } from '../../styles';
// Utilities, Constants & Styles
import { withIntl } from '../../components/IntlProvider';
import { MSG, ROUTE } from '../../constants';
import imgvisual_login from '../../assets/images/img-visual-login.png';
// ===================

// ===== MAIN COMPONENT =====
class WelcomePage extends PureComponent {
  constructor(props) {
    super(props);

    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect(newRoute) {
    const { history } = this.props;
    history.push(newRoute);
  }

  render() {
    const {
      intl: { formatMessage },
    } = this.props;
    return (
      <Row className='align-items-center'>
        <Col xs={12} md={6} lg={7}>
          <HeadingBig>{formatMessage(MSG.WELCOME_TITLE)}</HeadingBig>
          <p className='mb-5'>{formatMessage(MSG.WELCOME_DESCRIPTION)}</p>
          <BoxBtnStyler className='mt-3'>
            <div>
              <BigButtonStyler
                btnBlue
                onClick={() => this.handleRedirect(ROUTE.IMPORT_WALLET)}
              >
                {formatMessage(MSG.WELCOME_BUTTON_IMPORT_WALLET)}
              </BigButtonStyler>
            </div>
            <div className='m-3'>
              {formatMessage(MSG.WELCOME_TEXT_BETWEEN_BUTTONS)}
            </div>
            <div>
              <BigButtonStyler
                onClick={() => this.handleRedirect(ROUTE.CREATE_WALLET)}
              >
                {formatMessage(MSG.WELCOME_BUTTON_CREATE_NEW_WALLET)}
              </BigButtonStyler>
            </div>
          </BoxBtnStyler>
        </Col>
        <Col xs={12} md={6} lg={5} className='d-none d-md-block'>
          <CardImg
            src={imgvisual_login}
            alt={formatMessage(MSG.WELCOME_IMAGE_ALT)}
          />
        </Col>
      </Row>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
WelcomePage.propTypes = {
  /** React Router's API object */
  history: PropTypes.object,
  /** React Intl's instance object */
  intl: PropTypes.object,
};

WelcomePage.defaultProps = {
  history: {},
  intl: {},
};
// ======================

export default compose(
  withRouter,
  withIntl,
)(WelcomePage);
