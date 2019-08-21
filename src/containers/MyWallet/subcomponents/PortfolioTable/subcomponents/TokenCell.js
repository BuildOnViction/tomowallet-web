/**
 *
 * TomoWallet - My Wallet Page - Portfolio Table - Token Cell
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
// Custom Components
import { TokenCellStyler } from '../style';
// Constants & Styles
import { MSG } from '../../../../../constants';
import logoTomo from '../../../../../assets/images/logo-tomo.png';
import logoKyper from '../../../../../assets/images/logo-kyper.png';
import logoKucoin from '../../../../../assets/images/logo-kucoin.png';
// ===================

const LogoToken = {
  TOMO: logoTomo,
  KYPER: logoKyper,
  KUCOIN: logoKucoin,
};

// ===== MAIN COMPONENT =====
class TokenCell extends PureComponent {
  render() {
    const { formatMessage, value } = this.props;
    return (
      <TokenCellStyler>
        <div className='block-symbol'>
          <img
            src={LogoToken[value]}
            alt={formatMessage(
              MSG.MY_WALLET_TABLE_PORTFOLIO_CELL_TOKEN_NAME_IMAGE_ALT,
              { name: value },
            )}
          />
        </div>
        <div className='block-token'>
          <div className='block-token__name'>{value}</div>
          <div className='block-token__publisher'>
            {formatMessage(
              MSG.MY_WALLET_TABLE_PORTFOLIO_CELL_TOKEN_NAME_PUBLISHER,
            )}
          </div>
        </div>
      </TokenCellStyler>
    );
  }
}
// ==========================

export default TokenCell;
