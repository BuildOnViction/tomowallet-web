import styled from 'styled-components';
// Style Component//

const HeadingBig = styled.h1`
  color: #ffffff;
  font-size: 50px;
  font-weight: 600;
  font-family: 'Bai Jamjuree', sans-serif;
`;
const HeadingLarge = styled.h2`
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  font-family: 'Bai Jamjuree', sans-serif;
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
  color: #5692CD;
`;
const TextBlue = styled.span`
  color: #5692CD;
  cursor: pointer;
  letter-spacing: 1px;
  transition: all .3s;
  &:hover {
    color: #0056b3;
  }
`;
const TextYellow = styled.span`
  color: #e4ae63;
`;
const TextLinkYellow = styled.a`
  color: #e4ae63;
  cursor: pointer;
`;
const TextYellowPointer = styled.span`
  color: #e4ae63;
  cursor: pointer;
  transition: all .3s;
  &:hover {
    color: #C59148;
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
  TextGray,
};
