/**
 *
 * TomoWallet - My Wallet Page - Receive Token Popup
 *
 */
// ===== IMPORTS =====
// Modules
import styled from 'styled-components';
// Custom Components
import Popup from '../../../../../components/Popup';
import { TextBlue } from '../../../../../styles';
// ===================

// ===== STYLE =====
const ReceiveTokenPopupStyler = styled(Popup)``;

const AddressBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const AddressText = styled(TextBlue).attrs({
    className: 'text-break',
})`
    font-family: 'Bai Jamjuree', sans-serif;
    max-width: calc(100% - 70px);
`
// =================

export { ReceiveTokenPopupStyler, AddressBox, AddressText };
