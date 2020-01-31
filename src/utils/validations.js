/**
 *
 * TomoWallet - Utilities - Validations
 *
 */
// ===== IMPORTS =====
// Modules
import _isEmpty from 'lodash.isempty';
import _isNumber from 'lodash.isnumber';
// Utilities
import { isHex, isAddress, isPrivacyAddress } from './blockchain/utilities';
// ===================

// ===== VALIDATIONS =====
export const mergeErrors = (newErrors, oldErrors = {}) => {
  if (!_isEmpty(newErrors)) {
    let result = oldErrors;
    newErrors.forEach(error => {
      const compareKey = Object.keys(error)[0];
      if (Object.keys(result).includes(compareKey)) {
        result = {
          ...result,
          [compareKey]: [...result[compareKey], ...error[compareKey]],
        };
      } else {
        result = {
          ...result,
          ...error,
        };
      }
    });
    return result;
  }
  return oldErrors;
};

const isRequired = ({ name, value }, message) => {
  if (_isEmpty(value) && !_isNumber(value)) {
    return {
      [name]: [message],
    };
  }
  return {};
};

const isHexNumber = ({ name, value }, message) => {
  if (!_isEmpty(value) && !isHex(value)) {
    return {
      [name]: [message],
    };
  }
  return {};
};

const isMaxNumber = ({ name, value, max }, message) => {
  if (!_isEmpty(value) && value > max) {
    return {
      [name]: [message],
    };
  }
  return {};
};

const isMinNumber = ({ name, value, min }, message) => {
  if (!_isEmpty(value) && value < min) {
    return {
      [name]: [message],
    };
  }
  return {};
};

const isWalletAddress = ({ name, value }, message) => {
  if (!_isEmpty(value) && !isAddress(value)) {
    return {
      [name]: [message],
    };
  }
  return {};
};

const isMaxLength = ({ name, value, max }, message) => {
  if (!_isEmpty(value) && value.length > max) {
    return {
      [name]: [message],
    };
  }
  return {};
};

const isMinLength = ({ name, value, min }, message) => {
  if (!_isEmpty(value) && value.length < min) {
    return {
      [name]: [message],
    };
  }
  return {};
};

const isPrivacyWallet = ({ name, value }, message) => {
  if (!_isEmpty(value) && !isPrivacyAddress(value)) {
    return {
      [name]: [message],
    };
  }
  return {};
};
// =======================

export default {
  isWalletAddress,
  isHexNumber,
  isMaxLength,
  isMaxNumber,
  isMinLength,
  isMinNumber,
  isRequired,
  isPrivacyWallet,
};
