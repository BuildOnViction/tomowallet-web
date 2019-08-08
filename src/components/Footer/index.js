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
    className: 'font-icon-facebook',
    link: 'https://www.facebook.com/tomochainofficial',
  },
  {
    className: 'font-icon-twitter',
    link: 'https://twitter.com/TomoChainANN',
  },
  {
    className: 'font-icon-telegram',
    link: 'https://t.me/tomochain',
  },
  {
    className: 'font-icon-github',
    link: 'https://github.com/tomochain/',
  },
  {
    className: 'font-icon-linkedin',
    link: 'https://www.linkedin.com/company/tomochain',
  },
  {
    className: 'font-icon-reddit',
    link: 'https://www.reddit.com/r/Tomochain/',
  },
]

// ===== MAIN COMPONENT =====
class Footer extends PureComponent {

  render() {
    return (
      <Row className='align-items-center pt-3 pb-3'>
        <Col xs={12} lg={7}>
          <div className='mb-text-center'>TomoWallet 2019 - v1.0</div>
          <Row className='footer-menu'>
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
                <LinkFooter href="#">API Documentation</LinkFooter>
              </NavItem>
            </Nav>
          </Row>
        </Col>
        <Col xs={12} lg={5}>
          <Nav className="footer-buttons">
            {FooterButtons.map(item => (
              <NavItem>
                <LinkFooter href="{item.link}" target="_blank"><i className={item.className} /></LinkFooter>
              </NavItem>
            ))}
          </Nav>
        </Col>
      </Row>
    );
  }
}

export default Footer;

