/**
 *
 * TomoWallet - Header Navigation Bar - Style
 *
 */
// ===== IMPORTS =====
// Modules
import styled from 'styled-components';
import {
  Navbar,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
// ===================

import { MediumButtonStyler } from '../../styles';

// ===== STYLE =====

const LinkHeader = styled(NavLink)`
  color: #9eaacc !important;
  font-weight: normal;
  cursor: pointer;
`;
const DropdownToggleHeader = styled(DropdownToggle)`
  color: ${props => props.theme.menuColor} !important;
  font-weight: normal;
  display: flex;
  align-items: center;
  font-size: 14px;
  white-space: nowrap;
  &.onl:before {
    background-color: #36ce9a;
    border-radius: 50%;
    content: '';
    width: 6px;
    height: 6px;
    position: absolute;
    left: -5px;
    top: 50%;
    transform: translateY(-50%);
    animation: blinker 1s linear infinite;
  }
`;
const NavBarStyler = styled(Navbar)`
  padding: 15px 0;
  width: 100%;
  text-align: center;
  .navbar-brand {
    svg.fa-shield-alt {
      width: 30px;
      height: 30px;
      padding: 5px;
    }
    svg.fa-power-off {
      width: 30px;
      height: 30px;
      border: 2px solid;
      border-radius: 50%;
      padding: 5px;
      opacity: 0.5;
      box-shadow: 0px 5px 1px;
      transform: translateY(-3px);
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
      &:active {
        box-shadow: 0px 3px 1px;
        transform: translateY(-1px);
      }
      &.inactive {
        animation: turnOff 0.3s linear 1;
      }
      &.active {
        opacity: 1;
        color: aqua;
        border-color: aqua;
        box-shadow: 0px 3px 1px;
        transform: translateY(-1px);
        animation: turnOn 0.3s linear 1;
      }
    }
    > img {
      height: 45px;
      width: auto;
      max-width: 100%;
      cursor: pointer;
      transition: 0.5s ease-out;
      &:hover {
        transform: translateX(10%);
      }
    }
  }
  .nav-item {
    font-weight: bold;

    @media (min-width: 992px) {
      &:not(:first-child) {
        margin-left: 20px;
      }
      &:not(:last-child) {
        margin-right: 20px;
      }
    }

    i {
      color: ${props => props.theme.menuIconColor};
    }
  }
`;
const DropdownMenuStyler = styled(DropdownMenu)`
  background-color: ${props => props.theme.menuBackground};
  border-radius: 8px;
  border: 0;
  top: 39px;
  margin: 0;
  padding: 0.5em 1em;
  min-width: 125px;
  .dropdown-item {
    color: ${props => props.theme.menuColor};
  }
`;
const DropdownItemStyler = styled(DropdownItem)`
  font-size: 14px;
  transition: all 0.5s ease;
  position: relative;
  padding: 0.5rem 0;
  background: transparent !important;
  &:focus,
  &:hover {
    background: transparent;
    color: #5692cd;
    outline: 0 auto -webkit-focus-ring-color;
  }
`;
const NavWrapper = styled.div`
  background: ${props => props.theme.navBackground};
  height: 80px;
` 

const ButtonSwitchMode = styled(MediumButtonStyler)`
  color: ${props => props.theme.switchModeColor};
  background: ${props => props.theme.switchModeBackground};
  white-space: nowrap;
  margin-right: 40px;

  &:hover {
    background: ${props => props.theme.switchModeBackgroundHover};
  }

  svg {
    margin-left: 16px;

    path {
      fill: ${props => props.theme.menuIconColor};
    }
  }
`

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  transition: all 0.5s ease-out 0s;
  cursor: pointer;

  &:hover {
    transform: translateX(10%);
  }
`

const TomoText = styled.span.attrs({
  className: 'd-md-none d-lg-inline-block',
})`
  font-size: 20px;
  font-weight: 500;
  color: #fff !important;
  margin-left: 8px;
`
// =================

export {
  NavWrapper,
  NavBarStyler,
  LinkHeader,
  DropdownToggleHeader,
  DropdownMenuStyler,
  DropdownItemStyler,
  ButtonSwitchMode,
  LogoBox,
  TomoText,
};
