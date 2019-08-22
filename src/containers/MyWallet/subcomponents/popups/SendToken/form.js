/**
 *
 * TomoWallet - My Wallet Page - Send Token Popup - Form
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash.get';
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
// Constants & Styles
import { SEND_TOKEN_FIELDS, PORTFOLIO_COLUMNS } from '../../../constants';
import { MSG } from '../../../../../constants';
// ===================

// ===== SUB-COMPONENTS =====
const TokenOption = props => {
  const { innerProps, data } = props;

  return (
    <Container {...innerProps} role='presentation' fluid className='px-0'>
      <Row noGutters className='select_option align-items-center'>
        <Col xs={8} className='d-flex align-items-center'>
          <img
            src={_get(data, [PORTFOLIO_COLUMNS.ICON], '')}
            alt={_get(data, [PORTFOLIO_COLUMNS.TOKEN_NAME], '')}
          />
          <span>{`${_get(data, [PORTFOLIO_COLUMNS.TOKEN_NAME], '')} (${_get(
            data,
            [PORTFOLIO_COLUMNS.PUBLISHER],
            '',
          )})`}</span>
        </Col>
        <Col xs={4} className='text-right'>
          {`${_get(
            data,
            [PORTFOLIO_COLUMNS.BALANCE],
            0,
          ).toLocaleString()} ${_get(data, [PORTFOLIO_COLUMNS.SYMBOL], '')}`}
        </Col>
      </Row>
    </Container>
  );
};

const TokenInputValue = props => {
  const { data } = props;

  return (
    <div style={{ width: '96%' }}>
      <Row noGutters className='select_option_active align-items-center'>
        <Col xs={8} className='d-flex align-items-center'>
          <img
            src={_get(data, [PORTFOLIO_COLUMNS.ICON], '')}
            alt={_get(data, [PORTFOLIO_COLUMNS.TOKEN_NAME], '')}
          />
          <span>{`${_get(data, [PORTFOLIO_COLUMNS.TOKEN_NAME], '')} (${_get(
            data,
            [PORTFOLIO_COLUMNS.PUBLISHER],
            '',
          )})`}</span>
        </Col>
        <Col xs={4} className='text-right'>
          {`${_get(
            data,
            [PORTFOLIO_COLUMNS.BALANCE],
            0,
          ).toLocaleString()} ${_get(data, [PORTFOLIO_COLUMNS.SYMBOL], '')}`}
        </Col>
      </Row>
    </div>
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

    return (
      <Form onSubmit={submitForm} className='cm_form'>
        <FormGroup>
          <Label>
            {formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_TOKEN_LABEL)}
          </Label>
          <Select
            className='box_select'
            name={SEND_TOKEN_FIELDS.TOKEN}
            value={_get(formValues, [SEND_TOKEN_FIELDS.TOKEN], '')}
            options={tokenOptions}
            // Placeholder={() => <div className='text-danger'>{formatMessage(
            //   MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_TOKEN_PLACEHOLDER,
            // )}</div>}
            onChange={value => updateInput(SEND_TOKEN_FIELDS.TOKEN, value)}
            components={{
              Option: TokenOption,
              SingleValue: TokenInputValue,
              Placeholder: () => (
                <div className='text-placeholder'>
                  {' '}
                  {formatMessage(
                    MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_TOKEN_PLACEHOLDER,
                  )}
                </div>
              ),
              IndicatorSeparator: () => '',
            }}
            isDisabled={_get(formValues, 'isTokenSpecific')}
            menuIsOpens
            classNamePrefix='my-select'
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
              max={12}
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
        {/* <FormGroup>
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
        </FormGroup> */}
        <Label>
          {`${formatMessage(
            MSG.MY_WALLET_POPUP_SEND_TOKEN_INFO_TRANSACTION_FEE_LABEL,
          )}: ${_get(
            formValues,
            [SEND_TOKEN_FIELDS.TOKEN, PORTFOLIO_COLUMNS.TRANSACTION_FEE],
            0,
          )} TOMO`}
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
