import styled from 'styled-components';
import {
  Navbar,
  NavLink,
  DropdownToggle
} from 'reactstrap'
// Style Component//

const LinkHeader = styled(NavLink)`
  color: #9eaacc !important;
  font-weight: normal;
`;

const DropdownToggleHeader = styled(DropdownToggle)`
  color: #9eaacc !important;
  font-weight: normal;
`;

const NavBarStyler = styled(Navbar)`
  padding: 20px;
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
    &:not(:first-child) {
      margin-left: 20px;
    }
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
`;

export {
  NavBarStyler,
  LinkHeader,
  DropdownToggleHeader,
};
