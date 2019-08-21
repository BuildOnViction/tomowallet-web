/**
 *
 * TomoWallet - Recovery Phrase Box
 *
 * This component distribute a list of mnemonic words into a container box
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash.get';
import { Col } from 'reactstrap';
// Custom Component
import { MnemonicBoxStyler } from './style';
// ===================

// ===== MAIN COMPONENT =====
class MnemonicBox extends PureComponent {
  constructor(props) {
    super(props);

    this.WORD_NUMBER = 12;

    this.handleConvertMnemonic = this.handleConvertMnemonic.bind(this);
  }

  handleConvertMnemonic() {
    const { mnemonic } = this.props;
    return Array.isArray(mnemonic) ? mnemonic : mnemonic.split(' ');
  }

  render() {
    const { className, getCellProps, WordCell } = this.props;
    const wordList = this.handleConvertMnemonic();
    return (
      <MnemonicBoxStyler
        noGutters
        className={`bordered${className ? ` ${className}` : ''}`}
      >
        {Array(this.WORD_NUMBER)
          .fill(null)
          .map((_, wordIdx) => (
            <Col
              key={`word_${wordIdx + 1}`}
              xs={6}
              sm={6}
              md={4}
              lg={4}
              className='p-4'
            >
              {`${wordIdx + 1}. `}
              {(WordCell && <WordCell wordIdx={wordIdx} {...getCellProps} />) ||
                (!WordCell && _get(wordList, [wordIdx], ''))}
            </Col>
          ))}
      </MnemonicBoxStyler>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
MnemonicBox.propTypes = {
  /** Component's class */
  className: PropTypes.string,
  /** Custom cell component's props */
  getCellProps: PropTypes.object,
  /** A string or an array of mnemonic words */
  mnemonic: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  /** Custom component for each word's cell */
  WordCell: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

MnemonicBox.defaultProps = {
  className: '',
  getCellProps: {},
  mnemonic: '',
};
// ======================

export default MnemonicBox;
