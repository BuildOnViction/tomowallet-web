
import styled from 'styled-components';
const BigButtonStyler = styled.button`
  ${({ btnBlue }) =>
    btnBlue ? 'background-color:#5692cd;color:#ffffff;' : 'background-color:#e4ae63;color:#ffffff'}
  border: 0px;
  border-radius: 8px;
  display: flex;
  height: 44px;
  padding: 0 2em;
  justify-content: center;
  align-items: center;
  font-family: 'Nunito Sans', sans-serif;
  transition: all .3s;
  width: 100%;
  &:hover {
    ${({ btnBlue }) =>
  btnBlue ? 'background-color:#4076AC;color:#ffffff;' : 'background-color:#C59148;color:#ffffff'}
  }
  &:focus {
    outline: none;
  }
`;

const ButtonStyler = styled.button`
  ${({ btnYellow }) =>
  btnYellow ? 'background-color:#e4ae63;color:#444b64' : 'background-color:#2d344a;color:#9eaacc;'}
  border: 0px;
  border-radius: 8px;
  display: flex;
  height: 44px;
  padding: 0 2em;
  justify-content: center;
  align-items: center;
  font-family: 'Nunito Sans', sans-serif;
  transition: all .3s;
  width: 100%;
  &:hover {
    ${({ btnYellow }) =>
  btnYellow ? 'background-color:#C59148;color:#444b64' : 'background-color:#3D496E;color:#9eaacc;'}
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
  transition: all .3s;
  width: 100%;
  color: #9eaacc;
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.5;
  }
`;

export { BigButtonStyler, ButtonStyler, ButtonLineStyler };
