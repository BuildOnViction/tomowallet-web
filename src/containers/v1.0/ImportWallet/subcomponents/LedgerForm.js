/**
 *
 * Import Wallet Page - Ledger Form
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { get as _get } from 'lodash';
import { FormattedMessage } from 'react-intl';
// Custom Component
import { FormTextStyled } from '../../../../styles';
// Utilities
import { withIntl } from '../../../../components/IntlProvider';
import { MSG } from '../../../../constants';
// -- TO-DO: Add style for Ledger form
// ===================

// ===== MAIN COMPONENT =====
class LedgerForm extends PureComponent {
  render() {
    const {
      errors,
      formValues,
      intl: { formatMessage },
      updateInput,
    } = this.props;
    return (
      <FormGroup>
        <Label>{formatMessage(MSG.IMPORT_WALLET_TAB_LEDGER_INPUT_LABEL)}</Label>
        <Input
          name='hdPath'
          value={_get(formValues, 'hdPath', '')}
          placeholder={formatMessage(
            MSG.IMPORT_WALLET_TAB_LEDGER_INPUT_PLACEHOLDER,
          )}
          onChange={e => updateInput('hdPath', e.target.value)}
          invalid={errors.length > 0}
        />
        <FormFeedback>
          {errors.map((err, errIdx) => (
            <div key={`error_${errIdx + 1}`}>{`* ${err}`}</div>
          ))}
        </FormFeedback>
        <FormTextStyled>
          {/* -- TO-DO: Update style for Import Ledger description text */}
          <FormattedMessage
            {...MSG.IMPORT_WALLET_TAB_LEDGER_INPUT_DESCRIPTION}
            values={{
              path1: (
                <span
                  role='presentation'
                  onClick={() => updateInput('hdPath', "m/44'/60'/0")}
                  className='text-danger'
                >
                  {"m/44'/60'/0"}
                </span>
              ),
              path2: (
                <span
                  role='presentation'
                  onClick={() => updateInput('hdPath', "m/44'/60'/0'/0")}
                  className='text-danger'
                >
                  {"m/44'/60'/0'/0"}
                </span>
              ),
              path3: (
                <span
                  role='presentation'
                  onClick={() => updateInput('hdPath', "m/44'/889'/0'/0")}
                  className='text-danger'
                >
                  {"m/44'/889'/0'/0"}
                </span>
              ),
            }}
          />
          {/* {formatMessage(MSG.IMPORT_WALLET_TAB_LEDGER_INPUT_DESCRIPTION, {
            path1: "m/44'/60'/0",
            path2: "m/44'/60'/0'/0",
            path3: "m/44'/889'/0'/0",
          })} */}
        </FormTextStyled>
      </FormGroup>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
LedgerForm.propTypes = {
  /** Form errors */
  errors: PropTypes.arrayOf(PropTypes.string),
  /** Form's input values */
  formValues: PropTypes.object,
  /** React Intl' instance object */
  intl: PropTypes.object,
  /** Action to handle input change */
  updateInput: PropTypes.func,
};

LedgerForm.defaultProps = {
  errors: [],
  formValues: {},
  intl: {},
  updateInput: () => {},
};
// ======================

export default withIntl(LedgerForm);
