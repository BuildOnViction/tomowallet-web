/**
 *
 * TomoWallet - My Wallet Page - Send Token Popup - Form
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { get as _get } from 'lodash';
import {
  Form,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  Button,
  Container,
  Row,
  Col,
  FormFeedback,
  Nav,
  NavItem,
} from 'reactstrap';
import Select from 'react-select';
// Constants
import { SEND_TOKEN_FIELDS, PORFOLIO_COLUMNS } from '../../../constants';
import { MSG } from '../../../../../../constants';
// ===================

// ===== SUB-COMPONENTS =====
const TokenOption = props => {
  console.warn('TokenOption', props);
  const { innerProps, data } = props;

  return (
    <Container {...innerProps} role='presentation' fluid className='px-0'>
      <Row noGutters>
        <Col xs={6} sm={6} md={6} lg={6}>
          {/* -- TO-DO: Add token's image source */}
          <img src='' alt={data.tokenName} />
          <span>{`${data.tokenName} (${data.publisher})`}</span>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} className='text-right'>
          {`${data.balance} ${data.tokenName}`}
        </Col>
      </Row>
    </Container>
  );
};

const TokenInputValue = props => {
  console.warn('TokenInputValue', props);
  const { data } = props;

  return (
    <Container className='px-0' style={{ width: '95%' }}>
      <Row noGutters>
        <Col xs={7} sm={7} md={7} lg={7}>
          {/* -- TO-DO: Add token's image source */}
          <img src='' alt={data.tokenName} />
          <span>{`${data.tokenName} (${data.publisher})`}</span>
        </Col>
        <Col xs={5} sm={5} md={5} lg={5} className='text-right'>
          {`${data.balance} ${data.tokenName}`}
        </Col>
      </Row>
    </Container>
  );
};
// ==========================

// ===== MAIN COMPONENT =====
class FormContent extends PureComponent {
  constructor(props) {
    super(props);

    this.handleMarkFieldInvalid = this.handleMarkFieldInvalid.bind(this);
    this.handleRenderErrorList = this.handleRenderErrorList.bind(this);
  }

  handleMarkFieldInvalid(field) {
    const { errors } = this.props;
    return Object.keys(errors).includes(field);
  }

  handleRenderErrorList(field) {
    const { errors } = this.props;
    return (
      <FormFeedback>
        <Nav>
          {_get(errors, [field], []).map((err, errIdx) => (
            <NavItem
              key={`error_${field}_${errIdx + 1}`}
              className='text-danger'
            >
              {`* ${err}`}
            </NavItem>
          ))}
        </Nav>
      </FormFeedback>
    );
  }

