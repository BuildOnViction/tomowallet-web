/**
 *
 * TomoWallet - Table Configuration - Portfolio Table
 *
 */
// ===== IMPORTS =====
// Modules
import React from 'react';
import _get from 'lodash.get';
import Web3 from 'web3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UncontrolledDropdown } from 'reactstrap';
// Custom Components
import TokenCell from './subcomponents/TokenCell';
import {
  TextYellowPointer,
  DropdownToggleMainStyle,
  DropdownMenuMainStyler,
} from '../../../../styles';
// Utilities & Constants
import { convertLocaleNumber, getNetwork } from '../../../../utils';
import { PORTFOLIO_COLUMNS, SEND_TOKEN_FIELDS } from '../../constants';
import { MSG, RPC_SERVER } from '../../../../constants';
import { convertNumberWithDecimals } from '../../../../utils/blockchain';
// ===================

// ===== CONFIGURATION =====
export default ({ formatMessage, openSendTokenPopup }) => [
  {
    Header: formatMessage(MSG.MY_WALLET_TABLE_PORTFOLIO_HEADER_TOKEN_NAME),
    columns: [
      {
        headerClassName: 'd-none',
        accessor: PORTFOLIO_COLUMNS.TOKEN_NAME,
        Cell: ({ value }) => (
          <TokenCell formatMessage={formatMessage} value={value} />
        ),
      },
    ],
  },
  {
    Header: formatMessage(MSG.MY_WALLET_TABLE_PORTFOLIO_HEADER_BALANCE),
    columns: [
      {
        headerClassName: 'd-none',
        accessor: PORTFOLIO_COLUMNS.BALANCE,
        Cell: ({ original, value }) => {
          const decimals = _get(original, PORTFOLIO_COLUMNS.DECIMALS);
          return convertLocaleNumber(
            convertNumberWithDecimals(value, decimals),
            3,
          );
        },
      },
    ],
  },
  {
    Header: formatMessage(MSG.MY_WALLET_TABLE_PORTFOLIO_HEADER_VALUE),
    columns: [
      {
        headerClassName: 'd-none',
        accessor: PORTFOLIO_COLUMNS.VALUE,
        Cell: ({ original }) => {
          const rawBalance = _get(original, PORTFOLIO_COLUMNS.BALANCE);
          const decimals = _get(original, PORTFOLIO_COLUMNS.DECIMALS);
          return convertLocaleNumber(
            convertNumberWithDecimals(rawBalance, decimals) *
              _get(original, [PORTFOLIO_COLUMNS.PRICE]),
            3,
          );
        },
      },
    ],
  },
  {
    Header: formatMessage(MSG.MY_WALLET_TABLE_PORTFOLIO_HEADER_PRICE),
    columns: [
      {
        headerClassName: 'd-none',
        accessor: PORTFOLIO_COLUMNS.PRICE,
        Cell: ({ value }) => convertLocaleNumber(value, 3),
      },
    ],
  },
  {
    accessor: 'abc',
    columns: [
      {
        headerClassName: 'd-none',
        accessor: PORTFOLIO_COLUMNS.SEND,
        Cell: ({ original }) => (
          <TextYellowPointer
            role='presentation'
            onClick={() =>
              openSendTokenPopup({
                [SEND_TOKEN_FIELDS.TOKEN]: original,
                isTokenSpecific: true,
              })
            }
          >
            {formatMessage(MSG.COMMON_BUTTON_SEND)}
          </TextYellowPointer>
        ),
      },
      {
        Cell: ({ original }) => {
          const rpcServer = getNetwork();
          let tomoScanLink = '';
          switch (rpcServer) {
            case Object.keys(RPC_SERVER)[0]:
              tomoScanLink = 'https://scan.testnet.tomochain.com/tokens';
              break;
            case Object.keys(RPC_SERVER)[1]:
              tomoScanLink = 'https://scan.tomochain.com/tokens';
              break;
            default:
              tomoScanLink = 'https://scan.testnet.tomochain.com/tokens';
          }

          return (
            <UncontrolledDropdown>
              <DropdownToggleMainStyle>
                <div className='text-right'>
                  <FontAwesomeIcon icon='ellipsis-v' />
                </div>
              </DropdownToggleMainStyle>
              <DropdownMenuMainStyler right>
                <a
                  href={tomoScanLink}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  {formatMessage(
                    MSG.MY_WALLET_TABLE_PORTFOLIO_CELL_ACTION_VIEW_ON_TOMOSCAN,
                    {
                      token: _get(original, [PORTFOLIO_COLUMNS.TOKEN_NAME], ''),
                    },
                  )}
                </a>
              </DropdownMenuMainStyler>
            </UncontrolledDropdown>
          );
        },
      },
    ],
  },
];
// =========================
