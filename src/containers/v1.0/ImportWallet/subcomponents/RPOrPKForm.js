/**
 *
 * Import Wallet Page - Recovery Phrase/Private Key Form
 *
 */
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { get as _get } from 'lodash';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Custom Components
import { FormTextStyled } from '../../../../styles';
// Utilities & Constants
import { withIntl } from '../../../../components/IntlProvider';
import { MSG } from '../../../../constants';

// ===== MAIN COMPONENT =====
class RPOrPKForm extends PureComponent {
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
        <FormFeedback>
          {errors.map((err, errIdx) => (
            <div key={`error_${errIdx + 1}`}>{`* ${err}`}</div>
          ))}
        </FormFeedback>
        <FormTextStyled className='import-by-qrcode'>
          {formatMessage(
            MSG.IMPORT_WALLET_TAB_RECOVERY_PHRASE_OPTION_IMPORT_VIA_QRCODE,
          )}
        </FormTextStyled>
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
