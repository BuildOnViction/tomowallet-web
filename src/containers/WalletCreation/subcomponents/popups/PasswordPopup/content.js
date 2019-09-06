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
  UncontrolledTooltip,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Custom Components
import Tooltip from '../../../../../components/Tooltip';
// Utilities
import { withIntl } from '../../../../../components/IntlProvider';
import { MSG } from '../../../../../constants';
import { PASSWORD_POPUP_STATES } from '../../../constants';
// ===================

// ===== MAIN COMPONENT =====
class PasswordContent extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.renderConfirmationForm = this.renderConfirmationForm.bind(this);
    this.renderInputErrors = this.renderInputErrors.bind(this);
    this.renderPasswordForm = this.renderPasswordForm.bind(this);
  }

  handleChangeInput(name, e) {
    const { updateInput } = this.props;
    updateInput(name, _get(e, 'target.value', ''));
  }

  renderConfirmationForm() {
    const {
      errors,
      formValues,
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
          onChange={e => this.handleChangeInput('confirmation', e)}
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
            onChange={e => this.handleChangeInput('password', e)}
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
  intl: {},
  isRevealed: false,
  revealText: () => {},
  updateInput: () => {},
};
// ======================

export default withIntl(PasswordContent);
