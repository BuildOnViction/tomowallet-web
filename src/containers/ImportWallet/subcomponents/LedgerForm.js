/**
 *
 * Import Wallet Page - Ledger Form
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Label, Input, FormFeedback } from 'reactstrap';
import _get from 'lodash.get';
import { FormattedMessage } from 'react-intl';
// Custom Component
import { StyledFormGroup, ButtonLinkStyler, FormTextStyled, TextBlue } from '../../../styles';
// Utilities
import { withIntl } from '../../../components/IntlProvider';
import { MSG } from '../../../constants';
// ===================

// ===== MAIN COMPONENT =====
class LedgerForm extends PureComponent {
  componentDidMount() {
    document.getElementById('hdPathInput').focus();
  }

  render() {
    const {
      errors,
      formValues,
      intl: { formatMessage },
      updateInput,
    } = this.props;
    return (
      <StyledFormGroup>
        <Label>{formatMessage(MSG.IMPORT_WALLET_TAB_LEDGER_INPUT_LABEL)}</Label>
        <Input
          id='hdPathInput'
          name='hdPath'
          value={_get(formValues, 'hdPath', '')}
          placeholder={formatMessage(
            MSG.IMPORT_WALLET_TAB_LEDGER_INPUT_PLACEHOLDER,
          )}
          onChange={e => updateInput('hdPath', e.target.value)}
          invalid={_get(errors, 'hdPath', []).length > 0}
        />
        <FormFeedback>
          {_get(errors, 'hdPath', []).map((err, errIdx) => (
            <div key={`error_${errIdx + 1}`}>{`* ${err}`}</div>
          ))}
        </FormFeedback>
        <FormTextStyled>
          <FormattedMessage
            {...MSG.IMPORT_WALLET_TAB_LEDGER_INPUT_DESCRIPTION}
            values={{
              path1: (
                <TextBlue
                  cursor="pointer"
                  btnRed
                  onClick={() => updateInput('hdPath', "m/44'/60'/0'")}
                >
                  {"m/44'/60'/0'"}
                </TextBlue>
              ),
              path2: (
                <TextBlue
                  cursor="pointer"
                  btnRed
                  onClick={() => updateInput('hdPath', "m/44'/60'/0'/0")}
                >
                  {"m/44'/60'/0'/0"}
                </TextBlue>
              ),
              path3: (
                <TextBlue
                  cursor="pointer"
                  btnRed
                  onClick={() => updateInput('hdPath', "m/44'/889'/0'/0")}
                >
                  {"m/44'/889'/0'/0"}
                </TextBlue>
              ),
            }}
          />
        </FormTextStyled>
      </StyledFormGroup>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
LedgerForm.propTypes = {
  /** Form errors */
  errors: PropTypes.objectOf(PropTypes.array),
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
