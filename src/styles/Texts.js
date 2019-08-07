import styled from 'styled-components';
import {
  NavLink,
  DropdownToggle,
} from 'reactstrap'

const ErrorTextStyler = styled.span`
  color: red;
`;
const BoxBtnStyler = styled.div`
  max-width: 370px;
  text-align: center;
`;
const LinkHeader = styled(NavLink)`
  color: #9eaacc !important;
  font-weight: normal;
`;
const DropdownToggleHeader = styled(DropdownToggle)`
  color: #9eaacc !important;
  font-weight: normal;
`;
const HeaderStyler = styled.h1`
  font-size: 44px;
  font-weight: 600;
  color: #ffffff;
  font-family: 'Bai Jamjuree', sans-serif;
`;
const WarningImages = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 150px;
  }
`;

export {
  ErrorTextStyler,
  BoxBtnStyler,
  LinkHeader,
  DropdownToggleHeader,
  HeaderStyler,
  WarningImages,
};
