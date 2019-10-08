/**
 *
 * TomoWallet - Table Configuration - Portfolio Table
 *
 */
// ===== IMPORTS =====
// Modules
import React, { Fragment } from 'react';
import _get from 'lodash.get';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Custom Components
import TokenCell from './subcomponents/TokenCell';
import { TextYellowPointer } from '../../../../styles';
// Utilities & Constants
import {
  convertLocaleNumber,
  getNetwork,
  getWeb3Info,
} from '../../../../utils';
import { PORTFOLIO_COLUMNS, SEND_TOKEN_FIELDS } from '../../constants';
import { MSG, ENUM, API } from '../../../../constants';
import { bnToDecimals } from '../../../../utils';
import Tooltip from '../../../../components/Tooltip';
// ===================

// ===== CONFIGURATION =====
export default ({ formatMessage, openSendTokenPopup }) => [
  {
    Header: (
      <Fragment>
        <FontAwesomeIcon icon='money-check-alt' className='mr-2' />
        {formatMessage(MSG.MY_WALLET_TABLE_PORTFOLIO_HEADER_TOKEN_NAME)}
      </Fragment>
    ),
    columns: [
      {
        headerClassName: 'd-none',
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
        <FontAwesomeIcon icon='coins' className='mr-2' />
        {formatMessage(MSG.MY_WALLET_TABLE_PORTFOLIO_HEADER_BALANCE)}
      </Fragment>
    ),
    columns: [
      {
        headerClassName: 'd-none',
        accessor: PORTFOLIO_COLUMNS.BALANCE,
        Cell: ({ original, value }) => {
          const decimals = _get(original, PORTFOLIO_COLUMNS.DECIMALS);
          return convertLocaleNumber(
            parseFloat(bnToDecimals(value, decimals)),
            3,
          );
        },
      },
    ],
  },
  {
    Header: (
      <Fragment>
        <FontAwesomeIcon icon='dollar-sign' className='mr-2' />
        {formatMessage(MSG.MY_WALLET_TABLE_PORTFOLIO_HEADER_VALUE)}
      </Fragment>
    ),
    columns: [
      {
        headerClassName: 'd-none',
        accessor: PORTFOLIO_COLUMNS.VALUE,
        Cell: ({ original }) => {
          const rawBalance = _get(original, PORTFOLIO_COLUMNS.BALANCE);
          const decimals = _get(original, PORTFOLIO_COLUMNS.DECIMALS);
          return convertLocaleNumber(
            parseFloat(bnToDecimals(rawBalance, decimals)) *
              _get(original, [PORTFOLIO_COLUMNS.PRICE]),
            3,
          );
        },
      },
    ],
  },
  {
    Header: (
      <Fragment>
        <FontAwesomeIcon icon='dollar-sign' className='mr-2' />
        {formatMessage(MSG.MY_WALLET_TABLE_PORTFOLIO_HEADER_PRICE)}
      </Fragment>
    ),
    columns: [
      {
        headerClassName: 'd-none',
        accessor: PORTFOLIO_COLUMNS.PRICE,
        Cell: ({ value }) => convertLocaleNumber(value, 3),
      },
    ],
  },
  {
    headerClassName: 'no-header',
    accessor: 'abc',
    columns: [
      {
        headerClassName: 'd-none',
        accessor: PORTFOLIO_COLUMNS.SEND,
        Cell: ({ index, original }) => (
          <Fragment>
            <TextYellowPointer
              id={`sendIcon_${index + 1}`}
              role='presentation'
              onClick={() =>
                openSendTokenPopup({
                  [SEND_TOKEN_FIELDS.TOKEN]: original,
                  isTokenSpecific: true,
                })
              }
            >
              <FontAwesomeIcon icon='share' />
            </TextYellowPointer>
            <Tooltip placement='top' target={`sendIcon_${index + 1}`}>
              {formatMessage(MSG.COMMON_BUTTON_SEND)}
            </Tooltip>
          </Fragment>
        ),
      },
      {
        Cell: ({ index, original }) => {
          const networkKey = getNetwork();
          const address = _get(getWeb3Info(), 'address', '');
          const baseUrl = _get(API, [networkKey, 'VIEW_TOKEN'], '');
          const tokenType = _get(original, [PORTFOLIO_COLUMNS.TYPE], '');
          const tokenAddress = _get(
            original,
            [PORTFOLIO_COLUMNS.TOKEN_ADDRESS],
            '',
          );
          let viewLink = '';

          if (tokenType === ENUM.TOKEN_TYPE.CURRENCY) {
            viewLink = `${_get(
              API,
              [networkKey, 'VIEW_ADDRESS'],
              '',
            )}/${address}`;
          } else {
            switch (networkKey) {
              case ENUM.NETWORK_TYPE.TOMOCHAIN_TESTNET:
                viewLink = `${baseUrl}/${tokenAddress}`;
                break;
              case ENUM.NETWORK_TYPE.TOMOCHAIN_MAINNET:
                viewLink = `${baseUrl}/${tokenAddress}/${tokenType.toLowerCase()}/${address}`;
                break;
              default:
                viewLink = `${baseUrl}/${tokenAddress}`;
            }
          }

          return (
            <a href={viewLink} rel='noopener noreferrer' target='_blank'>
              <TextYellowPointer id={`view_link_${index + 1}`}>
                <FontAwesomeIcon icon='globe-asia' />
              </TextYellowPointer>
              <Tooltip placement='top' target={`view_link_${index + 1}`}>
                {formatMessage(
                  MSG.MY_WALLET_TABLE_PORTFOLIO_CELL_ACTION_VIEW_ON_TOMOSCAN,
                  {
                    token: _get(original, [PORTFOLIO_COLUMNS.TOKEN_NAME], ''),
                  },
                )}
              </Tooltip>
            </a>
          );
        },
      },
    ],
  },
];
// =========================
