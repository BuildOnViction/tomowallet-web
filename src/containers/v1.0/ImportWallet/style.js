import styled from 'styled-components';
import {
  Jumbotron,
  Card,
  FormText,
} from 'reactstrap';

const BackgroundStyler = styled(Jumbotron)`
  min-height: 100vh;
  color: dimgrey;
  .create-wallet__text {
    font-size: 18px;
    .create-wallet__link {
      color: cornflowerblue;
      font-weight: 500;
      &:hover {
        cursor: pointer;
        color: royalblue;
      }
    }
  }
  .import-type {
    .col {
      flex: 1;
      flex-direction: column;
    }
  }
`;

const BoxCardStyled = styled(Card)`
  padding: 0 3em;
`;

const FormTextStyled = styled(FormText)`
  font-size: 14px;
  color: #9eaacc !important;
  line-height: 1.7;
  margin-top: 30px;
`;

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
  BackgroundStyler,
  ImporWalletStyler,
  BoxCardStyled,
  FormTextStyled,
};
