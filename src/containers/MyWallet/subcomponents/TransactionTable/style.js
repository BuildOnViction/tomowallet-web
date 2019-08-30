import styled from 'styled-components';
// ===================

const BoxTransaction = styled.div`
  .rt-tr {
    display: grid;
    grid-template-columns: 20% 20% 20% 5% 20% 15%;
    @media (max-width: 991px) {
      grid-template-columns: 20% 17% 20% 7% 20% 16%;
    }
  }
`;

// =================

export { BoxTransaction };
