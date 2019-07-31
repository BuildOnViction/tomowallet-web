/**
 *
 * Recovery Phrase - Mnemonic Verification Pop-up
 *
 */
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CardBody, CardText, Container, Row, Col } from 'reactstrap';
// Custom Components
import { VerificationPopupStyler } from '../style';

// ===== SUB-COMPONENTS =====
const VerificationContent = () => (
  <CardBody>
    <CardText className='mt-3'>
      Verify your Recovery Phrase. Choose each word in the correct order
    </CardText>
    <Container fluid className='mb-3 px-0 py-2 phrase-box'>
      <Row noGutters>
        <Col xs={6} sm={6} md={6} lg={6} className='px-4 py-2'>
          faweg
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} className='px-4 py-2'>
          faweg
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} className='px-4 py-2'>
          faweg
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} className='px-4 py-2'>
          faweg
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} className='px-4 py-2'>
          faweg
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} className='px-4 py-2'>
          faweg
        </Col>
      </Row>
    </Container>
    <Container fluid className='p-0'>
      <Row>
        <Col>gawga</Col>
        <Col>gawga</Col>
        <Col>gawga</Col>
        <Col>gawga</Col>
      </Row>
    </Container>
  </CardBody>
);
// ==========================

// ===== MAIN COMPONENT =====
class VerificationPopup extends PureComponent {
  render() {
    const { isOpen, handleExecution, hidePopup } = this.props;
    return (
      <VerificationPopupStyler
        backdrop='static'
        isOpen={isOpen}
        toggle={hidePopup}
        title='Verification'
        Content={VerificationContent}
        button={{
          primary: {
            label: 'Verify',
            action: handleExecution,
          },
        }}
      />
    );
  }
}
// ==========================

// ===== PROP TYPES =====
VerificationPopup.propTypes = {
  isOpen: PropTypes.bool,
  handleExecution: PropTypes.func,
  hidePopup: PropTypes.func,
};

VerificationPopup.defaultProps = {
  isOpen: false,
  handleExecution: () => {},
  hidePopup: () => {},
};
// ======================

export default VerificationPopup;
