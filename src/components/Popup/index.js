/**
 *
 * Common Component - Pop-up
 *
 */
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { get as _get } from 'lodash';
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Col,
} from 'reactstrap';
// Custom Components
// -- TO-DO: Update style for Popup in the following styled component:
import ModalStyles from './style';
import { ButtonStyler } from '../../styles';

// ===== MAIN COMPONENT =====
class Popup extends PureComponent {
  render() {
    const {
      backdrop,
      button,
      className,
      Content,
      Footer,
      getContentProps,
      getFooterProps,
      isOpen,
      noHeader,
      title,
      toggle,
    } = this.props;

    return (
      <ModalStyles
        backdrop={backdrop}
        className={className}
        isOpen={isOpen}
        title={title}
        toggle={toggle}
      >
        {!noHeader && <ModalHeader toggle={toggle}>{title}</ModalHeader>}
        <ModalBody>
          <Content {...getContentProps} />
        </ModalBody>
        <ModalFooter>
          {Footer ? (
            <Footer {...getFooterProps} />
          ) : (
            (_get(button, 'primary') || _get(button, 'secondary')) && (
              <Container fluid className='px-0'>
                <Row>
                  {_get(button, 'secondary') && (
                    <Col
                      xs={_get(button, 'primary') ? 6 : 12}
                      sm={_get(button, 'primary') ? 6 : 12}
                      md={_get(button, 'primary') ? { size: 5, offset: 1 } : 12}
                      lg={_get(button, 'primary') ? { size: 4, offset: 2 } : 12}
                      className={`popup-btn--secondary${
                        _get(button, 'primary') ? ' text-right pr-3' : ''
                      }`}
                    >
                      <ButtonStyler
                        outline
                        onClick={_get(button, 'secondary.action', () => {})}
                        disabled={_get(button, 'secondary.disabled')}
                      >
                        {_get(button, 'secondary.label', '')}
                      </ButtonStyler>
                    </Col>
                  )}
                  {_get(button, 'primary') && (
                    <Col
                      xs={_get(button, 'secondary') ? 6 : 12}
                      sm={_get(button, 'secondary') ? 6 : 12}
                      md={_get(button, 'secondary') ? 5 : 12}
                      lg={_get(button, 'secondary') ? 4 : 12}
                      className={`popup-btn--primary${
                        _get(button, 'secondary') ? ' pl-3' : ''
                      }`}
                    >
                      <ButtonStyler
                        onClick={_get(button, 'primary.action', () => {})}
                        disabled={_get(button, 'primary.disabled')}
                      >
                        {_get(button, 'primary.label', '')}
                      </ButtonStyler>
                    </Col>
                  )}
                </Row>
              </Container>
            )
          )}
        </ModalFooter>
      </ModalStyles>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
Popup.propTypes = {
  /**
   * Types of backdrop:
   * - true: Backdrop exists, and can close pop-up when clicking on it.
   * - false: No backdrop.
   * - "static": Backdrop exists, but can do nothing when clicking on it.
   */
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['static'])]),
  /** Pop-up's footer button configurations */
  button: PropTypes.shape({
    primary: PropTypes.object,
    secondary: PropTypes.object,
  }),
  /** Pop-up custom class */
  className: PropTypes.string,
  /** Pop-up body component */
  Content: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /** Pop-up customized footer component */
  Footer: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /** Body component's props */
  getContentProps: PropTypes.object,
  /** Customized footer component's props */
  getFooterProps: PropTypes.object,
  /** Condition flag to show/hide pop-up */
  isOpen: PropTypes.bool,
  /** Condition flag to show/hide pop-up header */
  noHeader: PropTypes.bool,
  /** Pop-up title */
  title: PropTypes.string,
  /** Action to show/hide pop-up */
  toggle: PropTypes.func,
};

Popup.defaultProps = {
  backdrop: 'static',
  button: {
    primary: {
      label: 'OK',
    },
  },
  className: '',
  Content: () => null,
  getContentProps: {},
  isOpen: false,
  noHeader: false,
  title: '',
  toggle: () => {},
};
// ======================

export default Popup;
