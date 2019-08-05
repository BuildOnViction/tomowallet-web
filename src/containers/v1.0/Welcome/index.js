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
import { Container, Row, Col, CardImg } from 'reactstrap';
// Custom Component
// -- TO-DO: Update style for button component
import { BigButtonStyler } from '../../../styles';
// Utilities & Constants
import { withIntl } from '../../../components/IntlProvider';
import { MSG, ROUTE } from '../../../constants';
// -- TO-DO: Add style for Welcome content component
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
      <Container fluid>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <h1>{formatMessage(MSG.WELCOME_TITLE)}</h1>
            <p>{formatMessage(MSG.WELCOME_DESCRIPTION)}</p>
            <Container fluid className='text-center'>
              <Row>
                <Col xs={12} sm={12} md={12} lg={8}>
                  <BigButtonStyler
                    onClick={() => this.handleRedirect(ROUTE.CREATE_WALLET)}
                  >
                    {formatMessage(MSG.WELCOME_BUTTON_CREATE_NEW_WALLET)}
                  </BigButtonStyler>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={8}>
                  {formatMessage(MSG.WELCOME_TEXT_BETWEEN_BUTTONS)}
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={8}>
                  <BigButtonStyler
                    onClick={() => this.handleRedirect(ROUTE.IMPORT_WALLET)}
                  >
                    {formatMessage(MSG.WELCOME_BUTTON_IMPORT_WALLET)}
                  </BigButtonStyler>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col md={6} lg={6} className='d-none d-md-block'>
            {/* -- TO-DO: Add welcome page's image source */}
            <CardImg src='' alt={formatMessage(MSG.WELCOME_IMAGE_ALT)} />
          </Col>
        </Row>
      </Container>
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
// ======================

export default compose(
  withRouter,
  withIntl,
)(WelcomePage);
