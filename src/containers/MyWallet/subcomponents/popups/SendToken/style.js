/**
 *
 * TomoWallet - My Wallet Page - Send Token Popup - Style
 *
 */
// ===== IMPORTS =====
// Modules
import styled from 'styled-components';
import { FormGroup } from 'reactstrap';
// Custom Component
import Popup from '../../../../../components/Popup';
// ===================

// ===== STYLE =====
const SendTokenPopupStyler = styled(Popup)``;

const StyledFormGroup = styled(FormGroup)`
    .form-control,
    .form-control:active,
    .form-control:focus {
        color: ${props => props.theme.inputColor};
    }

    input, 
    textarea {
        background-color: ${props => props.theme.inputBackground} !important;
        color: ${props => props.theme.inputColor};

        &::placeholder {
            color: ${props => props.theme.inputSecondColor};
        }

        &:focus,
        &:active {
            box-shadow: 0 0 0 1px ${props => props.theme.inputFocusBorder};
        }
    }

    label {
        color: ${props => props.theme.inputColor};
    }

    .box_select {
        color: ${props => props.theme.inputColor};

        .my-select__control {
            background-color: ${props => props.theme.inputBackground} !important;
        }

        .my-select__control--is-focused {
            box-shadow: 0 0 0 1px ${props => props.theme.inputFocusBorder};
        }

        .my-select__indicator {
            color: ${props => props.theme.selectIndicatorColor};
        }

        .my-select__menu {
            padding: .71rem;
            background-color: ${props => props.theme.inputBackground} !important;
            box-shadow: 0 0 0 1px ${props => props.theme.selectMenuBorder};
        }

        .select_option {
            border-radius: 8px;
            padding: .5rem .71rem;

            &:hover {
                background-color: ${props => props.theme.selectOptionBgHover};
            }
        }
    }

    .text-placeholder {
        color: ${props => props.theme.inputSecondColor};
    }

    .input-group-append {
        button {
            color: ${props => props.theme.inputSecondColor};
            background-color: ${props => props.theme.inputBackground} !important;

            &:hover {
                color: ${props => props.theme.inputColor};
            }

            &::before {
                background-color: ${props => props.theme.inputDividerBackground} !important;
            }
        }
    }
`
// =================

export { SendTokenPopupStyler, StyledFormGroup };
