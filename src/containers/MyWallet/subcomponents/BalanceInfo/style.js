import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 33.33%;
`

const BalanceMode = styled.div`
  padding-left: 16px;
  
  .title {
    position: relative;

    &::before {
      content: "";
      height: 6px;
      width: 6px;
      border-radius: 50%;
      position: absolute;
      left: -16px;
      top: 50%;
      transform: translateY(-50%)
    }
  }
`

const BalanceMain = styled(BalanceMode)`
  .title::before {
    background: #4B96CD;
  }
`

const BalancePrivacy = styled(BalanceMode)`
  .title::before {
    background: #E4AE63;
  }
`

const TextTitle = styled.div.attrs({
  className: 'title',
})`
  color: ${props => props.theme.boxTitleColor};
  font-size: 14px;
  margin-bottom: 0;
`

const TextValue = styled.div.attrs({
  className: 'value text-truncate',
})`
  font-family: 'Bai Jamjuree', sans-serif;
  font-size: 14px;
  color: ${props => props.theme.boxValueColor};
`

const Ellipsis = styled.span.attrs({
  className: 'text-truncate',
})`
  display: block;
  width: 100%;
`

export { Wrapper, Col, BalanceMain, BalancePrivacy, TextTitle, TextValue, Ellipsis };