  render() {
    const {
      addFullAmount,
      formatMessage,
      formValues,
      submitForm,
      tokenOptions,
      updateInput,
    } = this.props;
    console.warn(
      'render',
      _get(formValues, [SEND_TOKEN_FIELDS.TRANSACTION_FEE], 0),
    );

    return (
      <Form onSubmit={submitForm}>
        <FormGroup>
          <Label>
            {formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_TOKEN_LABEL)}
          </Label>
          <Select
            name={SEND_TOKEN_FIELDS.TOKEN}
            value={_get(formValues, [SEND_TOKEN_FIELDS.TOKEN], '')}
            options={tokenOptions}
            placeholder={formatMessage(
              MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_TOKEN_PLACEHOLDER,
            )}
            onChange={value => updateInput(SEND_TOKEN_FIELDS.TOKEN, value)}
            components={{ Option: TokenOption, SingleValue: TokenInputValue }}
            isDisabled={_get(formValues, 'isTokenSpecific')}
          />
          {this.handleRenderErrorList(SEND_TOKEN_FIELDS.TOKEN)}
        </FormGroup>
        <FormGroup>
          <Label>
            {formatMessage(
              MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_RECIPIENT_LABEL,
            )}
          </Label>
          <Input
            name={SEND_TOKEN_FIELDS.RECIPIENT}
            value={_get(formValues, [SEND_TOKEN_FIELDS.RECIPIENT], '')}
            placeholder={formatMessage(
              MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_RECIPIENT_PLACEHOLDER,
            )}
            onChange={e =>
              updateInput(SEND_TOKEN_FIELDS.RECIPIENT, e.target.value)
            }
            invalid={this.handleMarkFieldInvalid(SEND_TOKEN_FIELDS.RECIPIENT)}
          />
          {this.handleRenderErrorList(SEND_TOKEN_FIELDS.RECIPIENT)}
        </FormGroup>
        <FormGroup>
          <Label>
            {formatMessage(
              MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_TRANSFER_AMOUNT_LABEL,
            )}
          </Label>
          <InputGroup>
            <Input
              type='number'
              name={SEND_TOKEN_FIELDS.TRANSFER_AMOUNT}
              value={_get(formValues, [SEND_TOKEN_FIELDS.TRANSFER_AMOUNT], '')}
              placeholder={formatMessage(
                MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_TRANSFER_AMOUNT_PLACEHOLDER,
              )}
              onChange={e =>
                updateInput(SEND_TOKEN_FIELDS.TRANSFER_AMOUNT, e.target.value)
              }
              invalid={this.handleMarkFieldInvalid(
                SEND_TOKEN_FIELDS.TRANSFER_AMOUNT,
              )}
            />
            <InputGroupAddon addonType='append'>
              <Button onClick={addFullAmount}>
                {formatMessage(MSG.COMMON_BUTTON_MAXIMUM)}
              </Button>
            </InputGroupAddon>
            {this.handleRenderErrorList(SEND_TOKEN_FIELDS.TRANSFER_AMOUNT)}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label>
            {formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_MESSAGE_LABEL)}
          </Label>
          <Input
            type='textarea'
            name={SEND_TOKEN_FIELDS.MESSAGE}
            value={_get(formValues, [SEND_TOKEN_FIELDS.MESSAGE], '')}
            placeholder={formatMessage(
              MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_MESSAGE_PLACEHOLDER,
            )}
            onChange={e =>
              updateInput(SEND_TOKEN_FIELDS.MESSAGE, e.target.value)
            }
            invalid={this.handleMarkFieldInvalid(SEND_TOKEN_FIELDS.MESSAGE)}
          />
          {this.handleRenderErrorList(SEND_TOKEN_FIELDS.MESSAGE)}
        </FormGroup>
        <Label>
          {`${formatMessage(
            MSG.MY_WALLET_POPUP_SEND_TOKEN_INFO_TRANSACTION_FEE_LABEL,
          )}: ${_get(
            formValues,
            [SEND_TOKEN_FIELDS.TOKEN, PORFOLIO_COLUMNS.TRANSACTION_FEE],
            0,
          )} ${_get(
            formValues,
            [SEND_TOKEN_FIELDS.TOKEN, PORFOLIO_COLUMNS.TOKEN_NAME],
            '',
          )}`}
        </Label>
      </Form>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
FormContent.propTypes = {
  /** Action to input full amount of chosen token for submit */
  addFullAmount: PropTypes.func,
  /** Form's error object */
  errors: PropTypes.object,
  /** React Intl's API to get message as string */
  formatMessage: PropTypes.func,
  /** Form values object */
  formValues: PropTypes.object,
  /** Action to submit send token's form */
  submitForm: PropTypes.func,
  /** List of token options */
  tokenOptions: PropTypes.arrayOf(PropTypes.object),
  /** Action to hande input change */
  updateInput: PropTypes.func,
};

FormContent.defaultProps = {
  addFullAmount: () => {},
  formatMessage: () => {},
  formValues: {},
  submitForm: () => {},
  tokenOptions: [],
  updateInput: () => {},
};
// ======================

export default FormContent;
