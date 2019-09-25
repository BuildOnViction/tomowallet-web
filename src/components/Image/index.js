/**
 *
 * TomoWallet - Image Component
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
// Styles
import noIconSrc from '../../assets/images/no-photo.svg';
// ===================

// ===== MAIN COMPONENT =====
class CustomImage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      isErrorHandled: false,
    };

    this.handleLoadImage = this.handleLoadImage.bind(this);
    this.handleLoadImageFailed = this.handleLoadImageFailed.bind(this);
  }

  handleLoadImage() {
    this.setState({
      isLoaded: true,
    });
  }

  handleLoadImageFailed() {
    const { isErrorHandled } = this.state;
    if (!isErrorHandled) {
      this.setState({
        isLoaded: false,
      });
    }
  }

  render() {
    const { alt, defaultSrc, src } = this.props;
    const { isLoaded } = this.state;

    return (
      <Fragment>
        {!isLoaded && <img src={defaultSrc} alt={alt} />}
        <img
          src={src}
          alt={alt}
          onLoad={this.handleLoadImage}
          onError={this.handleLoadImageFailed}
          style={{ display: isLoaded ? 'block' : 'none' }}
        />
      </Fragment>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
CustomImage.propTypes = {
  /** Default image source in case main image is not found */
  defaultSrc: PropTypes.string,
  /** Image source */
  src: PropTypes.string,
  /** Image alternative text */
  alt: PropTypes.string,
};

CustomImage.defaultProps = {
  defaultSrc: noIconSrc,
  src: '',
  alt: 'No image found!',
};
// ======================

export default CustomImage;
