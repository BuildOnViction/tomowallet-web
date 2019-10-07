/**
 *
 * TomoWallet - Import Wallet Page - Recovery Phrase/Private Key Tab
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _get from 'lodash.get';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
// Custom Components
import { RPOrPKFormStyler } from './style';
import PrivateKeyForm from './PrivateKeyForm';
import MnemonicForm from './MnemonicForm';
// Utilities & Constants
import { updateKeyInputType, updateInput } from '../../actions';
import { selectImportState } from '../../selectors';
import { KEY_INPUT_TYPE, KEY_INPUT_OPTIONS } from '../../constants';
import { withWeb3 } from '../../../../components/Web3';
// ===================

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
      onUpdateKeyInputType,
      onUpdateInput,
    } = this.props;
    const keyInputType = _get(
      importWallet,
      'keyInputType',
      KEY_INPUT_TYPE.PRIVATE_KEY,
    );

    return (
      <RPOrPKFormStyler errors={_get(importWallet, 'errors', {})}>
        <Nav tabs className='mt-2 mb-4'>
          {KEY_INPUT_OPTIONS.map((opt, optIdx) => (
            <NavItem key={`key_input_type_${optIdx + 1}`}>
              <NavLink
                active={opt.value === keyInputType}
                onClick={() => onUpdateKeyInputType(opt.value)}
              >
                {opt.label}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={keyInputType}>
          <TabPane tabId={KEY_INPUT_TYPE.PRIVATE_KEY}>
            <PrivateKeyForm
              errors={_get(importWallet, 'errors', {})}
              formValues={_get(importWallet, 'input', {})}
              keyInputType={keyInputType}
              handleSubmit={handleSubmit}
              updateInput={onUpdateInput}
            />
          </TabPane>
          <TabPane tabId={KEY_INPUT_TYPE.RECOVERY_PHRASE}>
            <MnemonicForm
              errors={_get(importWallet, 'errors', [])}
              formValues={_get(importWallet, 'input', {})}
              keyInputType={keyInputType}
              handleSubmit={handleSubmit}
              updateInput={onUpdateInput}
            />
          </TabPane>
        </TabContent>
        {/* <FormGroup>
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
        </FormGroup> */}
      </RPOrPKFormStyler>
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
  /** Action to change between key input forms */
  onUpdateKeyInputType: PropTypes.func,
  /** Action to handle input change */
  onUpdateInput: PropTypes.func,
  /** Web3 object */
  web3: PropTypes.object,
};

RPOrPKForm.defaultProps = {
  handleSubmit: () => {},
  importWallet: {},
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
  onUpdateKeyInputType: type => dispatch(updateKeyInputType(type)),
  onUpdateInput: (name, value) => dispatch(updateInput(name, value)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
// ======================

export default compose(
  withConnect,
  withWeb3,
)(RPOrPKForm);
