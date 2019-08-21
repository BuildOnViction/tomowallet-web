/**
 *
 * TomoWallet - Wallet Creation Page - Mnemonic Verification
 *
 * This component defines a form with shuffled words to verify
 * whether user has remembered/noted down the recovery phrase
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import _get from 'lodash.get';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardFooter,
  Nav,
  NavItem,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Custom Component
import {
  ButtonStyler,
  NoticeTextRed,
  HeadingLarge,
  ButtonLineStyler,
} from '../../../styles';
// Utilities
import { withIntl } from '../../../components/IntlProvider';
import { shuffleArray } from '../../../utils';
import { MSG } from '../../../constants';
import { FORM_STATES } from '../constants';
import MnemonicBox from '../../../components/MnemonicBox';
// ===================

// ===== SUB-COMPONENTS =====
const WordCell = ({ removeWord, wordList, wordIdx }) =>
  _get(wordList, [wordIdx], '') && (
    <div
      role='presentation'
      onClick={() => removeWord(wordIdx)}
      className='d-inline-block phrase-word'
    >
      <span className='pr-1'>{_get(wordList, [wordIdx], '')}</span>
      <FontAwesomeIcon icon='times-circle' />
    </div>
  );
// ==========================

// ===== MAIN COMPONENT =====
class Verification extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      shuffledMnemonic: [],
      wordNumber: 12,
    };

    this.handleShuffleMnemonic = this.handleShuffleMnemonic.bind(this);
  }

  componentDidMount() {
    this.handleShuffleMnemonic();
  }

  componentWillUnmount() {
    const { clearComparison, updateErrors } = this.props;
    updateErrors([]);
    clearComparison();
  }

  handleShuffleMnemonic() {
    const { mnemonic } = this.props;
    this.setState({
      shuffledMnemonic: shuffleArray(_get(mnemonic, 'origin', '').split(' ')),
    });
  }

  render() {
    const {
      addWord,
      errors,
      intl: { formatMessage },
      mnemonic,
      removeWord,
      setFormState,
      verifyMnemonic,
    } = this.props;
    const { shuffledMnemonic, wordNumber } = this.state;
    return (
      <Card>
        <CardHeader>
          <HeadingLarge>{formatMessage(MSG.VERIFICATION_TITLE)}</HeadingLarge>
          <CardText>{formatMessage(MSG.VERIFICATION_DESCRIPTION)}</CardText>
        </CardHeader>
        <CardBody>
          <Nav>
            {errors.map((error, errorIdx) => (
              <NavItem key={`error_${errorIdx + 1}`}>
                <NoticeTextRed
                  key={`error_${errorIdx + 1}`}
                >{`* ${error}`}</NoticeTextRed>
              </NavItem>
            ))}
          </Nav>
          <MnemonicBox
            getCellProps={{
              wordList: _get(mnemonic, 'compare', []),
              removeWord,
            }}
            mnemonic={_get(mnemonic, 'compare', [])}
            WordCell={WordCell}
          />
          <Row className='mt-4'>
            {shuffledMnemonic.map((word, wordIdx) => (
              <Col
                key={`word_button_${wordIdx + 1}`}
                xs={6}
                md={4}
                className='py-2'
              >
                <ButtonLineStyler
                  onClick={() => addWord(word)}
                  disabled={_get(mnemonic, 'compare', []).includes(word)}
                >
                  {word}
                </ButtonLineStyler>
              </Col>
            ))}
          </Row>
        </CardBody>
        <CardFooter>
          <Row>
            <Col size={6}>
              <ButtonStyler
                onClick={() => setFormState(FORM_STATES.RECOVERY_PHRASE)}
              >
                {formatMessage(MSG.COMMON_BUTTON_BACK)}
              </ButtonStyler>
            </Col>
            <Col size={6}>
              <ButtonStyler
                btnYellow
                onClick={verifyMnemonic}
                disabled={_get(mnemonic, 'compare', []).length !== wordNumber}
              >
                {formatMessage(MSG.VERIFICATION_BUTTON_VERIFY)}
              </ButtonStyler>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
Verification.propTypes = {
  /** Action to concatenate word into comparison mnemonic array */
  addWord: PropTypes.func,
  /** Action to clear comparison mnemonic array empty */
  clearComparison: PropTypes.func,
  /** List of error messages */
  errors: PropTypes.arrayOf(PropTypes.string),
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Mnemonic data set */
  mnemonic: PropTypes.object,
  /** Action to remove a specific word from comparison mnemonic array */
  removeWord: PropTypes.func,
  /** Action to update wallet creation form state */
  setFormState: PropTypes.func,
  /** Action to update error messages */
  updateErrors: PropTypes.func,
  /** Action to verify comparison mnemonic array */
  verifyMnemonic: PropTypes.func,
};

Verification.defaultProps = {
  addWord: () => {},
  clearComparison: () => {},
  errors: [],
  intl: {},
  mnemonic: {},
  removeWord: () => {},
  setFormState: () => {},
  updateErrors: () => {},
  verifyMnemonic: () => {},
};
// ======================

export default compose(withIntl)(Verification);
