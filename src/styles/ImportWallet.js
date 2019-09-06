import styled from 'styled-components';
// Style Component//

const ImporWalletStyler = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding: 1.5em 1.5em;
  position: relative;
  transition: 0.3s;
  text-align: center;
  ${({ isActive }) =>
    isActive
      ? 'background-color: #2d344a;border: solid 1px #2d344a;border-top: 5px solid #e4ae63;'
      : 'border: solid 1px #444b64;border-top: solid 5px #444b64;'}
  .text-end {
    margin-top: auto !important;
  }
  .card-img {
    width: 40px;
  }
  .card-body {
    .card-title {
      margin-bottom: 0px;
      font-size: 20px;
      ${({ isActive }) => isActive && 'font-weight: bold;'}
    }
  }
`;
export { ImporWalletStyler };
