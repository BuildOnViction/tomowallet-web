// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { get as _get } from 'lodash';
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Row,
  Col,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Custom Components
import { ButtonStyler } from '../../../styles';
import { FORM_STATES } from '../constants';

// ===== MAIN COMPONENT =====
class PhraseGenerator extends PureComponent {
  constructor(props) {
    super(props);

    this.handleRedirect = this.handleRedirect.bind(this);
  }

  componentDidMount() {
    const { generateMnemonic } = this.props;
    generateMnemonic();
  }

  handleRedirect(newRoute) {
    const { history } = this.props;
    history.push(newRoute);
  }

  render() {
    const { mnemonic, updateFormState, toggleConfirmationPopup } = this.props;
    return (
      <Card className='phrase-generator-content p-4'>
        <CardBody className='text-center'>
          <CardTitle className='mb-2'>Please back up recovery phrase</CardTitle>
          <CardText className='mb-5'>
            Backup the text below on paper and keep it somewhere secret and save
          </CardText>
          <Container fluid className='p-0 mb-4 text-left phrase-box'>
            <Row noGutters>
              {_get(mnemonic, 'origin', []).map((word, wordIdx) => (
                <Col
                  key={`word_${wordIdx + 1}`}
                  xs={4}
                  sm={4}
                  md={4}
                  lg={4}
                  className='p-4'
                >
                  {`${wordIdx + 1}. `}
                  <b>{word}</b>
                </Col>
              ))}
            </Row>
          </Container>
          <Container fluid className='p-0'>
            <Row noGutters>
              <Col xs={2} sm={2} md={2} lg={2} className='pr-2'>
                <ButtonStyler
                  outline
                  onClick={() => updateFormState(FORM_STATES.WARNING)}
                  className='full-width'
                >
                  Back
                </ButtonStyler>
              </Col>
              <Col xs={9} sm={9} md={9} lg={9} className='px-2'>
                <ButtonStyler onClick={() => toggleConfirmationPopup(true)}>
                  I wrote down my recovery phrase
                </ButtonStyler>
              </Col>
              <Col xs={1} sm={1} md={1} lg={1} className='pl-2 text-right'>
                <FontAwesomeIcon icon={['far', 'save']} />
              </Col>
            </Row>
          </Container>
        </CardBody>
      </Card>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
PhraseGenerator.propTypes = {
  mnemonic: PropTypes.object,
  updateFormState: PropTypes.func,
  toggleConfirmationPopup: PropTypes.func,
};
// ======================

export default PhraseGenerator;
