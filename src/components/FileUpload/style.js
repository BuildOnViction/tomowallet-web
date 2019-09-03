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
  <label {...remains}>{children}</label>
))`
  height: 40px;
  display: flex !important;
  align-items: center;
  ${({ active }) => active && 'filter: brightness(120%);'}
  &:hover {
    filter: brightness(120%);
  }
  .upload-button {
    width: 33%;
    height: 100%;
    margin: 0px;
    padding: 0px 10px;
    border: 0px;
    border-radius: 0px 0px 0px 8px;
    background-color: #e4ae63;
    color: #444b64;
    line-height: 40px;
    text-align: center;
    pointer-events: none;
  }
  .upload-input {
    width: 67%;
    height: 100%;
    margin: 0px;
    padding-left: 10px;
    border: 2px dashed #3f3e4e;
    border-left: 0px;
    border-radius: 0px 0px 8px 0px;
    line-height: 40px;
    .loaded {
      color: #9aa3b3;
    }
    pointer-events: none;
  }
  input[type='file'] {
    display: none;
  }
`;
// =================

export { FileUploadInputStyler };
