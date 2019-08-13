/**
 *
 * TomoWallet - My Wallet Page - Porfolio Table - Token Cell
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
// Custom Components
// -- TO-DO: Update style for Token Name column cell
import { TokenCellStyler } from '../style';
// Constants
import { MSG } from '../../../../../../constants';
// IMAGES
import logoTomo from '../../../../../../assets/images/logo-tomo.png';
import logoKyper from '../../../../../../assets/images/logo-kyper.png';
import logoKucoin from '../../../../../../assets/images/logo-tomo.png';
// ===================

const LogoToken = [
  {
    logo: logoTomo,
  },
  {
    logo: logoKyper,
  },
  {
    logo: logoKucoin,
  },
];

// ===== MAIN COMPONENT =====
class TokenCell extends PureComponent {
  render() {
    const { formatMessage, value } = this.props;
    return (
      <TokenCellStyler>
        <div className='block-symbol'>
          {/* -- TO-DO: Add token's image source */}
          {/* {LogoToken.map((item) => ())} */}
          <img
            src={ logoTomo }
            alt={formatMessage(
              MSG.MY_WALLET_TABLE_PORFOLIO_CELL_TOKEN_NAME_IMAGE_ALT,
              { name: value },
            )}
          />
        </div>
        <div className='block-token'>
          <div className='block-token__name'>{value}</div>
          <div className='block-token__publisher'>
            {formatMessage(
              MSG.MY_WALLET_TABLE_PORFOLIO_CELL_TOKEN_NAME_PUBLISHER,
            )}
          </div>
        </div>
      </TokenCellStyler>
    );
  }
}
// ==========================

export default TokenCell;
