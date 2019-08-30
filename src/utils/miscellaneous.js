/**
 *
 * TomoWallet - Other Utilities
 *
 */
// ===== IMPORTS =====
// Modules
import _isNumber from 'lodash.isnumber';
// ===================

// ===== METHODS =====
export const shuffleArray = array => {
  let original = array;
  const result = [];

  while (original.length > 0) {
    // If the remaining array has only 1 element, add it directly to the result array
    if (original.length === 1) {
      result.push(original[0]);
      break;
    }

    const randomizedIndex = Math.floor((Math.random() * 100) % original.length);
    if (original[randomizedIndex]) {
      result.push(original[randomizedIndex]);
      original = original.filter((_, index) => index !== randomizedIndex);
    }
  }

  return result;
};

export const trimMnemonic = rawMnemonic => {
  const words = rawMnemonic
    .trim() // Remove beginning & end spaces
    .replace(/[\r\n]+/g, '') // Remove break-line characters
    .split(/[ ]+/);
  return words.join(' ');
};

export const convertLocaleNumber = (rawNumber, decimals = 3) => {
  if (_isNumber(rawNumber) && !isNaN(rawNumber)) {
    const convertedNumber =
      Math.floor(rawNumber * Math.pow(10, decimals)) / Math.pow(10, decimals);
    return convertedNumber.toLocaleString();
  }
  return 0;
};

export const removeTrailingZero = rawNumber => {
  let result = `${rawNumber}`;

  if (result.includes('.')) {
    result = result.replace(/0+$/, '');
    if (result.match(/\.$/)) {
      result = result.replace('.', '');
    }
  }

  return result;
};
// ===================
