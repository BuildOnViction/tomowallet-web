import styled from 'styled-components';
// ===================

const BoxTransaction = styled.div`
  .rt-tr {
    display: grid;
    grid-template-columns: 10% 20% 15% 20% 5% 20% 10%;
    @media (max-width: 991px) {
      grid-template-columns: 10% 18% 15% 18% 5% 18% 14%;
    }
  }
`;

// =================

export { BoxTransaction };
