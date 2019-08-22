import styled from 'styled-components';
import {
  Card,
} from 'reactstrap';
// Style Component//

const BoxBtnStyler = styled.div`
  max-width: 370px;
  text-align: center;
`;
const ContainerMin = styled.div`
  background-color: #272d40;
  border-radius: 8px;
  padding: 3em 2em;
  max-width: 600px;
  margin: 0 auto;
`;
const BoxCardStyled = styled(Card)`
  padding: 0 3em;
`;
const BoxImages = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  canvas {
    border: 7px solid #fff;
    border-radius: 3px;
    display: flex;
  }
`;
const BoxFlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
`;

export {
  BoxBtnStyler,
  ContainerMin,
  BoxCardStyled,
  BoxImages,
  BoxFlexBetween,
};
