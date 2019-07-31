import styled from 'styled-components';
import { Modal } from 'reactstrap';

const ModalStyles = styled(Modal)`
  margin-top: 25vh;
  width: 550px;
  min-width: 0px;
  max-width: 90vw;
  font-size: 16px;
  color: dimgrey;
  .modal-header {
    ${({ title }) => !title && 'border: none;'}
    button.close {
      font-size: 26px;
    }
  }
  .modal-body {
    padding: 0px;
  }
  .modal-footer {
    border: none;
    margin: 10px 50px 40px 50px;
    padding: 0px;
  }
`;

export default ModalStyles;
