/**
 *
 * TomoWallet - Table Configuration - Portfolio Table
 *
 */
// ===== IMPORTS =====
// Modules
import React from 'react';
import _get from 'lodash.get';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
// Custom Components
import TokenCell from './subcomponents/TokenCell';
import { TextYellowPointer } from '../../../../styles';
// Utilities & Constants
import { convertLocaleNumber, getWeb3Info } from '../../../../utils';
import { PORTFOLIO_COLUMNS, SEND_TOKEN_FIELDS } from '../../constants';
import { MSG, RPC_SERVER } from '../../../../constants';
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
        Cell: ({ value }) => convertLocaleNumber(value, 3),
      },
    ],
  },
  {
    Header: formatMessage(MSG.MY_WALLET_TABLE_PORTFOLIO_HEADER_VALUE),
    columns: [
      {
        headerClassName: 'd-none',
        accessor: PORTFOLIO_COLUMNS.VALUE,
        Cell: ({ original }) =>
          convertLocaleNumber(
            _get(original, PORTFOLIO_COLUMNS.BALANCE) *
              _get(original, [PORTFOLIO_COLUMNS.PRICE]),
            3,
          ),
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
          const rpcServer = _get(getWeb3Info(), 'rpcServer');
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
              <DropdownToggle>
                <div className='text-right'>
                  <FontAwesomeIcon icon='ellipsis-v' />
                </div>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <a
                    href={tomoScanLink}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    {formatMessage(
                      MSG.MY_WALLET_TABLE_PORTFOLIO_CELL_ACTION_VIEW_ON_TOMOSCAN,
                      {
                        token: _get(
                          original,
                          [PORTFOLIO_COLUMNS.TOKEN_NAME],
                          '',
                        ),
                      },
                    )}
                  </a>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        },
      },
    ],
  },
];
// =========================
