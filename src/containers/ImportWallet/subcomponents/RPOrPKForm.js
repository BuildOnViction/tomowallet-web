/**
 *
 * Import Wallet Page - Recovery Phrase/Private Key Form
 *
 */
// Modules
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _get from 'lodash.get';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Utilities & Constants
import { withIntl } from '../../../components/IntlProvider';
import { withWeb3 } from '../../../components/Web3';
import { MSG } from '../../../constants';
import { selectImportState } from '../selectors';
import { updateInput } from '../actions';
import { changeInputWithSubmit, detectSubmit } from '../../../utils';

// ===== MAIN COMPONENT =====
class RPOrPKForm extends PureComponent {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    document.getElementById('recoveryPhraseInput').focus();
  }

  handleInputChange(value) {
    const { onUpdateInput } = this.props;
    onUpdateInput('recoveryPhrase', value);
  }

  render() {
    const {
      handleSubmit,
      importWallet,
      intl: { formatMessage },
    } = this.props;
    const errors = _get(importWallet, 'errors', []);

    return (
      <Fragment>
        <FormGroup>
          <Label>
            {formatMessage(MSG.IMPORT_WALLET_TAB_RECOVERY_PHRASE_INPUT_LABEL)}
            <FontAwesomeIcon icon='unlock' />
          </Label>
          <Input
            id='recoveryPhraseInput'
            type='textarea'
            name='recoveryPhrase'
            placeholder={formatMessage(
              MSG.IMPORT_WALLET_TAB_RECOVERY_PHRASE_INPUT_PLACEHOLDER,
            )}
            value={_get(importWallet, 'input.recoveryPhrase', '')}
            onChange={changeInputWithSubmit(this.handleInputChange)}
            onKeyDown={detectSubmit(handleSubmit)}
            invalid={errors.length > 0}
          />
          <FormFeedback>
            {errors.map((err, errIdx) => (
              <div key={`error_${errIdx + 1}`}>{`* ${err}`}</div>
            ))}
          </FormFeedback>
        </FormGroup>
      </Fragment>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
RPOrPKForm.propTypes = {
  /** Action to start form submitting */
  handleSubmit: PropTypes.func,
  /** Import Wallet page's state */
  importWallet: PropTypes.object,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to handle input change */
  onUpdateInput: PropTypes.func,
  /** Web3 object */
  web3: PropTypes.object,
};

RPOrPKForm.defaultProps = {
  handleSubmit: () => {},
  importWallet: {},
  intl: {},
  onUpdateInput: () => {},
  web3: {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    importWallet: selectImportState,
  });
const mapDispatchToProps = dispatch => ({
  onUpdateInput: (name, value) => dispatch(updateInput(name, value)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
// ======================

export default compose(
  withConnect,
  withIntl,
  withWeb3,
)(RPOrPKForm);
