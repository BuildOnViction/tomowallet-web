/**
 *
 * TomoWallet - Import Wallet Page - Recovery Phrase/Private Key Tab - Style
 *
 */
// ===== IMPORTS =====
// Modules
import React from 'react';
import styled from 'styled-components';
import _get from 'lodash.get';
// ===================

// ===== STYLE =====
const RPOrPKFormStyler = styled(({ errors, children, ...remains }) => (
  <div {...remains}>{children}</div>
))`
  ul.nav-tabs {
    border: 0;
    border-bottom: 1px dashed #444b63;
    font-size: 16px;
    .nav-link {
      background: transparent !important;
      border: 0;
      color: #5e677f;
      margin-right: 50px;
      padding: 0 0 5px;
      cursor: pointer;
      position: relative;
      &.active {
        color: #9eaacc;
        &::before {
          content: '';
          background-color: #5692cd;
          border-radius: 25px;
          width: 100%;
          height: 2px;
          position: absolute;
          bottom: 0;
          left: 0;
          animation: slideRight 0.3s ease-out 1;
        }
      }
    }
  }
  .tab-content {
    .form-group {
      label[for='privateKey'] {
        svg {
          animation: ${({ errors }) =>
            _get(errors, 'privateKey', [].length > 0)
              ? 'bouncerHigh 0.5s linear 1'
              : 'none'};
        }
      }
      label[for='recoveryPhrase'] {
        svg {
          animation: ${({ errors }) =>
            _get(errors, 'recoveryPhrase', [].length > 0)
              ? 'bouncerHigh 0.5s linear 1'
              : 'none'};
        }
      }
    }
  }
`;
// =================

export { RPOrPKFormStyler };
