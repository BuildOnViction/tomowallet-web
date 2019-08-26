import styled from 'styled-components';
import {
  Card,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap';
// Style Component//

const BoxBtnStyler = styled.div`
  max-width: 370px;
  text-align: center;
`;
const ContainerMin = styled.div`
  background-color: #272d40;
  border-radius: 8px;
  padding: 3em 2em;
  max-width: 600px;
  margin: 0 auto;
`;
const BoxCardStyled = styled(Card)`
  padding: 0 3em;
`;
const BoxImages = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  canvas {
    border: 7px solid #fff;
    border-radius: 3px;
    display: flex;
  }
`;
const BoxFlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
`;


const DropdownMenuMainStyler = styled(DropdownMenu)`
  background-color: #202533;
  border-radius: 8px;
  border: 0;
  top: 0;
  margin: 0;
  padding: 0.5em 1em;
  min-width: 200px;
  a {
    color: #5692CD;
    font-size: 14px;
    white-space: nowrap;
    &:hover {
      color: #9eaacc;
    }
  }
`;

const DropdownToggleMainStyle = styled(DropdownToggle)`
  background: transparent !important;
  border: 0;
  color: #9EAACC;
  &:active {
    &:focus {
      border: 0;
      box-shadow: 0 0 0 0 !important;
    }
  }
  &:focus {
    border: 0;
    box-shadow: 0 0 0 0 !important;
  }
  &:hover {
    color: #5692CD;
  }
`;

export {
  BoxBtnStyler,
  ContainerMin,
  BoxCardStyled,
  BoxImages,
  BoxFlexBetween,
  DropdownMenuMainStyler,
  DropdownToggleMainStyle,
};
