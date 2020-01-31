/**
 *
 * TomoWallet - My Wallet Page - Data Tables
 *
 * This component consists of token & transaction data, including some action
 * to interact (view details, send/receive...)
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
// Custom Components
import PortfolioTable from './PortfolioTable';
import TransactionTable from './TransactionTable';
// Constants
import { LIST } from '../../../constants';
import { MainTabWrapper } from '../../../styles';
// ===================

// ===== MAIN COMPONENT =====
class DataTables extends PureComponent {
  render() {
    const {
      setTableType,
      tableType,
      openSendTokenPopup,
      openDepositPrivacyPopup,
      openWithdrawPrivacyPopup
    } = this.props;
    return (
      <MainTabWrapper>
        <Nav tabs className='mt-5 mb-4'>
          {LIST.MY_WALLET_TABLE_TYPES.map((tab, tabIdx) => (
            <NavItem key={`table_tab_${tabIdx + 1}`}>
              <NavLink
                active={tab.value === tableType}
                onClick={() => setTableType(tab.value)}
              >
                {tab.label}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={tableType}>
          <TabPane tabId={LIST.MY_WALLET_TABLE_TYPES[0].value}>
            <PortfolioTable
              isActive={tableType === LIST.MY_WALLET_TABLE_TYPES[0].value}
              openSendTokenPopup={openSendTokenPopup}
              openDepositPrivacyPopup={openDepositPrivacyPopup}
              openWithdrawPrivacyPopup={openWithdrawPrivacyPopup}
            />
          </TabPane>
          <TabPane tabId={LIST.MY_WALLET_TABLE_TYPES[1].value}>
            <TransactionTable
              isActive={tableType === LIST.MY_WALLET_TABLE_TYPES[1].value}
            />
          </TabPane>
        </TabContent>
      </MainTabWrapper>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
DataTables.propTypes = {
  /** Action to open receive token's popup */
  openReceiveTokenPopup: PropTypes.func,
  /** Action to open send token's popup */
  openSendTokenPopup: PropTypes.func,
  /** Action to set current table tab */
  setTableType: PropTypes.func,
  /** Value to determine highlighted table tab */
  tableType: PropTypes.string,
  /** Action to open deposit privacy popup */
  openDepositPrivacyPopup: PropTypes.func,
  /** Action to open withdraw privacy popup */
  openWithdrawPrivacyPopup: PropTypes.func,
};

DataTables.defaultProps = {
  openReceiveTokenPopup: () => {},
  openSendTokenPopup: () => {},
  setTableType: () => {},
  tableType: 0,
  openDepositPrivacyPopup: () => {},
  openWithdrawPrivacyPopup: () => {},
};
// ======================

export default DataTables;
