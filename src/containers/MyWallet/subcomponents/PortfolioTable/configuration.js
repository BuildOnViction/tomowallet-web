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
// Custom Components
import TokenCell from './subcomponents/TokenCell';
import { TextBlue, TextYellowPointer } from '../../../../styles';
// Utilities & Constants
import { convertLocaleNumber } from '../../../../utils';
import { PORTFOLIO_COLUMNS, SEND_TOKEN_FIELDS } from '../../constants';
import { MSG } from '../../../../constants';

// ===================

// ===== CONFIGURATION =====
export default ({
  formatMessage,
  openReceiveTokenPopup,
  openSendTokenPopup,
}) => [
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
      // {
      //   headerClassName: 'd-none',
      //   accessor: PORTFOLIO_COLUMNS.RECEIVE,
      //   Cell: () => (
      //     <TextBlue role='presentation' onClick={openReceiveTokenPopup}>
      //       {formatMessage(MSG.COMMON_BUTTON_RECEIVE)}
      //     </TextBlue>
      //   ),
      // },
      {
        Cell: () => (
          <div className='text-right'>
            <FontAwesomeIcon icon='ellipsis-v' />
          </div>
        ),
      },
    ],
  },
];
// =========================
