/**
 *
 * Import Wallet Page - Recovery Phrase/Private Key Tab - Private Key Form
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash.get';
import _isEqual from 'lodash.isequal';
import { FormFeedback, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Utilities & Constants
import { KEY_INPUT_TYPE } from '../../constants';
import { withIntl } from '../../../../components/IntlProvider';
import { changeInputWithSubmit, detectSubmit, mnemonicToPrivateKey, getWeb3Info, getNetwork } from '../../../../utils';
import { MSG, RPC_SERVER, ENUM } from '../../../../constants';
import { StyledFormGroup } from '../../../../styles';
import styled from 'styled-components';
import { generateMnemonic } from 'bip39'
// ===================

// ===== MAIN COMPONENT =====
class PrivateKeyForm extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChangePK = this.handleChangePK.bind(this);
    this.handleGeneratePK = this.handleGeneratePK.bind(this);
  }

  componentDidMount() {
    document.getElementById('privateKeyInput').focus();
  }

  componentDidUpdate(prevProps) {
    if (
      !_isEqual(
        _get(prevProps, 'keyInputType'),
        _get(this.props, 'keyInputType'),
      ) &&
      _isEqual(_get(this.props, 'keyInputType'), KEY_INPUT_TYPE.PRIVATE_KEY)
    ) {
      document.getElementById('privateKeyInput').focus();
    }
  }
  componentWillUnmount () {
    const { updateInput } = this.props;
    updateInput('privateKey', '');
  }

  handleChangePK(value) {
    const { updateInput } = this.props;
    updateInput('privateKey', value);
  }
  // generate random private key for testing
  handleGeneratePK () {
    const { updateInput } = this.props;
    const networkKey = getNetwork() || ENUM.NETWORK_TYPE.TOMOCHAIN_TESTNET;
    const serverConfig = _get(RPC_SERVER, [networkKey]);

    const newMnemonic = generateMnemonic();
    const privateKey = mnemonicToPrivateKey(newMnemonic, serverConfig)
    updateInput('privateKey', privateKey);
  }

  render() {
    const {
      errors,
      formValues,
      handleSubmit,
      intl: { formatMessage },
    } = this.props;

    return (
      <StyledFormGroup>
        <Label for='privateKey'>
          {formatMessage(
            MSG.IMPORT_WALLET_TAB_RECOVERY_PHRASE_TYPE_PRIVATE_KEY_INPUT_PRIVATE_KEY_LABEL,
          )}
          <FontAwesomeIcon icon='unlock' />
        </Label>
        <Input
          id='privateKeyInput'
          type='textarea'
          name='privateKey'
          placeholder={formatMessage(
            MSG.IMPORT_WALLET_TAB_RECOVERY_PHRASE_TYPE_PRIVATE_KEY_INPUT_PRIVATE_KEY_PLACEHOLDER,
          )}
          value={_get(formValues, 'privateKey', '')}
          onChange={changeInputWithSubmit(this.handleChangePK)}
          onKeyDown={detectSubmit(handleSubmit)}
          invalid={_get(errors, 'privateKey', []).length > 0}
        />
        <p
            style={{cursor: 'pointer', color: '#4b8aff', width: '200px', float: 'right'}}
            onClick={() => this.handleGeneratePK()}>Generate a random private key</p>
        <FormFeedback>
          {_get(errors, 'privateKey', []).map((err, errIdx) => (
            <div key={`error_${errIdx + 1}`}>{`* ${err}`}</div>
          ))}
        </FormFeedback>
      </StyledFormGroup>
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
  updateInput: () => {}
};
// ======================

const StyledATag = styled.p`
    cursor: pointer;
    width: 100%;
`
export default withIntl(PrivateKeyForm);
