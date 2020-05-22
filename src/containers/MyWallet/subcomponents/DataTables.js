/**
 *
 * TomoWallet - My Wallet Page - Data Tables
 *
 * This component consists of token & transaction data, including some action
 * to interact (view details, send/receive...)
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
// Custom Components
import PortfolioTable from "./PortfolioTable";
import TransactionTable from "./TransactionTable";
// Constants
import { LIST, API, MSG } from "../../../constants";
import { FormattedMessage } from "react-intl";
// ===================

// ===== MAIN COMPONENT =====
class DataTables extends PureComponent {
  render() {
    const { setTableType, tableType, openSendTokenPopup } = this.props;
    return (
      <div className="main_tab">
        <Nav tabs className="mt-5 mb-4">
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
          <NavItem className="ml-auto">
            <NavLink
              href={API.TOMOCHAIN_MAINNET.VIEW_WRAP_APP}
              target="_blank"
              className="mr-0"
            >
              <FormattedMessage
                {...MSG.MY_WALLET_TABLE_TOOLBAR_LINK_WRAP_APP}
              />
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tableType}>
          <TabPane tabId={LIST.MY_WALLET_TABLE_TYPES[0].value}>
            <PortfolioTable
              isActive={tableType === LIST.MY_WALLET_TABLE_TYPES[0].value}
              openSendTokenPopup={openSendTokenPopup}
            />
          </TabPane>
          <TabPane tabId={LIST.MY_WALLET_TABLE_TYPES[1].value}>
            <TransactionTable
              isActive={tableType === LIST.MY_WALLET_TABLE_TYPES[1].value}
            />
          </TabPane>
        </TabContent>
      </div>
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
};

DataTables.defaultProps = {
  openReceiveTokenPopup: () => {},
  openSendTokenPopup: () => {},
  setTableType: () => {},
  tableType: 0,
};
// ======================

export default DataTables;
