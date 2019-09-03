/**
 *
 * Import Wallet Page - Recovery Phrase/Private Key Form
 *
 */
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash.get';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Custom Components
import FileUploadInput from '../../../components/FileUpload';
// Utilities & Constants
import { withIntl } from '../../../components/IntlProvider';
import { MSG } from '../../../constants';

// ===== MAIN COMPONENT =====
class RPOrPKForm extends PureComponent {
  constructor(props) {
    super(props);

    this.handleLoadRecoveryPhrase = this.handleLoadRecoveryPhrase.bind(this);
  }

  handleLoadRecoveryPhrase(readText) {
    const { updateInput } = this.props;

    updateInput('recoveryPhrase', readText);
  }

  render() {
    const {
      errors,
      formValues,
      intl: { formatMessage },
      updateInput,
    } = this.props;
    return (
      <FormGroup>
        <Label>
          {formatMessage(MSG.IMPORT_WALLET_TAB_RECOVERY_PHRASE_INPUT_LABEL)}
          <FontAwesomeIcon icon='unlock' />
        </Label>
        <Input
          type='textarea'
          name='recoveryPhrase'
          placeholder={formatMessage(
            MSG.IMPORT_WALLET_TAB_RECOVERY_PHRASE_INPUT_PLACEHOLDER,
          )}
          value={_get(formValues, 'recoveryPhrase', '')}
          onChange={e => updateInput('recoveryPhrase', e.target.value)}
          invalid={errors.length > 0}
        />
        <FileUploadInput onLoaded={this.handleLoadRecoveryPhrase} />
        <FormFeedback>
          {errors.map((err, errIdx) => (
            <div key={`error_${errIdx + 1}`}>{`* ${err}`}</div>
          ))}
        </FormFeedback>
      </FormGroup>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
RPOrPKForm.propTypes = {
  /** Form error messages */
  errors: PropTypes.arrayOf(PropTypes.string),
  /** Form's input values */
  formValues: PropTypes.object,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to handle input change */
  updateInput: PropTypes.func,
};

RPOrPKForm.defaultProps = {
  errors: [],
  formValues: {},
  intl: {},
  updateInput: () => {},
};

// ======================

export default withIntl(RPOrPKForm);
