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
import { get as _get } from 'lodash';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
  Nav,
  NavItem,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Custom Component
import { ButtonStyler, NoticeTextRed } from '../../../../styles';
// Utilities
import { withIntl } from '../../../../components/IntlProvider';
import { shuffleArray } from '../../../../utils';
import { MSG } from '../../../../constants';
import { FORM_STATES } from '../constants';
// ===================

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
          <CardTitle>{formatMessage(MSG.VERIFICATION_TITLE)}</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>{formatMessage(MSG.VERIFICATION_DESCRIPTION)}</CardText>
        </CardBody>
        <div className='my-3'>
          <Nav>
            {errors.map((error, errorIdx) => (
              <NavItem key={`error_${errorIdx + 1}`}>
                <NoticeTextRed
                  key={`error_${errorIdx + 1}`}
                >{`* ${error}`}</NoticeTextRed>
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
                  key={`word_${index + 1}`}
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
            {shuffledMnemonic.map((word, wordIdx) => (
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
                  onClick={() => addWord(word)}
                  disabled={_get(mnemonic, 'compare', []).includes(word)}
                >
                  {word}
                </ButtonStyler>
              </Col>
            ))}
          </Row>
        </Container>
        <CardFooter>
          <Container fluid className='px-0'>
            <Row noGutters>
              <Col xs={6} sm={6} md={6} lg={6} className='pr-2'>
                <ButtonStyler
                  onClick={() => setFormState(FORM_STATES.RECOVERY_PHRASE)}
                >
                  {formatMessage(MSG.COMMON_BUTTON_BACK)}
                </ButtonStyler>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6} className='pl-2'>
                <ButtonStyler
                  onClick={verifyMnemonic}
                  disabled={_get(mnemonic, 'compare', []).length !== wordNumber}
                >
                  {formatMessage(MSG.VERIFICATION_BUTTON_VERIFY)}
                </ButtonStyler>
              </Col>
            </Row>
          </Container>
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
