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
