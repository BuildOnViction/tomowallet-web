// Modules
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
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem
} from 'reactstrap';
import {
  LinkFooter,
} from './style';
// -- TO-DO: Add style for Welcome content component
// ===================

const FooterButtons = [
  {
    className: 'tomorelayer-icon-facebook',
    link: 'https://www.facebook.com/tomochainofficial',
  },
  {
    className: 'tomorelayer-icon-twitter',
    link: 'https://twitter.com/TomoChainANN',
  },
  {
    className: 'tomorelayer-icon-telegram',
    link: 'https://t.me/tomochain',
  },
  {
    className: 'tomorelayer-icon-github',
    link: 'https://github.com/tomochain/',
  },
  {
    className: 'tomorelayer-icon-linkedin',
    link: 'https://www.linkedin.com/company/tomochain',
  },
  {
    className: 'tomorelayer-icon-reddit',
    link: 'https://www.reddit.com/r/Tomochain/',
  },
]

// ===== MAIN COMPONENT =====
class Footer extends PureComponent {

  render() {
    return (
      <Container fluid>
        <Row className='align-items-center pt-5'>
          <Col xs={12} md={7}>
            <div>TomoWallet 2019 - v1.0</div>
            <Row>
              <Nav>
                <NavItem>
                  <LinkFooter href="#">Need help?</LinkFooter>
                </NavItem>
                <NavItem>
                  <LinkFooter href="#">Privacy Policy</LinkFooter>
                </NavItem>
                <NavItem>
                  <LinkFooter href="#">Terms of Service</LinkFooter>
                </NavItem>
                <NavItem>
                  <LinkFooter disabled href="#">API Documentation</LinkFooter>
                </NavItem>
              </Nav>
            </Row>
          </Col>
          <Col xs={12} md={5}>
            <Nav className="footer-buttons">
              {FooterButtons.map(item => (
                <NavItem>
                  <LinkFooter href="{item.link}" target="_blank"><i className={item.className} /></LinkFooter>
                </NavItem>
              ))}
            </Nav>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Footer;

