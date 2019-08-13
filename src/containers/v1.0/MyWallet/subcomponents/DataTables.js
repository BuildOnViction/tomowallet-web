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
import PorfolioTable from './PorfolioTable';
import TransactionTable from './TransactionTable';
// Constants
import { LIST } from '../../../../constants';
// -- TO-DO: Add style for Data Table tabs component
// ===================

// ===== MAIN COMPONENT =====
class DataTables extends PureComponent {
  render() {
    const { setTableType, tableType, openSendTokenPopup } = this.props;
    return (
      <div>
        <Nav tabs>
          {LIST.TABLE_TYPES.map((tab, tabIdx) => (
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
          <TabPane tabId={LIST.TABLE_TYPES[0].value}>
            <PorfolioTable openSendTokenPopup={openSendTokenPopup} />
          </TabPane>
          <TabPane tabId={LIST.TABLE_TYPES[1].value}>
            <TransactionTable />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
DataTables.propTypes = {
  /** Action to set current table tab */
  setTableType: PropTypes.func,
  /** Value to determine highlighted table tab */
  tableType: PropTypes.string,
};

DataTables.defaultProps = {
  setTableType: () => {},
  tableType: 0,
};
// ======================

export default DataTables;
