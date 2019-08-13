/**
 *
 * TomoWallet - Utilities - Validations
 *
 */
// ===== IMPORTS =====
// Modules
import { isEmpty as _isEmpty, isNumber as _isNumber } from 'lodash';
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

const isHex = web3 => ({ name, value }, message) => {
  if (!_isEmpty(value) && !web3.utils.isHex(value)) {
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

const isAddress = web3 => ({ name, value }, message) => {
  if (!_isEmpty(value) && !web3.utils.isAddress(value)) {
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
// =======================

export default web3 => ({
  isRequired,
  isMaxNumber,
  isMinNumber,
  isMaxLength,
  isHex: isHex(web3),
  isAddress: isAddress(web3),
});
