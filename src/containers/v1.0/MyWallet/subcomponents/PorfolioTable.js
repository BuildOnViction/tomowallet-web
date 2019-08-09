/**
 *
 * TomoWallet - My Wallet Page - Porfolio Table
 *
 * This component defines a table of tokens which current account owns,
 * including actions to send/receive with other accounts
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// Custom Components
import CommonTable from '../../../../components/Table';
// Utilities
import { withIntl } from '../../../../components/IntlProvider';
import porfolio from '../../../../utils/tableConfigurations/porfolio';
// ===================

// ===== MAIN COMPONENT =====
class PorfolioTable extends PureComponent {
  render() {
    const {
      intl: { formatMessage },
    } = this.props;
    return (
      <CommonTable
        data={[
          {
            tokenName: 'TOMO',
          },
        ]}
        setConfig={porfolio}
        getConfigProps={{
          formatMessage,
        }}
      />
    );
  }
}
// ==========================

// ===== PROP TYPES =====
PorfolioTable.propTypes = {
  /** React Intl's instance object */
  intl: PropTypes.object,
};

PorfolioTable.defaultProps = {
  intl: {},
};
// ======================

export default withIntl(PorfolioTable);
