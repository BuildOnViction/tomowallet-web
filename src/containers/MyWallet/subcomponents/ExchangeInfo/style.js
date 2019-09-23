/**
 *
 * TomoWallet - My Wallet Page - Exchange Information Style
 *
 */
// ===== IMPORTS =====
// Modules
import styled from 'styled-components';
// ===================

// ===== STYLES =====
const ExchangeInfoStyler = styled.div`
  * {
    border-width: 0px;
    border-color: #5e677f;
  }
  .exchange-info__container {
    min-width: 285px;
    .exchange-info__data {
      float: right;
      width: 67%;
      border: none;
      text-align: left;
      padding: 5px 0px;
      line-height: 25px;
      .exchange-info__data-title {
        font-size: 18px;
        a {
          text-decoration: none;
          color: #e4ae63;
        }
      }
      .exchange-info__data-rate--usd {
        font-size: 16px;
        span {
          color: #009e73;
        }
        animation: ${({ isLoaded }) =>
          isLoaded ? 'blinker 0.5s linear 1' : 'none'};
      }
      .exchange-info__data-rate--btc {
        font-size: 12px;
        color: #5e677f;
      }
    }
    .exchange-info__icon {
      width: 33%;
      padding: 5px 0px;
      text-align: center;
      img {
        margin: auto;
      }
      animation: ${({ isLoaded }) =>
        isLoaded ? 'bouncer 0.5s linear 1' : 'none'};
    }
    .exchange-info__charts {
      padding-top: 10px;
      overflow: hidden;
      clear: both;
      .exchange-info__charts-box {
        width: 33%;
        padding: 0;
        float: left;
        text-align: center;
        border-left: 1px solid #3a4152;
        font-size: 12px;
        line-height: 1.25em;
        text-transform: uppercase;
        &:first-child {
          border: 0;
          span {
            font-size: 17px;
          }
        }
        span {
          font-size: 14px;
          span {
            font-size: 9px;
          }
        }
      }
    }
  }
`;
// ==================

export { ExchangeInfoStyler };
