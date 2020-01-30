/**
 *
 * TomoWallet - Import Wallet Page - Ledger Address Popup - Style
 *
 */
// ===== IMPORTS =====
// Modules
import styled from 'styled-components';
import { Input } from 'reactstrap';
// Custom Components
import Popup from '../../../../components/Popup';
// ===================

// ===== STYLE =====
const AddressPopupStyler = styled(Popup)``;

const InputStylerRadio = styled(Input)`
  position: absolute;
  margin-top: 0;
  margin-left: 0;
  left: 10px;
  top: 4px;
`;

const Label = styled.label`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`

// =================

export { AddressPopupStyler, InputStylerRadio, Label };
