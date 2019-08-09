import styled from 'styled-components';
import {  } from 'reactstrap';
// Style Component//

const ImporWalletStyler = styled.div`
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding: 2.5em 1.5em;
  position: relative;
  transition: 0.3s;
  text-align: center;
  ${({ isActive }) =>
    isActive
      ? 'background-color: #2d344a;border: solid 1px #2d344a;border-top: 5px solid #e4ae63;' : 'border: solid 1px #444b64;border-top: solid 5px #444b64;'
  }
  .card-img {
    width: 40px;
  }
  .card-body {
    .card-title {
      margin-bottom: 0px;
      font-size: 20px;
      ${({ isActive }) => isActive && 'font-weight: bold;'}
    }
  }
`;
export {
  ImporWalletStyler,
};

