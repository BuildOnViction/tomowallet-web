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

const MediumButtonStyler = styled.button`
  ${({ btnBlue }) =>
    btnBlue
      ? 'background-color:#5692cd;color:#ffffff;'
      : 'background-color:#e4ae63;color:#ffffff'}
  border: 0px;
  border-radius: 8px;
  display: flex;
  height: 34px;
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
  ({ action, btnBlue, btnYellow, children, theme, ...remain }) => (
    <button {...remain}>{children}</button>
  ),
)`
  ${({ btnYellow, btnBlue, theme }) => {
    if (btnYellow) {
      return `background-color:${theme.primaryButtonBg};color:${theme.primaryButtonColor};`;
    } else if (btnBlue) {
      return `background-color:${theme.secondButtonBg};color:${theme.primaryButtonColor};`;
    }
    return `background-color:${theme.normalButtonBg};color:${theme.normalButtonColor};`;
  }}
  border: 0px;
  border-radius: 8px;
  display: flex;
  height: 44px;
  padding: 0 2em;
  justify-content: center;
  align-items: center;
  font-family: 'Nunito Sans', sans-serif;
  transition: background-color 0.3s;
  width: ${props => props.width ? props.width : '100%'};
  &:hover {
    ${({ btnYellow, btnBlue, theme }) => {
      if (btnYellow) {
        return `background-color:${theme.primaryButtonBgHover};color:${theme.primaryButtonColorHover}`;
      } else if (btnBlue) {
        return `background-color:${theme.secondButtonBgHover};color:${theme.primaryButtonColorHover}`;
      }
      return `background-color:${theme.normalButtonBgHover};color:${theme.normalButtonColorHover}`;
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
  border: 1px solid ${props => props.theme.buttonLineBorder};
  border-radius: 8px;
  display: flex;
  height: 44px;
  padding: 0 2em;
  justify-content: center;
  align-items: center;
  font-family: 'Nunito Sans', sans-serif;
  transition: all 0.3s;
  width: 100%;
  color: ${props => props.theme.buttonLineColor};
  &:focus {
    outline: none;
  }
  &:disabled {
    border: none;
    background: ${props => props.theme.buttonLineDisabled}
  }
`;

const ButtonLinkStyler = styled(({ btnBlue, btnRed, children, ...remain }) => (
  <span {...remain}>{children}</span>
))`
  font-family: 'Nunito Sans', sans-serif;
  transition: all 0.3s;
  ${({ btnRed }) => btnRed && 'color: #dc3545;'}
  ${({ btnBlue }) => btnBlue && 'color: #5692cd;'}
  &:focus,
  &:hover {
    ${({ btnRed }) => btnRed && 'color: #8b0000;'}
    ${({ btnBlue }) => btnBlue && 'color: #0056b3;'}
    cursor: pointer;
  }
  &:disabled {
    opacity: 0.7;
  }
`;

export {
  BigButtonStyler,
  MediumButtonStyler,
  ButtonStyler,
  ButtonLineStyler,
  ButtonLinkStyler,
};
