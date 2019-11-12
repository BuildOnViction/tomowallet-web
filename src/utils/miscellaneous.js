/**
 *
 * TomoWallet - Other Utilities
 *
 */
// ===== IMPORTS =====
// Modules
import _isNumber from "lodash.isnumber";
import _get from "lodash.get";
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
  if (rawMnemonic) {
    const words = rawMnemonic
      .trim() // Remove beginning & end spaces
      .replace(/[\r\n]+/g, "") // Remove break-line characters
      .split(/[ ]+/);
    return words.join(" ");
  }
  return "";
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

  if (result.includes(".")) {
    result = result.replace(/0+$/, "");
    if (result.match(/\.$/)) {
      result = result.replace(".", "");
    }
  }

  return result;
};

export const copyToClipboard = content => {
  const textHolder = document.createElement("input");
  textHolder.defaultValue = content;
  document.body.appendChild(textHolder);
  textHolder.select();
  document.execCommand("copy");
  document.body.removeChild(textHolder);
};

export const downloadFile = ({ content, name, type }) => {
  const link = document.createElement("a");
  const blob = new Blob([content], { type });
  link.href = URL.createObjectURL(blob);
  let extension = "";
  let regExp = "";
  switch (type) {
    case "plain/text":
      extension = ".txt";
      regExp = /\.txt$/;
      break;
    case "application/json":
      extension = ".json";
      regExp = /\.json$/;
      break;
    default:
      break;
  }
  link.download = `${name.replace(regExp, "")}${extension}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const changeInputWithSubmit = updateInput => event => {
  const newValue = _get(event, "target.value", "");
  const isSubmitted = newValue.lastIndexOf("\n") === newValue.length - 1;
  if (!isSubmitted && updateInput) {
    updateInput(newValue);
  }
};

export const detectSubmit = handleSubmit => event => {
  if (event.keyCode === 13 && handleSubmit) {
    handleSubmit(event);
  }
};
// ===================
