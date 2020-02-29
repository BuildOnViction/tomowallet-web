// Modules
/**
 *
 * TomoWallet - Screen Footer
 *
 * This component defines TomoWallet website footer.
 * All supported & social network share links are here.
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Nav } from 'reactstrap';
// Custom Component
import { LinkNavItem, SocialNavItem, LinkFooter, TextGray } from './style';
// Utilities & Constants
import { withIntl } from '../IntlProvider';
import { MSG } from '../../constants';
// ===================

// ===== MAIN COMPONENT =====
class Footer extends PureComponent {
  constructor(props) {
    super(props);
    const {
      intl: { formatMessage },
    } = props;

    this.SOCIAL_NETWORKS = [
      {
        className: 'font-icon-facebook',
        url: 'https://www.facebook.com/tomochainofficial',
      },
      {
        className: 'font-icon-twitter',
        url: 'https://twitter.com/TomoChainANN',
      },
      {
        className: 'font-icon-telegram',
        url: 'https://t.me/tomochain',
      },
      {
        className: 'font-icon-github',
        url: 'https://github.com/tomochain/',
      },
      {
        className: 'font-icon-linkedin',
        url: 'https://www.linkedin.com/company/tomochain',
      },
      {
        className: 'font-icon-reddit',
        url: 'https://www.reddit.com/r/Tomochain/',
      },
    ];
    this.WEBSITE_SUPPORTED_LINKS = [
      {
        url: 'https://docs.tomochain.com/products/tomowallet/features/',
        content: formatMessage(MSG.FOOTER_OPTION_HELP),
      },
      {
        url: 'https://docs.tomochain.com/legal/terms-of-use',
        content: formatMessage(MSG.FOOTER_OPTION_TERMS_USE),
      },
      {
        url: 'https://docs.tomochain.com/legal/privacy',
        content: formatMessage(MSG.FOOTER_OPTION_PRIVACY_POLICY),
      },
      {
        url: 'https://tomochain.com',
        content: formatMessage(MSG.HEADER_NAVBAR_OPTION_ABOUT),
      },
      {
        url: 'https://docs.tomochain.com/faq/products/tomochain-applications/tomowallet',
        content: formatMessage(MSG.HEADER_NAVBAR_OPTION_FAQS),
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
              {this.WEBSITE_SUPPORTED_LINKS.map((link, linkIdx) => (
                <LinkNavItem key={`website_link_${linkIdx + 1}`}>
                  <LinkFooter
                    href={link.url}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    {link.content}
                  </LinkFooter>
                </LinkNavItem>
              ))}
            </Nav>
          </Row>
        </Col>
        <Col xs={12} md={5}>
          <Nav className='footer-buttons'>
            {this.SOCIAL_NETWORKS.map((item, itemIdx) => (
              <SocialNavItem key={`footer_button_${itemIdx + 1}`}>
                <LinkFooter
                  href={item.url}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  {<i className={item.className} />}
                </LinkFooter>
              </SocialNavItem>
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
