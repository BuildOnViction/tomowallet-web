import styled from 'styled-components';

const BigButtonStyler = styled.button`
  width: 600px;
  min-width: 0px;
  max-width: 100%;
  height: 60px;
  background-color: white;
  color: black;
  border: 1px solid dimgrey;
  border-radius: 30px;
  font-weight: 600;
  &:hover {
    background-color: dimgrey;
    color: white;
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
  &:hover {
    background-color: ${({ outline }) => (outline ? 'white' : 'dimgrey')};
    font-weight: ${({ outline }) => (outline ? 'bold' : '400')};
  }
  &:focus {
    outline: none;
  }
`;

export { BigButtonStyler, ButtonStyler };
