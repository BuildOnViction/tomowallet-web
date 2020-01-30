/**
 *
 * Import Wallet Page - Recovery Phrase/Private Key Tab - Mnemonic Form
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash.get';
import _isEqual from 'lodash.isequal';
import { FormFeedback, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Utilities & Constants
import { changeInputWithSubmit, detectSubmit } from '../../../../utils';
import { MSG } from '../../../../constants';
import { withIntl } from '../../../../components/IntlProvider';
import { KEY_INPUT_TYPE } from '../../constants';
import { StyledFormGroup } from '../../../../styles';
// ===================

// ===== MAIN COMPONENT =====
class PrivateKeyForm extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChangeRecoveryPhrase = this.handleChangeRecoveryPhrase.bind(
      this,
    );
    this.handleChangeHDPath = this.handleChangeHDPath.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      !_isEqual(
        _get(prevProps, 'keyInputType'),
        _get(this.props, 'keyInputType'),
      ) &&
      _isEqual(_get(this.props, 'keyInputType'), KEY_INPUT_TYPE.RECOVERY_PHRASE)
    ) {
      document.getElementById('recoveryPhraseInput').focus();
    }
  }

  handleChangeRecoveryPhrase(value) {
    const { updateInput } = this.props;
    updateInput('recoveryPhrase', value);
  }

  handleChangeHDPath(event) {
    const { updateInput } = this.props;
    updateInput('hdPath', event.target.value);
  }

  render() {
    const {
      errors,
      formValues,
      handleSubmit,
      intl: { formatMessage },
    } = this.props;

    return (
      <Fragment>
        <StyledFormGroup className='mb-2'>
          <Label for='recoveryPhrase'>
            {formatMessage(
              MSG.IMPORT_WALLET_TAB_RECOVERY_PHRASE_TYPE_MNEMONIC_INPUT_MNEMONIC_LABEL,
            )}
            <FontAwesomeIcon icon='envelope-open-text' />
          </Label>
          <Input
            id='recoveryPhraseInput'
            type='textarea'
            name='recoveryPhrase'
            placeholder={formatMessage(
              MSG.IMPORT_WALLET_TAB_RECOVERY_PHRASE_TYPE_MNEMONIC_INPUT_MNEMONIC_PLACEHOLDER,
            )}
            value={_get(formValues, 'recoveryPhrase', '')}
            onChange={changeInputWithSubmit(this.handleChangeRecoveryPhrase)}
            onKeyDown={detectSubmit(handleSubmit)}
            invalid={_get(errors, 'recoveryPhrase', []).length > 0}
          />
          <FormFeedback>
            {_get(errors, 'recoveryPhrase', []).map((err, errIdx) => (
              <div key={`error_${errIdx + 1}`}>{`* ${err}`}</div>
            ))}
          </FormFeedback>
        </StyledFormGroup>
        <StyledFormGroup>
          <Label for='hdPath'>
            {formatMessage(
              MSG.IMPORT_WALLET_TAB_RECOVERY_PHRASE_TYPE_MNEMONIC_INPUT_HD_PATH_LABEL,
            )}
          </Label>
          <Input
            id='hdPathInput'
            name='hdPath'
            placeholder={formatMessage(
              MSG.IMPORT_WALLET_TAB_RECOVERY_PHRASE_TYPE_MNEMONIC_INPUT_HD_PATH_PLACEHOLDER,
            )}
            value={_get(formValues, 'hdPath', '')}
            onChange={this.handleChangeHDPath}
            invalid={_get(errors, 'hdPath', []).length > 0}
          />
          <FormFeedback>
            {_get(errors, 'hdPath', []).map((err, errIdx) => (
              <div key={`error_${errIdx + 1}`}>{`* ${err}`}</div>
            ))}
          </FormFeedback>
        </StyledFormGroup>
      </Fragment>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
PrivateKeyForm.propTypes = {
  /** Form's error messages */
  errors: PropTypes.objectOf(PropTypes.array),
  /** Form's input values */
  formValues: PropTypes.object,
  /** Action to submit form */
  handleSubmit: PropTypes.func,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to handle input change */
  updateInput: PropTypes.func,
};

PrivateKeyForm.defaultProps = {
  errors: {},
  formValues: {},
  handleSubmit: () => {},
  intl: {},
  updateInput: () => {},
};
// ======================

export default withIntl(PrivateKeyForm);
