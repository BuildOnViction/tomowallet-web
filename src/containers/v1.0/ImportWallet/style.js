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

const ImportTypeCardStyler = styled(({ isActive, ...remains }) => (
  <Card {...remains} />
))`
  ${({ isActive }) =>
    isActive
      ? 'box-shadow: 2px 2px 3px lightgrey, -2px 2px 3px lightgrey;'
      : 'opacity: 0.5;'}
  width: 100%;
  height: 100%;
  position: relative;
  transition: 0.1s;
  .card-img {
    width: 70px;
    height: 70px;
  }
  .card-body {
    .card-title {
      margin-bottom: 0px;
      font-size: 20px;
      ${({ isActive }) => isActive && 'font-weight: bold;'}
    }
  }
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

export { BackgroundStyler, ImportTypeCardStyler, RPOrPKFormStyler };
