import React from 'react';
import styled from 'styled-components';

const BigButtonStyler = styled.button`
  ${({ btnBlue }) =>
    btnBlue
      ? 'background-color:#5692cd;color:#ffffff;'
      : 'background-color:#e4ae63;color:#ffffff'}
  border: 0px;
  border-radius: 8px;
  display: flex;
  height: 44px;
  padding: 0 2em;
  justify-content: center;
  align-items: center;
  font-family: 'Nunito Sans', sans-serif;
  transition: all 0.3s;
  width: 100%;
  &:hover {
    ${({ btnBlue }) =>
      btnBlue
        ? 'background-color:#4076AC;color:#ffffff;'
        : 'background-color:#C59148;color:#ffffff'}
  }
  &:focus {
    outline: none;
  }
`;

const ButtonStyler = styled(
  ({ action, btnBlue, btnYellow, children, ...remain }) => (
    <button {...remain}>{children}</button>
  ),
)`
  ${({ btnYellow, btnBlue }) => {
    if (btnYellow) {
      return 'background-color:#e4ae63;color:#444b64';
    } else if (btnBlue) {
      return 'background-color:#5692cd;color:#ffffff;';
    }
    return 'background-color:#2d344a;color:#9eaacc;';
  }}
  border: 0px;
  border-radius: 8px;
  display: flex;
  height: 44px;
  padding: 0 2em;
  justify-content: center;
  align-items: center;
  font-family: 'Nunito Sans', sans-serif;
  transition: all 0.3s;
  width: 100%;
  &:hover {
    ${({ btnYellow, btnBlue }) => {
      if (btnYellow) {
        return 'background-color:#C59148;color:#444b64';
      } else if (btnBlue) {
        return 'background-color:#4076AC;color:#ffffff;';
      }
      return 'background-color:#3D496E;color:#9eaacc;';
    }}
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.5;
  }
`;

const ButtonLineStyler = styled.button`
  background: transparent;
  border: 1px solid #444b64;
  border-radius: 8px;
  display: flex;
  height: 44px;
  padding: 0 2em;
  justify-content: center;
  align-items: center;
  font-family: 'Nunito Sans', sans-serif;
  transition: all 0.3s;
  width: 100%;
  color: #9eaacc;
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.5;
  }
`;

const ButtonLinkStyler = styled(({ btnRed, children, ...remain }) => (
  <span {...remain}>{children}</span>
))`
  font-family: 'Nunito Sans', sans-serif;
  transition: all 0.3s;
  ${({ btnRed }) => btnRed && 'color: #dc3545;'}
  &:focus,
  &:hover {
    ${({ btnRed }) => btnRed && 'color: #8b0000;'}
    cursor: pointer;
  }
  &:disabled {
    opacity: 0.7;
  }
`;

export { BigButtonStyler, ButtonStyler, ButtonLineStyler, ButtonLinkStyler };
