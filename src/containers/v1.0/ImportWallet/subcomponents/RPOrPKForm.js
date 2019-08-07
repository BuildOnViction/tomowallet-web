/**
 *
 * Import Wallet Page - Recovery Phrase/Private Key Form
 *
 */
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { get as _get } from 'lodash';
import { Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Custom Components
// -- TO-DO: Update style for Recovery Phrase/Private Key form
import { RPOrPKFormStyler } from '../style';
// Utilities & Constants
import { withIntl } from '../../../../components/IntlProvider';
import { MSG } from '../../../../constants';

// ===== MAIN COMPONENT =====
class RPOrPKForm extends PureComponent {
  render() {
    const {
      formValues,
      intl: { formatMessage },
      updateInput,
    } = this.props;
    return (
      <RPOrPKFormStyler className='p-0'>
        <div>
          <span>
            {formatMessage(MSG.IMPORT_WALLET_TAB_RECOVERY_PHRASE_INPUT_LABEL)}
          </span>
          <FontAwesomeIcon icon='unlock' />
        </div>
        <Input
          type='textarea'
          name='textValue'
          placeholder={formatMessage(
            MSG.IMPORT_WALLET_TAB_RECOVERY_PHRASE_INPUT_PLACEHOLDER,
          )}
          value={_get(formValues, 'textValue', '')}
          onChange={e => updateInput('textValue', e.target.value)}
        />
        <div className='import-by-qrcode'>
          {formatMessage(
            MSG.IMPORT_WALLET_TAB_RECOVERY_PHRASE_OPTION_IMPORT_VIA_QRCODE,
          )}
        </div>
      </RPOrPKFormStyler>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
RPOrPKForm.propTypes = {
  /** React Intl's instance object */
  intl: PropTypes.object,
};
// ======================

export default withIntl(RPOrPKForm);
