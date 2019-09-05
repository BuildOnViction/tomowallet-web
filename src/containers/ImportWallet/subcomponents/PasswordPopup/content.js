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
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Utilities & Constants
import { withIntl } from '../../../../components/IntlProvider';
import { MSG } from '../../../../constants';
// ===================

// ===== MAIN COMPONENT =====
class PasswordContent extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  handleChangeInput(name, e) {
    const { updateInput } = this.props;
    updateInput(name, _get(e, 'target.value', ''));
  }

  render() {
    const {
      errors,
      intl: { formatMessage },
      isRevealed,
      revealText,
      value,
    } = this.props;
    return (
      <FormGroup>
        <InputGroup>
          <Input
            type={isRevealed ? 'text' : 'password'}
            name='password'
            value={value}
            placeholder={formatMessage(
              MSG.IMPORT_WALLET_POPUP_PASSWORD_INPUT_PLACEHOLDER,
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
          <FormFeedback>{_get(errors, 'password', '')}</FormFeedback>
        </InputGroup>
      </FormGroup>
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
