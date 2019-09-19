/**
 *
 * TomoWallet - Welcome Page - Fresh Login Form
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CardImg, Col, Row } from 'reactstrap';
// Custom Components
import { BigButtonStyler, BoxBtnStyler, HeadingBig } from '../../../styles';
// Utilities & Constants
import { withIntl } from '../../../components/IntlProvider';
import { MSG, ROUTE } from '../../../constants';
import imgvisual_login from '../../../assets/images/img-visual-login.png';
// ===================

// ===== MAIN COMPONENT =====
class FreshLoginSection extends PureComponent {
  render() {
    const {
      intl: { formatMessage },
      redirectTo,
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
                onClick={() => redirectTo(ROUTE.IMPORT_WALLET)}
              >
                {formatMessage(MSG.WELCOME_BUTTON_IMPORT_WALLET)}
              </BigButtonStyler>
            </div>
            <div className='m-3'>
              {formatMessage(MSG.WELCOME_TEXT_BETWEEN_BUTTONS)}
            </div>
            <div>
              <BigButtonStyler onClick={() => redirectTo(ROUTE.CREATE_WALLET)}>
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
FreshLoginSection.propTypes = {
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to redirect to different login screens */
  redirectTo: PropTypes.func,
};

FreshLoginSection.defaultProps = {
  intl: {},
  redirectTo: () => {},
};
// ======================

export default withIntl(FreshLoginSection);
