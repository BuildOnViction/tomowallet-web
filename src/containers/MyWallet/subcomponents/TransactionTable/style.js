import styled from 'styled-components';
// ===================

const BoxTransaction = styled.div`
  .rt-tr {
    display: grid;
    grid-template-columns: 20% 20% 20% 5% 20% 15%;
    .rt-th {
      position: relative;
      &:not(.no-header):before {
        content '';
        position: absolute;
        bottom: 0;
        left: 2%;
        width: 20px;
        height: 0;
        border-left: 10px solid #5e677f;
        border-bottom: 3px solid #5e677f;
        border-top: 3px solid transparent;
        border-right: 10px solid transparent;
      }
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 2%;
        width: 96%;
        height: 1px;
        background-color: #5e677f;
      }
    }
    @media (max-width: 991px) {
      grid-template-columns: 20% 17% 20% 7% 20% 16%;
    }
  }
`;

// =================

export { BoxTransaction };
