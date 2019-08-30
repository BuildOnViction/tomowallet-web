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
import PropTypes from 'prop-types';
import { Row, Col, Nav, NavItem } from 'reactstrap';
// Custom Component
import { LinkFooter, TextGray } from './style';
// Utilities & Constants
import { withIntl } from '../IntlProvider';
import { MSG } from '../../constants';
// ===================

// ===== MAIN COMPONENT =====
class Footer extends PureComponent {
  constructor(props) {
    super(props);

    this.FOOTER_BUTTONS = [
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
    ];
  }

  render() {
    const {
      intl: { formatMessage },
    } = this.props;
    return (
      <Row className='align-items-center pt-3 pb-3'>
        <Col xs={12} md={7}>
          <TextGray className='mb-text-center'>
            {formatMessage(MSG.FOOTER_VERSION_TEXT)}
          </TextGray>
          <Row className='footer-menu'>
            <Nav>
              <NavItem>
                <LinkFooter
                  href='https://docs.tomochain.com/products/tomowallet/features/'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  {formatMessage(MSG.FOOTER_OPTION_HELP)}
                </LinkFooter>
              </NavItem>
              <NavItem>
                <LinkFooter
                  href='https://docs.tomochain.com/products/tomowallet/terms/'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  {formatMessage(MSG.FOOTER_OPTION_TERMS_PRIVACY)}
                </LinkFooter>
              </NavItem>
              <NavItem>
                <LinkFooter
                  href='https://tomochain.com'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  {formatMessage(MSG.HEADER_NAVBAR_OPTION_ABOUT)}
                </LinkFooter>
              </NavItem>
              <NavItem>
                <LinkFooter
                  href='https://docs.tomochain.com/general/faq/#tomowallet'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  {formatMessage(MSG.HEADER_NAVBAR_OPTION_FAQS)}
                </LinkFooter>
              </NavItem>
            </Nav>
          </Row>
        </Col>
        <Col xs={12} md={5}>
          <Nav className='footer-buttons'>
            {this.FOOTER_BUTTONS.map((item, itemIdx) => (
              <NavItem key={`footer_button_${itemIdx + 1}`}>
                <LinkFooter href={item.link} target='_blank'>
                  <i className={item.className} />
                </LinkFooter>
              </NavItem>
            ))}
          </Nav>
        </Col>
      </Row>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
Footer.propTypes = {
  /** React Intl's instance object */
  intl: PropTypes.object,
};

Footer.defaultProps = {
  intl: {},
};
// ======================

export default withIntl(Footer);
