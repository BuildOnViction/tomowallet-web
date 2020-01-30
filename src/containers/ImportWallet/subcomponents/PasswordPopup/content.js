/**
 *
 * TomoWallet - Import Wallet Page - Password Popup Content
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash.get';
import {
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Utilities & Constants
import { withIntl } from '../../../../components/IntlProvider';
import { changeInputWithSubmit, detectSubmit } from '../../../../utils';
import { MSG } from '../../../../constants';
import { StyledFormGroup } from '../../../../styles';
// ===================

// ===== MAIN COMPONENT =====
class PasswordContent extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      document.getElementById('passwordInput').focus();
    }, 100);
  }

  handleChangePassword(value) {
    const { updateInput } = this.props;
    updateInput('password', value);
  }

  render() {
    const {
      decryptData,
      errors,
      intl: { formatMessage },
      isRevealed,
      revealText,
      value,
    } = this.props;
    return (
      <StyledFormGroup>
        <InputGroup>
          <Input
            id='passwordInput'
            type={isRevealed ? 'text' : 'password'}
            name='password'
            value={value}
            placeholder={formatMessage(
              MSG.IMPORT_WALLET_POPUP_PASSWORD_INPUT_PLACEHOLDER,
            )}
            onChange={changeInputWithSubmit(this.handleChangePassword)}
            onKeyDown={detectSubmit(decryptData)}
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
          <FormFeedback>{_get(errors, 'password', '')}</FormFeedback>
        </InputGroup>
      </StyledFormGroup>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
PasswordContent.propTypes = {
  /** Error messages */
  errors: PropTypes.object,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Condition flag to hide/reveal password text */
  isRevealed: PropTypes.bool,
  /** Action to reveal password as plain text */
  revealText: PropTypes.func,
  /** Action to update password input's value */
  updateInput: PropTypes.func,
  /** Password input's value */
  value: PropTypes.string,
};

PasswordContent.defaultProps = {
  errors: {},
  intl: {},
  isRevealed: false,
  revealText: () => {},
  updateInput: () => {},
  value: '',
};
// ======================

export default withIntl(PasswordContent);
