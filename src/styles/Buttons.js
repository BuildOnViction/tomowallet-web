import styled from 'styled-components';
const BigButtonStyler = styled.button`
  ${({ btnBlue }) =>
    btnBlue ? 'background-color:#5692cd;color:#fff;' : 'background-color:#e4ae63;color: #444b64'}
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
  btnBlue ? 'background-color:#4076AC;color:#fff;' : 'background-color:#C59148;color:#444b64'}
  }
  &:focus {
    outline: none;
  }
`;

const ButtonStyler = styled.button`
  width: 100%;
  min-width: 0px;
  max-width: 100%;
  min-height: 40px;
  padding: 5px;
  background-color: ${({ outline, color }) =>
    outline ? 'white' : color || 'grey'};
  color: ${({ outline, color }) => (outline ? color || 'grey' : 'white')};
  border: 1px solid ${({ color }) => color || 'grey'};
  border-radius: 5px;
  &:hover:not(:disabled) {
    background-color: ${({ outline }) => (outline ? 'white' : 'dimgrey')};
    font-weight: ${({ outline }) => (outline ? 'bold' : '400')};
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.5;
  }
`;

export { BigButtonStyler, ButtonStyler };
