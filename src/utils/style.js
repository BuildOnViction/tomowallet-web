import { secondaryColor, whiteColor } from "../styles/variables";

const hexToRGB = colorHex => {
  if (/^#([0-9A-F]{3}){1,2}$/i.test(colorHex)) {
    let R = parseInt(colorHex.substring(1, 3), 16);
    let G = parseInt(colorHex.substring(3, 5), 16);
    let B = parseInt(colorHex.substring(5, 7), 16);
    return {
      R,
      G,
      B
    };
  }

  return null;
};

export const calculateContrastColor = colorHex => {
  const colorRGB = hexToRGB(colorHex);

  if (colorRGB) {
    const luma =
      colorRGB.R * 0.2126 + colorRGB.G * 0.7152 + colorRGB.B * 0.0722;
    return luma >= 165 ? secondaryColor : whiteColor;
  }
  return null;
};

export const lightenDarkenColor = (colorHex, percent) => {
  if (/^#([0-9A-F]{3}){1,2}$/i.test(colorHex)) {
    let R = parseInt(colorHex.substring(1, 3), 16);
    let G = parseInt(colorHex.substring(3, 5), 16);
    let B = parseInt(colorHex.substring(5, 7), 16);

    if (percent > 100) {
      // Lighten
      const refinedPercent = percent > 200 ? 200 : percent;
      R =
        R === 0
          ? parseInt((255 * (refinedPercent - 100)) / 100)
          : parseInt(R + ((255 - R) * (refinedPercent - 100)) / 100);
      G =
        G === 0
          ? parseInt((255 * (refinedPercent - 100)) / 100)
          : parseInt(G + ((255 - G) * (refinedPercent - 100)) / 100);
      B =
        B === 0
          ? parseInt((255 * (refinedPercent - 100)) / 100)
          : parseInt(B + ((255 - B) * (refinedPercent - 100)) / 100);
    } else if (percent < 100) {
      // Darken
      const refinedPercent = percent < 0 ? 0 : percent;
      R = parseInt((R * refinedPercent) / 100);
      G = parseInt((G * refinedPercent) / 100);
      B = parseInt((B * refinedPercent) / 100);
    }

    const RR =
      R.toString(16).length === 1 ? `0${R.toString(16)}` : R.toString(16);
    const GG =
      G.toString(16).length === 1 ? `0${G.toString(16)}` : G.toString(16);
    const BB =
      B.toString(16).length === 1 ? `0${B.toString(16)}` : B.toString(16);

    return `#${RR}${GG}${BB}`;
  }

  return colorHex;
};
