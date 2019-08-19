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
      centered,
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
        centered={centered}
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
              <Container className='px-0'>
                <Row>
                  {_get(button, 'secondary') && (
                    <Col size={6}>
                      <ButtonStyler
                        outline
                        onClick={_get(button, 'secondary.action', () => {})}
                        disabled={_get(button, 'secondary.disabled')}
                        {..._get(button, 'secondary')}
                      >
                        {_get(button, 'secondary.label', '')}
                      </ButtonStyler>
                    </Col>
                  )}
                  {_get(button, 'primary') && (
                    <Col size={6}>
                      <ButtonStyler
                        onClick={_get(button, 'primary.action', () => {})}
                        disabled={_get(button, 'primary.disabled')}
                        {..._get(button, 'primary')}
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
  // if modal should be centered vertically in viewport
  centered: PropTypes.bool,
  /** Pop-up custom class */
  onClosed: PropTypes.func,
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
  centered: true,
  isOpen: false,
  noHeader: false,
  title: '',
  toggle: () => {},
};
// ======================

export default Popup;
