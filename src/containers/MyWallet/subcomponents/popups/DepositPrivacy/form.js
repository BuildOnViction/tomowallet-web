/**
 *
 * TomoWallet - My Wallet Page - Deposit Privacy Popup - Form
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
  // InputGroup,
  // InputGroupAddon,
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
import { StyledFormGroup, HeadingMediumCenter } from '../../../../../styles';
// Utilities & Constants
import { convertLocaleNumber } from '../../../../../utils';
import { PORTFOLIO_COLUMNS, DEPOSIT_PRIVACY_FIELDS } from '../../../constants';
import { MSG } from '../../../../../constants';
import { bnToDecimals } from '../../../../../utils';
// ===================

// ===== SUB-COMPONENTS =====
const TokenOption = props => {
  const { innerProps, data, wallet } = props;
  const rawBalance = _get(data, [PORTFOLIO_COLUMNS.BALANCE], 0);
  // const rawBalance = _get(wallet, 'balance', 0);
  const decimals = _get(data, [PORTFOLIO_COLUMNS.DECIMALS], 0);
  // const decimals = '18';
  const normalBalance = parseFloat(bnToDecimals(rawBalance, decimals));

  return (
    <Container {...innerProps} role='presentation' fluid className='px-0'>
      <Row noGutters className='select_option align-items-center'>
        <Col xs={6} className='d-flex align-items-center text-ellipsis'>
          <Image
            src={_get(data, [PORTFOLIO_COLUMNS.ICON], '')}
            // alt={_get(data, [PORTFOLIO_COLUMNS.TOKEN_NAME], '')}
            alt='TOMO'
          />
          {/* <span>{`${_get(data, [PORTFOLIO_COLUMNS.TOKEN_NAME], '')} (${_get( */}
            <span>{`TOMO (${_get(
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

const TokenInputValue = (props) => {
  const { data, wallet } = props;
  // const rawBalance = _get(data, [PORTFOLIO_COLUMNS.BALANCE], 0);
  const rawBalance = _get(wallet, 'balance', 0);
  // const decimals = _get(data, [PORTFOLIO_COLUMNS.DECIMALS], 0);
  const decimals = '18';
  const normalBalance = parseFloat(bnToDecimals(rawBalance, decimals));

  return (
    <div style={{ width: '96%' }}>
      <Row noGutters className='select_option_active align-items-center'>
        <Col xs={6} className='d-flex align-items-center text-ellipsis'>
          <Image
            src={_get(data, [PORTFOLIO_COLUMNS.ICON], '')}
            // alt={_get(data, [PORTFOLIO_COLUMNS.TOKEN_NAME], '')}
            alt='TOMO'
          />
          {/* <span>{`${_get(data, [PORTFOLIO_COLUMNS.TOKEN_NAME], '')} (${_get( */}
            <span>{`TOMO (${_get(
            data,
            [PORTFOLIO_COLUMNS.PUBLISHER],
            '',
          )})`}</span>
        </Col>
        <Col xs={6} className='text-right text-ellipsis'>
        {`${convertLocaleNumber(normalBalance)} TOMO`}
          {/* {`${convertLocaleNumber(normalBalance)} ${_get(
            data,
            [PORTFOLIO_COLUMNS.SYMBOL],
            '',
          )}`} */}
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
      formatMessage,
      formValues,
      submitForm,
      tokenOptions,
      updateInput,
      // privacyMode,
      wallet
    } = this.props;

    return (
      <Form onSubmit={submitForm} className='cm_form'>
        <StyledFormGroup>
        <HeadingMediumCenter>
          {
            formatMessage(MSG.MY_WALLET_POPUP_DEPOSIT_PRIVACY_DESCRIPTION)
          }
        </HeadingMediumCenter>
          <Label>
            {formatMessage(MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_TOKEN_LABEL)}
          </Label>
          <Select
            className='box_select'
            name={DEPOSIT_PRIVACY_FIELDS.TOKEN}
            value={_get(formValues, [DEPOSIT_PRIVACY_FIELDS.TOKEN], '')}
            options={tokenOptions}
            onChange={value => updateInput(DEPOSIT_PRIVACY_FIELDS.TOKEN, value)}
            components={{
              Option: TokenOption,
              SingleValue: props => <TokenInputValue {...props} wallet={wallet} />,
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
          {this.handleRenderErrorList(DEPOSIT_PRIVACY_FIELDS.TOKEN)}
        </StyledFormGroup>
        <StyledFormGroup>
          <Label>
            {formatMessage(
              MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_TRANSFER_AMOUNT_LABEL,
            )}
          </Label>
          {/* <InputGroup> */}
            <Input
              type='number'
              name={DEPOSIT_PRIVACY_FIELDS.TRANSFER_AMOUNT}
              value={_get(formValues, [DEPOSIT_PRIVACY_FIELDS.TRANSFER_AMOUNT], '')}
              max={_get(
                formValues,
                [DEPOSIT_PRIVACY_FIELDS.TOKEN, PORTFOLIO_COLUMNS.BALANCE],
                0,
              )}
              placeholder={formatMessage(
                MSG.MY_WALLET_POPUP_SEND_TOKEN_INPUT_TRANSFER_AMOUNT_PLACEHOLDER,
              )}
              onChange={e =>
                updateInput(DEPOSIT_PRIVACY_FIELDS.TRANSFER_AMOUNT, e.target.value)
              }
              invalid={this.handleMarkFieldInvalid(
                DEPOSIT_PRIVACY_FIELDS.TRANSFER_AMOUNT,
              )}
            />
            {/* <InputGroupAddon addonType='append'> */}
              {/* <Button onClick={addFullAmount}>
                {formatMessage(MSG.COMMON_BUTTON_MAXIMUM)}
              </Button> */}
            {/* </InputGroupAddon> */}
            {this.handleRenderErrorList(DEPOSIT_PRIVACY_FIELDS.TRANSFER_AMOUNT)}
          {/* </InputGroup> */}
        </StyledFormGroup>
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
        {/* <Label>
          {`${formatMessage(
            MSG.MY_WALLET_POPUP_SEND_TOKEN_INFO_TRANSACTION_FEE_LABEL,
          )}: ${_get(
            formValues,
            [SEND_TOKEN_FIELDS.TOKEN, PORTFOLIO_COLUMNS.TRANSACTION_FEE],
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
