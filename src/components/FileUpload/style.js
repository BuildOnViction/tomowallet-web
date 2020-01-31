/**
 *
 * TomoWallet - File Upload Input - Style
 *
 */
// ===== IMPORTS =====
// Modules
import React from 'react';
import styled from 'styled-components';
// ===================

// ===== STYLE =====
const FileUploadInputStyler = styled(({ active, children, ...remains }) => (
  <div {...remains}>{children}</div>
))`
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .upload-area {
    width: 100%;
    height: 250px;
    cursor: pointer;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: 2px dashed ${props => props.theme.importItemBorder};
    color: ${({ uploaded }) => (uploaded ? '#9aa3b3' : 'inherit')};
    ${({ active }) => active && 'filter: brightness(120%);'}
    &:hover {
      filter: brightness(120%);
    }
    svg {
      width: 50px;
      height: 50px;
      margin-bottom: 15px;
      pointer-events: none;
    }
    .file-name {
      width: 100%;
      pointer-events: none;
    }
  }
  .upload-text {
    width: 250px;
    pointer-events: none;
  }
  input[type='file'] {
    display: none;
  }
`;
// =================

export { FileUploadInputStyler };
