/**
 *
 * TomoWallet - My Wallet Page - Address Information
 *
 * This component shows basic information of current account address,
 * including options to send/receive tokens.
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
// Utilities & Constants
import { withWeb3 } from '../../../components/Web3';
import { withIntl } from '../../../components/IntlProvider';
import { withGlobal } from '../../../utils';
import {canClaim, claimToken} from "../../../utils/blockchain";
import _get from "lodash.get";
import styled from "styled-components";
// ===================

// ===== STYLE =====
const StyledClaimInfo = styled.div`
  margin-bottom: 30px;
  .box-green {
    background: green;
  }
  .w-60 {
      max-width: 60%!important;
      margin: auto;
  }
  .claim {
    background-color:rgb(248, 45, 58);
    color:#ffffff;
    border: 0px;
    border-radius: 8px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: inline-block;
    height: 34px;
    padding: 0 2em;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-family: "Nunito Sans",sans-serif;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }
  .bg_red {
      border: 1px solid rgb(248, 45, 58);
      background: rgba(248, 45, 58, 0.05)!important;
      padding: 1rem;
      color: rgb(248, 45, 58);
  }
`
// =================

// ===== MAIN COMPONENT =====
class ClaimInfo extends PureComponent {
  constructor() {
    super();

    this.state = {
      amount: 0
    }

    this.handleClaim = this.handleClaim.bind(this);
    this.getHowManyLitCanClaim = this.getHowManyLitCanClaim.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (_get(this.props, 'wallet.address') && _get(prevProps, 'wallet.address') !== _get(this.props, 'wallet.address')) {
      this.getHowManyLitCanClaim()
    }
  }

  handleClaim(guy) {
    const { web3 } = this.props;
    claimToken(web3, guy)
  }

  getHowManyLitCanClaim() {
    const {
      web3,
      wallet,
    } = this.props;
    const walletAddress = _get(wallet, 'address', '');
    canClaim(web3, walletAddress).then(amount => {
      this.setState({ amount })
    })
  }

  render() {
    const {
      wallet,
    } = this.props;
    const walletAddress = _get(wallet, 'address', '');

    return this.state.amount > 0 ? (
      <StyledClaimInfo>
        <div className='box-address'>
          <div className='bg_gray bg_red text-center'>
            <div className='w-60'>
              <p>
                Congratulations! You are eligible to receive our welcoming event reward.
                Please click "Claim {this.state.amount} LIT (TRC21) reward" and enjoy our gift!
              </p>
              <button className='claim' onClick={() => this.handleClaim(walletAddress)}>
                {`Claim ${this.state.amount} LIT (TRC21) reward`}
              </button>
            </div>
          </div>
        </div>
      </StyledClaimInfo>
    ) : null
  }
}
// ==========================

// ===== PROP TYPES =====
ClaimInfo.propTypes = {
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Wallet's data */
  wallet: PropTypes.object,
};

ClaimInfo.defaultProps = {
  intl: {},
  wallet: {},
};
// ======================

export default compose(
  withGlobal,
  withIntl,
  withWeb3,
)(ClaimInfo);
