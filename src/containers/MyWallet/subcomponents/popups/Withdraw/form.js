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
import Select, { components } from 'react-select';
// Custom Components
import Image from '../../../../../components/Image';
// Utilities & Constants
import { convertLocaleNumber } from '../../../../../utils';
import { WITHDRAW_PRIVACY_FIELDS, PORTFOLIO_COLUMNS } from '../../../constants';
import { MSG } from '../../../../../constants';
import { bnToDecimals } from '../../../../../utils';
import { StyledFormGroup, HeadingMediumCenter } from '../../../../../styles';
// ===================

// ===== SUB-COMPONENTS =====
const TokenOption = props => {
  const { innerProps, data } = props;
  const rawBalance = _get(data, [PORTFOLIO_COLUMNS.BALANCE], 0);
  const decimals = _get(data, [PORTFOLIO_COLUMNS.DECIMALS], 0);
  const normalBalance = parseFloat(bnToDecimals(rawBalance, decimals));

  return (
    <Container {...innerProps} role='presentation' fluid className='px-0'>
      <Row noGutters className='select_option align-items-center'>
        <Col xs={6} className='d-flex align-items-center text-ellipsis'>
          <Image
            src={_get(data, [PORTFOLIO_COLUMNS.ICON], '')}
            alt={_get(data, [PORTFOLIO_COLUMNS.TOKEN_NAME], '')}
          />
          <span>{`${_get(data, [PORTFOLIO_COLUMNS.TOKEN_NAME], '')} (${_get(
            data,
            [PORTFOLIO_COLUMNS.PUBLISHER],
            '',
          )})`}</span>
        </Col>
        <Col xs={6} className='text-right text-ellipsis'>
          {`${convertLocaleNumber(normalBalance)} ${_get(
            data,
            [PORTFOLIO_COLUMNS.SYMBOL],
            '',
          )}`}
        </Col>
      </Row>
    </Container>
  );
};

const TokenInputValue = props => {
  const { data } = props;
  const rawBalance = _get(data, [PORTFOLIO_COLUMNS.BALANCE], 0);
  const decimals = _get(data, [PORTFOLIO_COLUMNS.DECIMALS], 0);
  const normalBalance = parseFloat(bnToDecimals(rawBalance, decimals));

  return (
    <div style={{ width: '96%' }}>
      <Row noGutters className='select_option_active align-items-center'>
        <Col xs={6} className='d-flex align-items-center text-ellipsis'>
          <Image
            src={_get(data, [PORTFOLIO_COLUMNS.ICON], '')}
            alt={_get(data, [PORTFOLIO_COLUMNS.TOKEN_NAME], '')}
          />
          <span>{`${_get(data, [PORTFOLIO_COLUMNS.TOKEN_NAME], '')} (${_get(
            data,
            [PORTFOLIO_COLUMNS.PUBLISHER],
            '',
          )})`}</span>
        </Col>
        <Col xs={6} className='text-right text-ellipsis'>
          {`${convertLocaleNumber(normalBalance)} ${_get(
            data,
            [PORTFOLIO_COLUMNS.SYMBOL],
            '',
          )}`}
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
      <FormFeedback className='d-block'>
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
      privacyMode,
      privacyData,
    } = this.props;

    return (
      <Form onSubmit={submitForm} className='cm_form'>
        <StyledFormGroup>
          <HeadingMediumCenter>
            {
              formatMessage(MSG.MY_WALLET_POPUP_WITHDRAW_PRIVACY_DESCRIPTION)
            }
          </HeadingMediumCenter>
          <Label>
            {formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_TOKEN_LABEL)}
          </Label>
          <Select
            className='box_select'
            name={WITHDRAW_PRIVACY_FIELDS.TOKEN}
            value={_get(formValues, [WITHDRAW_PRIVACY_FIELDS.TOKEN], '')}
            options={privacyMode ? privacyData : tokenOptions}
            onChange={value => updateInput(WITHDRAW_PRIVACY_FIELDS.TOKEN, value)}
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
              DropdownIndicator:
                !_get(formValues, 'isTokenSpecific') &&
                components.DropdownIndicator,
            }}
            isDisabled={_get(formValues, 'isTokenSpecific')}
            menuIsOpens
            classNamePrefix='my-select'
          />
          {this.handleRenderErrorList(WITHDRAW_PRIVACY_FIELDS.TOKEN)}
        </StyledFormGroup>
        <StyledFormGroup>
          <Label>
            {formatMessage(
              MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_TRANSFER_AMOUNT_LABEL,
            )}
          </Label>
          <InputGroup>
            <Input
              type='number'
              name={WITHDRAW_PRIVACY_FIELDS.TRANSFER_AMOUNT}
              value={_get(formValues, [WITHDRAW_PRIVACY_FIELDS.TRANSFER_AMOUNT], '')}
              max={_get(
                formValues,
                [WITHDRAW_PRIVACY_FIELDS.TOKEN, PORTFOLIO_COLUMNS.BALANCE],
                0,
              )}
              placeholder={formatMessage(
                MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_TRANSFER_AMOUNT_PLACEHOLDER,
              )}
              onChange={e =>
                updateInput(WITHDRAW_PRIVACY_FIELDS.TRANSFER_AMOUNT, e.target.value)
              }
              invalid={this.handleMarkFieldInvalid(
                WITHDRAW_PRIVACY_FIELDS.TRANSFER_AMOUNT,
              )}
            />
            <InputGroupAddon addonType='append'>
              <Button onClick={addFullAmount}>
                {formatMessage(MSG.COMMON_BUTTON_MAXIMUM)}
              </Button>
            </InputGroupAddon>
            {this.handleRenderErrorList(WITHDRAW_PRIVACY_FIELDS.TRANSFER_AMOUNT)}
          </InputGroup>
        </StyledFormGroup>
        {/* <FormGroup>
          <Label>
            {formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_MESSAGE_LABEL)}
          </Label>
          <Input
            type='textarea'
            name={WITHDRAW_PRIVACY_FIELDS.MESSAGE}
            value={_get(formValues, [WITHDRAW_PRIVACY_FIELDS.MESSAGE], '')}
            placeholder={formatMessage(
              MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_MESSAGE_PLACEHOLDER,
            )}
            onChange={e =>
              updateInput(WITHDRAW_PRIVACY_FIELDS.MESSAGE, e.target.value)
            }
            invalid={this.handleMarkFieldInvalid(WITHDRAW_PRIVACY_FIELDS.MESSAGE)}
          />
          {this.handleRenderErrorList(WITHDRAW_PRIVACY_FIELDS.MESSAGE)}
        </FormGroup> */}
        {/* <Label>
          {`${formatMessage(
            MSG.MY_WALLET_POPUP_SEND_TOKEN_INFO_TRANSACTION_FEE_LABEL,
          )}: ${_get(
            formValues,
            [WITHDRAW_PRIVACY_FIELDS.TOKEN, PORTFOLIO_COLUMNS.TRANSACTION_FEE],
            0,
          )} TOMO`}
        </Label> */}
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
  /** Privacy mode */
  privacyMode: PropTypes.bool,
};

FormContent.defaultProps = {
  addFullAmount: () => {},
  formatMessage: () => {},
  formValues: {},
  submitForm: () => {},
  tokenOptions: [],
  updateInput: () => {},
  privacyMode: false,
};
// ======================

export default FormContent;
