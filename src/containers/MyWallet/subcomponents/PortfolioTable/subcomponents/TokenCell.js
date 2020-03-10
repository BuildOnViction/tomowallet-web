/**
 *
 * TomoWallet - My Wallet Page - Portfolio Table - Token Cell
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import _get from 'lodash.get';
// Custom Components
import { TokenCellStyler } from '../style';
import Image from '../../../../../components/Image';
// Utilities, Constants & Styles
import { PORTFOLIO_COLUMNS } from '../../../constants';
import { MSG } from '../../../../../constants';
// ===================

// ===== MAIN COMPONENT =====
class TokenCell extends PureComponent {
  render() {
    const { formatMessage, values } = this.props;
    const tokenName = _get(values, [PORTFOLIO_COLUMNS.TOKEN_NAME], '');
    const tokenSymbol = _get(values, [PORTFOLIO_COLUMNS.SYMBOL], '');
    const iconSrc = _get(values, [PORTFOLIO_COLUMNS.ICON], '');
    return (
      <TokenCellStyler>
        <div className='block-symbol'>
          <Image
            src={iconSrc}
            alt={formatMessage(
              MSG.MY_WALLET_TABLE_PORTFOLIO_CELL_TOKEN_NAME_IMAGE_ALT,
              { name: tokenName },
            )}
          />
        </div>
        <div className='block-token'>
          <div className="block-token__name">{tokenSymbol}</div>
          <div className="block-token__publisher">{tokenName}</div>
        </div>
      </TokenCellStyler>
    );
  }
}
// ==========================

export default TokenCell;
