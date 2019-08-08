import React from 'react';
import styled from 'styled-components';
import { Jumbotron, Card } from 'reactstrap';

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

const ImportTypeCardStyler = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 100%;
  position: relative;
  transition: 0.1s;
  text-align: center;
  ${({ isActive }) =>
    isActive
    ? 'background-color: #2d344a;border-top: 5px solid #e4ae63;'
      : 'opacity: 0.5;'
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

const BoxInner = styled.div`
  border-radius: 8px;
  border: solid 1px #444b64;
`;

const RPOrPKFormStyler = styled.div`
  position: relative;
  width: 100%;
  height: 130px;
  padding: 45px 20px 20px 20px;
  background-color: white;
  textarea {
    border: none;
    box-shadow: none;
    text-align: center;
    resize: none;
    &::placeholder {
      color: darkgrey;
    }
  }
  .lock-unlock-icon {
    position: absolute;
    top: 10px;
    left: 15px;
    width: 20px;
    height: 20px;
    color: darkgrey;
    &:hover {
      color: dimgrey;
    }
  }
  .import-by-qrcode {
    font-weight: 600;
  }
`;

export { BackgroundStyler, ImportTypeCardStyler, RPOrPKFormStyler, BoxInner };
