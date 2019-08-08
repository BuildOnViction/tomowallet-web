/**
 *
 * Recovery Phrase - Mnemonic Verification Pop-up
 *
 */
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { get as _get, isEqual as _isEqual } from 'lodash';
import {
  CardBody,
  CardText,
  Container,
  Row,
  Col,
  Nav,
  NavItem,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Custom Components
import { VerificationPopupStyler } from '../style';
// Utilities
import { shuffleArray } from '../../../utils';
import { ButtonStyler, NoticeTextRed } from '../../../styles';

// ===== SUB-COMPONENTS =====
const VerificationContent = ({
  wordNumber,
  words = [],
  mnemonic,
  addWord,
  removeWord,
}) => (
  <CardBody>
    <CardText className='mt-3'>
      Verify your Recovery Phrase. Choose each word in the correct order
    </CardText>
    <div className='my-3'>
      <Nav>
        {_get(mnemonic, 'errors', []).map((error, errorIdx) => (
          <NavItem>
            <NoticeTextRed key={`error_${errorIdx + 1}`}>
              {`* ${error}`}
            </NoticeTextRed>
          </NavItem>
        ))}
      </Nav>
    </div>
    <Container fluid className='mb-3 px-0 py-2 phrase-box'>
      <Row noGutters>
        {Array(wordNumber)
          .fill(null)
          .map((_, index) => (
            <Col
              key={`phrase_word_${index + 1}`}
              xs={6}
              sm={6}
              md={6}
              lg={6}
              className='px-4 py-2'
            >
              {`${index + 1}. `}
              {_get(mnemonic, ['compare', index], '') && (
                <div
                  role='presentation'
                  onClick={() => removeWord(index)}
                  className='d-inline-block phrase-word'
                >
                  <b>{_get(mnemonic, ['compare', index], '')}</b>
                  <FontAwesomeIcon icon='times-circle' />
                </div>
              )}
            </Col>
          ))}
      </Row>
    </Container>
    <Container fluid className='p-0'>
      <Row>
        {words.map((word, wordIdx) => (
          <Col
            key={`word_button_${wordIdx + 1}`}
            xs={6}
            sm={6}
            md={4}
            lg={3}
            className='py-2'
          >
            <ButtonStyler
              outline
              key={`word_${wordIdx + 1}`}
              onClick={() => addWord(word)}
              disabled={_get(mnemonic, 'compare', []).includes(word)}
            >
              {word}
            </ButtonStyler>
          </Col>
        ))}
      </Row>
    </Container>
  </CardBody>
);
// ==========================

// ===== MAIN COMPONENT =====
class VerificationPopup extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      wordNumber: 12,
      wordList: [],
    };

    this.handleAddWord = this.handleAddWord.bind(this);
    this.handleRemoveWord = this.handleRemoveWord.bind(this);
    this.handleClosePopup = this.handleClosePopup.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { mnemonic } = this.props;
    if (!_isEqual(_get(prevProps, 'mnemonic.origin'), _get(mnemonic, 'origin')))
      this.setState({
        wordList: shuffleArray(_get(mnemonic, 'origin', [])),
      });
  }

  handleAddWord(word) {
    const { addWord } = this.props;
    addWord(word);
  }

  handleRemoveWord(index) {
    const { removeWord } = this.props;
    removeWord(index);
  }

  handleClosePopup() {
    const { hidePopup, resetVerificationForm, mnemonic } = this.props;
    new Promise(resolve => {
      hidePopup();
      resolve();
    }).then(() => {
      resetVerificationForm();
      this.setState({
        wordList: shuffleArray(_get(mnemonic, 'origin', [])),
      });
    });
  }

  render() {
    const { isOpen, mnemonic, verifyMnemonic } = this.props;
    const { wordNumber, wordList } = this.state;

    return (
      <VerificationPopupStyler
        backdrop='static'
        isOpen={isOpen}
        toggle={this.handleClosePopup}
        title='Verification'
        Content={VerificationContent}
        getContentProps={{
          wordNumber,
          words: wordList,
          mnemonic,
          addWord: this.handleAddWord,
          removeWord: this.handleRemoveWord,
        }}
        button={{
          primary: {
            label: 'Verify',
            action: verifyMnemonic,
            disabled:
              _get(mnemonic, 'compare', []).length <
              _get(mnemonic, 'origin', []).length,
          },
        }}
      />
    );
  }
}
// ==========================

// ===== PROP TYPES =====
VerificationPopup.propTypes = {
  isOpen: PropTypes.bool,
  handleExecution: PropTypes.func,
  hidePopup: PropTypes.func,
  mnemonic: PropTypes.shape({
    origin: PropTypes.arrayOf(PropTypes.string),
    compare: PropTypes.arrayOf(PropTypes.string),
  }),
  resetVerificationForm: PropTypes.func,
  verifyMnemonic: PropTypes.func,
};

VerificationPopup.defaultProps = {
  isOpen: false,
  handleExecution: () => {},
  hidePopup: () => {},
  mnemonic: {
    origin: [],
    compare: [],
  },
  resetVerificationForm: () => {},
  verifyMnemonic: () => {},
};
// ======================

export default VerificationPopup;
