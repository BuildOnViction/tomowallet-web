import styled from 'styled-components';
import {
  FormText,
  FormGroup,
} from 'reactstrap';
// Style Component//

const FormTextStyled = styled(FormText)`
  font-size: 14px;
  color: ${props => props.theme.inputColor} !important;
  line-height: 1.7;
  margin-top: 30px;
`;

const StyledFormGroup = styled(FormGroup)`  
    .is-invalid,
    .is-invalid:focus,
    .is-invalid:active {
        z-index: 10;
        box-shadow: 0 0 0 1px ${props => props.theme.inputInvalidBorder};
        background-image: none !important;
    }

    .form-control {
        color: ${props => props.theme.inputColor};
        padding: 12px 20px;

        &:active,
        &:focus {
            color: ${props => props.theme.inputColor};
        }
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

        .my-select__value-container {
            padding: 0 0 0 20px;
        }

        .my-select__control--is-focused {
            box-shadow: 0 0 0 1px ${props => props.theme.inputFocusBorder};
        }

        &.box_select--is-invalid .my-select__control,
        &.box_select--is-invalid .my-select__control--is-focused {
            box-shadow: 0 0 0 1px ${props => props.theme.inputInvalidBorder};
        }

        .my-select__indicator {
            padding-right: 20px;
            padding-left: 20px;
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

        &.my-select--is-disabled {
            .my-select__control {
                color: ${props => props.theme.inputSecondColor};
                background-color: ${props => props.theme.selectDisabledBg} !important;
            }

            .my-select__indicator {
                color: ${props => props.theme.selectIndicatorDisabledColor};
            }
        }
    }

    .text-placeholder {
        color: ${props => props.theme.inputSecondColor};
    }

    .input-group-append {        
        button {
            padding-right: 20px;
            padding-left: 18px;
            color: ${props => props.theme.inputSecondColor};
            background-color: ${props => props.theme.inputBackground} !important;

            &:hover {
                color: ${props => props.theme.inputColor};
            }

            &::before {
                background-color: ${props => props.theme.inputDividerBackground} !important;
            }

            &:active,
            &:focus {
                color: ${props => props.theme.inputColor} !important;
                box-shadow: none !important;
            }
        }
    }
`

export {
  FormTextStyled,
  StyledFormGroup,
};
