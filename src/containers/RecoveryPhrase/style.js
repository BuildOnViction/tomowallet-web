import styled from 'styled-components';
import { Jumbotron } from 'reactstrap';
import Popup from '../../components/Popup';

const BackgroundStyler = styled(Jumbotron)`
  color: dimgrey;
  .import-wallet {
    font-size: 18px;
    .import-wallet__link {
      color: cornflowerblue;
      font-weight: 500;
      &:hover {
        cursor: pointer;
        color: royalblue;
      }
    }
  }
  .warning-content {
    img {
      width: 70px;
      height: 70px;
    }
    .card-title {
      font-size: 18px;
    }
    .card-text {
      font-size: 15px;
      &.danger {
        color: red;
      }
    }
  }
  .phrase-generator-content {
    .card-title {
      font-size: 20px;
    }
    .card-text {
      font-size: 15px;
    }
    .phrase-box {
      border: 2px solid lightgrey;
      border-radius: 3px;
    }
    .svg-inline--fa {
      font-size: 36px;
      cursor: pointer;
    }
  }
`;

const ConfirmationPopupStyler = styled(Popup)`
  .modal-body {
    .svg-inline--fa {
      font-size: 42px;
    }
  }
`;

const VerificationPopupStyler = styled(Popup)`
  margin-top: 15vh;
  .modal-body {
    .card-body {
      margin: 0px 50px;
      padding: 0px;
      .phrase-box {
        border: 1px solid dimgrey;
        border-radius: 3px;
        .phrase-word {
          position: relative;
          cursor: pointer;
          .svg-inline--fa {
            display: none;
            position: absolute;
            left: 100%;
            top: -1px;
          }
          &:hover {
            text-decoration: underline;
            .svg-inline--fa {
              display: inline-block;
            }
          }
        }
      }
    }
  }
`;

const SuccessPopupStyler = styled(Popup)`
  width: 500px;
  .modal-body {
    .card-body {
      .svg-inline--fa {
        color: green;
        font-size: 110px;
      }
      .card-title {
        font-weight: bold;
        font-size: 22px;
      }
      .card-text {
        font-size: 18px;
      }
    }
  }
  .modal-footer {
    button {
      width: 60%;
      margin-left: 20%;
    }
  }
`;

export {
  BackgroundStyler,
  ConfirmationPopupStyler,
  VerificationPopupStyler,
  SuccessPopupStyler,
};
