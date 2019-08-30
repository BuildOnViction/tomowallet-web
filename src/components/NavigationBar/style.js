import styled from 'styled-components';
import {
  Navbar,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
// Style Component//

const LinkHeader = styled(NavLink)`
  color: #9eaacc !important;
  font-weight: normal;
  cursor: pointer;
`;

const DropdownToggleHeader = styled(DropdownToggle)`
  color: #9eaacc !important;
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
  }
`;

const NavBarStyler = styled(Navbar)`
  padding: 15px 0;
  width: 100%;
  text-align: center;
  .navbar-brand {
    > img {
      height: 45px;
      width: auto;
      max-width: 100%;
      cursor: pointer;
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
  }
`;

const DropdownMenuStyler = styled(DropdownMenu)`
  background-color: #272d40;
  border-radius: 8px;
  border: 0;
  top: 39px;
  margin: 0;
  padding: 0.5em 1em;
  min-width: 125px;
  .dropdown-item {
    color: #9eaacc;
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

export {
  NavBarStyler,
  LinkHeader,
  DropdownToggleHeader,
  DropdownMenuStyler,
  DropdownItemStyler,
};
