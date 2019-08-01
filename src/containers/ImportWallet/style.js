import styled from 'styled-components';
import { Jumbotron } from 'reactstrap';

const BackgroundStyler = styled(Jumbotron)`
  color: dimgrey;
  .create-wallet {
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

export { BackgroundStyler };
