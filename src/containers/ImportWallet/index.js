/**
 *
 * Import Wallet Page
 *
 */
// Modules
import React, { PureComponent } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardImg,
  CardTitle,
} from 'reactstrap';
// Custom Components
import { BackgroundStyler } from './style';
import { ROUTE } from '../../constants';

// ===== MAIN COMPONENT =====
class ImportWallet extends PureComponent {
  render() {
    return (
      <BackgroundStyler>
        <Container fluid>
          <Row className='mb-3'>
            <Col xs={12} sm={12} md={12} lg={12} className='text-center'>
              <h1>Import your wallet</h1>
            </Col>
          </Row>
          <Row className='my-3'>
            <Col xs={12} sm={12} md={12} lg={12} className='text-center'>
              <div className='create-wallet'>
                {`Do not have a wallet? `}
                <div
                  role='presentation'
                  onClick={() => this.handleRedirect(ROUTE.RECOVERY_PHRASE)}
                  className='d-inline-block create-wallet__link'
                >
                  Create a new wallet
                </div>
              </div>
            </Col>
          </Row>
          <Row className='my-4'>
            <Col
              xs={12}
              sm={12}
              md={{ size: 6, offset: 3 }}
              lg={{ size: 4, offset: 4 }}
              className='text-center'
            >
              <Container fluid className='p-0'>
                <Row noGutters>
                  <Col className='pr-3'>
                    <Card>
                      <CardImg alt='Ledger Wallet' />
                      <CardBody>
                        <CardTitle>Ledger Wallet</CardTitle>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col className='pl-3'>
                    <Card>
                      <CardImg alt='Recovery Phrase / Private Key' />
                      <CardBody>
                        <CardTitle>Recovery Phrase / Private Key</CardTitle>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </BackgroundStyler>
    );
  }
}
// ==========================

export default ImportWallet;
