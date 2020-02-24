import styled from "styled-components";
import { primaryColor } from "./variables";
import { lightenDarkenColor } from "../utils/style";
// Style Component//

const HeadingBig = styled.h1`
  color: #ffffff;
  font-size: 50px;
  font-weight: 600;
  font-family: "Bai Jamjuree", sans-serif;
`;
const HeadingLarge = styled.h2`
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  font-family: "Bai Jamjuree", sans-serif;
`;
const HeadingMedium = styled.h3`
  color: #ffffff;
  font-size: 16px;
`;
const HeadingSmall = styled.h2`
  font-size: 14px;
  text-transform: uppercase;
  margin-bottom: 15px;
`;
const NoticeTextRed = styled.span`
  color: #be445e;
`;
const TextLinkBlue = styled.a`
  color: #5692cd;
`;
const TextBlue = styled.span`
  color: #5692cd;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: #0056b3;
  }
`;
const TextYellow = styled.span`
  color: ${primaryColor};
`;
const TextLinkYellow = styled.a`
  color: ${primaryColor} !important;
  cursor: pointer;
`;
const TextYellowPointer = styled.span`
  color: ${primaryColor};
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: ${lightenDarkenColor(primaryColor, 80)};
  }
`;
const TextGray = styled.div`
  color: #5e677f;
`;
const BoxText = styled.div``;
export {
  HeadingBig,
  HeadingLarge,
  HeadingMedium,
  HeadingSmall,
  NoticeTextRed,
  TextLinkBlue,
  TextBlue,
  TextYellow,
  TextLinkYellow,
  TextYellowPointer,
  BoxText,
  TextGray
};
