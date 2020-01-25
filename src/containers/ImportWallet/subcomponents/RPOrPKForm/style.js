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
    border-bottom: 1px dashed ${props => props.theme.importItemBorder};
    font-size: 16px;
    .nav-link {
      background: transparent !important;
      border: 0;
      color: ${props => props.theme.tabColor};
      margin-right: 50px;
      padding: 0 0 5px;
      cursor: pointer;
      position: relative;
      &.active {
        color: ${props => props.theme.tabActiveColor};
        &::before {
          content: '';
          background-color: ${props => props.theme.tabBackground};
          border-radius: 25px;
          width: 30px;
          height: 2px;
          position: absolute;
          bottom: 0;
          left: 0;
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
