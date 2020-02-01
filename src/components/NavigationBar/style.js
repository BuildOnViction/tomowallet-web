/**
 *
 * TomoWallet - Header Navigation Bar - Style
 *
 */
// ===== IMPORTS =====
// Modules
import styled from 'styled-components';
import {
  Nav,
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
  user-select: none;
`;
const DropdownToggleHeader = styled(DropdownToggle)`
  color: ${props => props.theme.menuHeaderColor} !important;
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
  height: 80px;
  width: 100%;
  display: flex;
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

const NavRight = styled(Nav)`
  align-items: center;
`

const DropdownMenuStyler = styled(DropdownMenu)`
  background-color: ${props => props.theme.menuBackground};
  border-radius: 8px;
  border: 0;
  top: 39px;
  margin: 0;
  padding: 20px 30px;
  min-width: 210px;
`;
const DropdownItemStyler = styled(DropdownItem)`
  color: ${props => props.theme.menuColor};
  font-size: 14px;
  transition: all 0.5s ease;
  position: relative;
  padding: 0.5rem 0;
  background: transparent !important;
  user-select: none;

  &:focus,
  &:hover {
    background: transparent;
    color: #5692cd;
    outline: 0 auto -webkit-focus-ring-color;
  }
`;

const SubDropdownItem = styled(DropdownItemStyler)`
  color: ${props => props.theme.menuSubColor};
  padding-left: 16px;
  position: relative;

  &.disabled,
  &:disabled {
    color: ${props => props.theme.menuSubColor};
  }

  &.active::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 6px;
    width: 6px;
    border-radius: 50%;
    background: #4B96CD;
  }
`

const CustomDropdownItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  line-height: 23px;
  padding: 8px 0;
  user-select: none;

  i.font-chevron-down {
    color: ${props => props.theme.menuColor};
  }

  &:hover {
    color: #5692cd;

    i.font-chevron-down {
      color: #5692cd;
    }
  }
`
const NavWrapper = styled.div`
  background: ${props => props.theme.navBackground};
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

const TomoText = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: #fff !important;
  margin-left: 8px;
`

const ExternalLink = styled.a`
  color: inherit !important;
  transition: none !important;
`
// =================

export {
  NavWrapper,
  NavBarStyler,
  NavRight,
  LinkHeader,
  DropdownToggleHeader,
  DropdownMenuStyler,
  DropdownItemStyler, 
  SubDropdownItem, 
  CustomDropdownItem,
  ButtonSwitchMode,
  LogoBox,
  TomoText,
  ExternalLink,
};
