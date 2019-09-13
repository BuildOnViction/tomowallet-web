/**
 *
 * TomoWallet - Create Wallet Page - Password Popup Content
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash.get';
import {
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Custom Components
import Tooltip from '../../../../../components/Tooltip';
// Utilities
import { withIntl } from '../../../../../components/IntlProvider';
import { MSG } from '../../../../../constants';
import { PASSWORD_POPUP_STATES } from '../../../constants';
import { changeInputWithSubmit, detectSubmit } from '../../../../../utils';
// ===================

// ===== MAIN COMPONENT =====
class PasswordContent extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChangeConfirmation = this.handleChangeConfirmation.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.renderConfirmationForm = this.renderConfirmationForm.bind(this);
    this.renderInputErrors = this.renderInputErrors.bind(this);
    this.renderPasswordForm = this.renderPasswordForm.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      document.getElementById('passwordInput').focus();
    }, 100);
  }

  componentDidUpdate() {
    const { formState } = this.props;

    if (formState === PASSWORD_POPUP_STATES.PASSWORD) {
      document.getElementById('passwordInput').focus();
    } else if (formState === PASSWORD_POPUP_STATES.CONFIRMATION) {
      document.getElementById('confirmationInput').focus();
    }
  }

  handleChangeConfirmation(value) {
    const { updateInput } = this.props;
    updateInput('confirmation', value);
  }

  handleChangePassword(value) {
    const { updateInput } = this.props;
    updateInput('password', value);
  }

  renderConfirmationForm() {
    const {
      errors,
      formValues,
      handleSubmit,
      intl: { formatMessage },
    } = this.props;
    return (
      <FormGroup>
        <Label for='confirmationInput'>
          {formatMessage(
            MSG.CREATE_WALLET_POPUP_PASSWORD_INPUT_CONFIRMATION_LABEL,
          )}
        </Label>
        <Input
          id='confirmationInput'
          type='password'
          name='confirmation'
          value={_get(formValues, 'confirmation')}
          placeholder={formatMessage(
            MSG.CREATE_WALLET_POPUP_PASSWORD_INPUT_CONFIRMATION_PLACEHOLDER,
          )}
          onChange={changeInputWithSubmit(this.handleChangeConfirmation)}
          onKeyDown={detectSubmit(handleSubmit)}
          invalid={!!_get(errors, 'confirmation')}
        />
        {this.renderInputErrors('confirmation')}
      </FormGroup>
    );
  }

  renderInputErrors(name) {
    const { errors } = this.props;
    const errorList = _get(errors, [name], []);

    return (
      <FormFeedback>
        {errorList.map((err, errIdx) => (
          <div key={`error_${errIdx + 1}`}>{`* ${err}`}</div>
        ))}
      </FormFeedback>
    );
  }

  renderPasswordForm() {
    const {
      errors,
      formValues,
      handleSubmit,
      intl: { formatMessage },
      isRevealed,
      revealText,
    } = this.props;
    return (
      <FormGroup>
        <Label for='passwordInput'>
          <span>
            {formatMessage(MSG.CREATE_WALLET_POPUP_PASSWORD_INPUT_LABEL)}
          </span>
          <span id='passwordGuide'>
            <FontAwesomeIcon icon='info-circle' />
          </span>
          <Tooltip placement='top' target='passwordGuide'>
            {formatMessage(MSG.CREATE_WALLET_POPUP_PASSWORD_INPUT_TOOLTIP)}
          </Tooltip>
        </Label>
        <InputGroup>
          <Input
            id='passwordInput'
            type={isRevealed ? 'text' : 'password'}
            name='password'
            value={_get(formValues, 'password', '')}
            placeholder={formatMessage(
              MSG.CREATE_WALLET_POPUP_PASSWORD_INPUT_PLACEHOLDER,
            )}
            onChange={changeInputWithSubmit(this.handleChangePassword)}
            onKeyDown={detectSubmit(handleSubmit)}
            invalid={!!_get(errors, 'password')}
          />
          <InputGroupAddon addonType='append'>
            <InputGroupText
              role='presentation'
              onClick={() => revealText(!isRevealed)}
            >
              <FontAwesomeIcon
                icon={['far', isRevealed ? 'eye-slash' : 'eye']}
              />
            </InputGroupText>
          </InputGroupAddon>
          {this.renderInputErrors('password')}
        </InputGroup>
        <FormText>
          <span className='text-warning'>
            {formatMessage(
              MSG.CREATE_WALLET_POPUP_PASSWORD_INPUT_REMIND_TEXT_PART_1,
            )}
          </span>
          {` ${formatMessage(
            MSG.CREATE_WALLET_POPUP_PASSWORD_INPUT_REMIND_TEXT_PART_2,
          )} `}
          <span className='text-warning'>
            {formatMessage(
              MSG.CREATE_WALLET_POPUP_PASSWORD_INPUT_REMIND_TEXT_PART_3,
            )}
          </span>
          {` ${formatMessage(
            MSG.CREATE_WALLET_POPUP_PASSWORD_INPUT_REMIND_TEXT_PART_4,
          )} `}
        </FormText>
      </FormGroup>
    );
  }

  render() {
    const { formState } = this.props;

    return (
      (formState === PASSWORD_POPUP_STATES.PASSWORD &&
        this.renderPasswordForm()) ||
      (formState === PASSWORD_POPUP_STATES.CONFIRMATION &&
        this.renderConfirmationForm())
    );
  }
}
// ==========================

// ===== PROP TYPES =====
PasswordContent.propTypes = {
  /** Popup's error messages */
  errors: PropTypes.object,
  /** Password form's state */
  formState: PropTypes.number,
  /** Password form values */
  formValues: PropTypes.object,
  /** Action to handle form submit */
  handleSubmit: PropTypes.func,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Condition flag to hide/reveal password input */
  isRevealed: PropTypes.bool,
  /** Action to hide/reveal password input */
  revealText: PropTypes.func,
  /** Action to handle input change */
  updateInput: PropTypes.func,
};

PasswordContent.defaultProps = {
  errors: {},
  formState: PASSWORD_POPUP_STATES.PASSWORD,
  formValues: {},
  handleSubmit: () => {},
  intl: {},
  isRevealed: false,
  revealText: () => {},
  updateInput: () => {},
};
// ======================

export default withIntl(PasswordContent);
