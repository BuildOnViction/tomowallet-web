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

// =================

export { AddressPopupStyler, InputStylerRadio };
