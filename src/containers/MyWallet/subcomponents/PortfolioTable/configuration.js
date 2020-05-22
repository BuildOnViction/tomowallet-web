/**
 *
 * TomoWallet - Table Configuration - Portfolio Table
 *
 */
// ===== IMPORTS =====
// Modules
import React, { Fragment } from "react";
import _get from "lodash.get";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Custom Components
import TokenCell from "./subcomponents/TokenCell";
import { TextYellowPointer } from "../../../../styles";
// Utilities & Constants
import { convertLocaleNumber } from "../../../../utils";
import { PORTFOLIO_COLUMNS, SEND_TOKEN_FIELDS } from "../../constants";
import { MSG, ENUM, API } from "../../../../constants";
import { bnToDecimals } from "../../../../utils";
import Tooltip from "../../../../components/Tooltip";
// ===================

// ===== CONFIGURATION =====
export default ({ formatMessage, openSendTokenPopup }) => [
  {
    Header: (
      <Fragment>
        <FontAwesomeIcon icon="money-check-alt" className="mr-2" />
        {formatMessage(MSG.MY_WALLET_TABLE_PORTFOLIO_HEADER_TOKEN_NAME)}
      </Fragment>
    ),
    columns: [
      {
        headerClassName: "d-none",
        accessor: PORTFOLIO_COLUMNS.TOKEN_NAME,
        Cell: ({ original }) => (
          <TokenCell formatMessage={formatMessage} values={original} />
        ),
      },
    ],
  },
  {
    Header: (
      <Fragment>
        <FontAwesomeIcon icon="coins" className="mr-2" />
        {formatMessage(MSG.MY_WALLET_TABLE_PORTFOLIO_HEADER_BALANCE)}
      </Fragment>
    ),
    columns: [
      {
        headerClassName: "d-none",
        accessor: PORTFOLIO_COLUMNS.BALANCE,
        Cell: ({ original, value }) => {
          const decimals = _get(original, PORTFOLIO_COLUMNS.DECIMALS);
          return convertLocaleNumber(
            parseFloat(bnToDecimals(value, decimals)),
            3
          );
        },
      },
    ],
  },
  {
    Header: (
      <Fragment>
        <FontAwesomeIcon icon="dollar-sign" className="mr-2" />
        {formatMessage(MSG.MY_WALLET_TABLE_PORTFOLIO_HEADER_VALUE)}
      </Fragment>
    ),
    columns: [
      {
        headerClassName: "d-none",
        accessor: PORTFOLIO_COLUMNS.VALUE,
        Cell: ({ original }) => {
          const rawBalance = _get(original, PORTFOLIO_COLUMNS.BALANCE);
          const decimals = _get(original, PORTFOLIO_COLUMNS.DECIMALS);
          return convertLocaleNumber(
            parseFloat(bnToDecimals(rawBalance, decimals)) *
              _get(original, [PORTFOLIO_COLUMNS.PRICE]),
            3
          );
        },
      },
    ],
  },
  {
    headerClassName: "no-header",
    accessor: PORTFOLIO_COLUMNS.ACTIONS,
    columns: [
      {
        headerClassName: "d-none",
        Cell: ({ index, original }) => (
          <Fragment>
            <TextYellowPointer
              id={`sendIcon_${index + 1}`}
              role="presentation"
              onClick={() =>
                openSendTokenPopup({
                  [SEND_TOKEN_FIELDS.TOKEN]: original,
                  isTokenSpecific: true,
                })
              }
            >
              <FontAwesomeIcon icon="share" />
            </TextYellowPointer>
            <Tooltip placement="top" target={`sendIcon_${index + 1}`}>
              {formatMessage(MSG.COMMON_BUTTON_SEND)}
            </Tooltip>
          </Fragment>
        ),
      },
      {
        headerClassName: "d-none",
        Cell: ({ index, original }) => {
          console.warn("token row", original);

          const tokenAddress = _get(
            original,
            [PORTFOLIO_COLUMNS.TOKEN_ADDRESS],
            ""
          );
          const tokenSymbol = _get(original, [PORTFOLIO_COLUMNS.SYMBOL], "");
          const isVisible = Object.values(ENUM.WRAPPABLE_TOKEN).some(
            (address) => address.toLowerCase() === tokenAddress.toLowerCase()
          );
          const wrapLink = `${API.TOMOCHAIN_MAINNET.VIEW_WRAP_APP}${
            tokenSymbol ? `/${tokenSymbol.toLowerCase()}` : ""
          }`;
          return (
            isVisible && (
              <a href={wrapLink} rel="noopener noreferrer" target="_blank">
                <TextYellowPointer id={`view_wrap_link_${index + 1}`}>
                  <FontAwesomeIcon icon="exchange-alt" />
                </TextYellowPointer>
                <Tooltip placement="top" target={`view_wrap_link_${index + 1}`}>
                  {formatMessage(
                    MSG.MY_WALLET_TABLE_PORTFOLIO_CELL_ACTION_VIEW_WRAP_APP,
                    {
                      token: _get(original, [PORTFOLIO_COLUMNS.TOKEN_NAME], ""),
                    }
                  )}
                </Tooltip>
              </a>
            )
          );
        },
      },
      {
        headerClassName: "d-none",
        Cell: ({ index, original }) => {
          const tokenAddress = _get(
            original,
            [PORTFOLIO_COLUMNS.TOKEN_ADDRESS],
            ""
          );
          const tokenSymbol = _get(original, [PORTFOLIO_COLUMNS.SYMBOL], "");
          const isVisible =
            tokenSymbol === "TOMO" ||
            Object.values(ENUM.TRADEABLE_TOKEN).some(
              (address) => address.toLowerCase() === tokenAddress.toLowerCase()
            );
          const tradeLink = `${API.TOMOCHAIN_MAINNET.VIEW_TRADE_APP}${
            tokenSymbol ? `/${tokenSymbol.toLowerCase()}` : ""
          }`;
          return (
            isVisible && (
              <a href={tradeLink} rel="noopener noreferrer" target="_blank">
                <TextYellowPointer id={`view_wrap_link_${index + 1}`}>
                  <FontAwesomeIcon icon="chart-line" />
                </TextYellowPointer>
                <Tooltip placement="top" target={`view_wrap_link_${index + 1}`}>
                  {formatMessage(
                    MSG.MY_WALLET_TABLE_PORTFOLIO_CELL_ACTION_VIEW_TRADE_APP,
                    {
                      token: _get(original, [PORTFOLIO_COLUMNS.TOKEN_NAME], ""),
                    }
                  )}
                </Tooltip>
              </a>
            )
          );
        },
      },
    ],
  },
];
// =========================
