/**
 *
 * TomoWallet - Footer - Style
 *
 */
// ===== IMPORTS =====
// Modules
import styled from 'styled-components';
import { NavLink, NavItem } from 'reactstrap';
// ===================

// ===== STYLE =====
const LinkNavItem = styled(NavItem)`
  &:before {
    background-color: ${props => props.theme.footerColor};
  }
`
const SocialNavItem = styled(NavItem)`
  a {
    background: ${props => props.theme.footerSocialBackground};

    &:hover i {
      color: ${props => props.theme.footerSocialHoverColor};
    }
  }
`
const LinkFooter = styled(NavLink)`
  color: ${props => props.theme.footerColor} !important;
  font-weight: normal;

  &:hover {
    color: ${props => props.theme.footerHoverColor} !important;
  }
`;
const TextGray = styled.div`
  color: ${props => props.theme.footerColor};
`;
// =================

export { LinkNavItem, SocialNavItem, LinkFooter, TextGray };
