import styled from 'styled-components';

const WelcomeSection = styled.section`
    margin-bottom: 30px;
    margin-top: 34px;

    h1 {
        margin-bottom: 5px;
        font-family: 'Bai Jamjuree', sans-serif;
        font-size: 14px;
        font-weight: 500;
        color: ${props => props.theme.headingColor};
        text-transform: uppercase;
    }

    p {
        margin-bottom: 0;
    }
`

export { WelcomeSection };