import React from 'react';
import styled from 'styled-components';
import { Card, DropdownMenu, DropdownToggle } from 'reactstrap';
// Style Component//

const BoxBtnStyler = styled.div`
  max-width: 370px;
  text-align: center;
`;
const ContainerMin = styled.div`
  color: ${props => props.theme.cardColor};
  background-color: ${props => props.theme.cardBackground};
  border-radius: 8px;
  padding: 3em 2em;
  max-width: ${props => props.size ? props.size : '570px'};
  margin: 0 auto;
`;
const CustomContainer = styled(({ size, children, ...remains }) => (
  <div {...remains}>{children}</div>
))`
  color: ${props => props.theme.cardColor};
  background-color: ${props => props.theme.cardBackground};
  border-radius: 8px;
  padding: 3em 2em;
  max-width: ${({ size }) => (size === 'large' ? '800px' : '600px')};
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
    color: #5692cd;
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
  color: #9eaacc;
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
    color: #5692cd;
  }
`;

const BoxWrapper = styled.div`
  border-radius: 8px;
  background-color: ${props => props.theme.boxBackground};
  padding: 1em 1.5em;
  height: 100%;
`

export {
  BoxWrapper,
  BoxBtnStyler,
  ContainerMin,
  CustomContainer,
  BoxCardStyled,
  BoxImages,
  BoxFlexBetween,
  DropdownMenuMainStyler,
  DropdownToggleMainStyle,
};
