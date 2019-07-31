// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, CardImg } from 'reactstrap';
// Custom Components
import { BigButtonStyler } from '../../../styles';
import { WelcomeFormStyler } from '../style';
// Constants & Styles
import { ROUTE } from '../../../constants';
import tomoIcon from '../../../assets/images/tomo-icon.png';

// ===== MAIN COMPONENT =====
class WelcomeForm extends PureComponent {
  constructor(props) {
    super(props);

    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect(newRoute) {
    const { history } = this.props;
    history.push(newRoute);
  }

  render() {
    return (
      <WelcomeFormStyler>
        <Container fluid>
          <Row className='my-4'>
            <Col xs={12} sm={12} md={12} lg={12} className='text-center'>
              <CardImg src={tomoIcon} />
            </Col>
          </Row>
          <Row className='my-4'>
            <Col xs={12} sm={12} md={12} lg={12} className='text-center'>
              <h1>Welcome to Tomo Wallet</h1>
            </Col>
          </Row>
          <Row className='my-4'>
            <Col xs={12} sm={12} md={12} lg={12} className='text-center'>
              <BigButtonStyler
                onClick={() => this.handleRedirect(ROUTE.RECOVERY_PHRASE)}
              >
                Create a New Wallet
              </BigButtonStyler>
            </Col>
          </Row>
          <Row className='my-4'>
            <Col xs={12} sm={12} md={12} lg={12} className='text-center'>
              or
            </Col>
          </Row>
          <Row className='my-4'>
            <Col xs={12} sm={12} md={12} lg={12} className='text-center'>
              <BigButtonStyler
                onClick={() => this.handleRedirect(ROUTE.IMPORT_WALLET)}
              >
                Import Your Wallet
              </BigButtonStyler>
            </Col>
          </Row>
        </Container>
      </WelcomeFormStyler>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
WelcomeForm.propTypes = {
  history: PropTypes.object,
};
// ======================

export default withRouter(WelcomeForm);
