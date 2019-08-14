/**
 *
 * TomoWallet - Table Configuration - Porfolio Table
 *
 */
// ===== IMPORTS =====
// Modules
import React from 'react';
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get as _get } from 'lodash';
// Custom Components
import TokenCell from './subcomponents/TokenCell';
// Constants
import { PORFOLIO_COLUMNS, SEND_TOKEN_FIELDS } from '../../constants';
import { MSG } from '../../../../../constants';
// ===================

// ===== CONFIGURATION =====
export default ({ formatMessage, openSendTokenPopup }) => [
  {
    Header: formatMessage(MSG.MY_WALLET_TABLE_PORFOLIO_HEADER_TOKEN_NAME),
    columns: [
      {
        headerClassName: 'd-none',
        accessor: PORFOLIO_COLUMNS.TOKEN_NAME,
        Cell: ({ value }) => (
          <TokenCell formatMessage={formatMessage} value={value} />
        ),
      },
    ],
  },
  {
    Header: formatMessage(MSG.MY_WALLET_TABLE_PORFOLIO_HEADER_BALANCE),
    columns: [
      {
        headerClassName: 'd-none',
        accessor: PORFOLIO_COLUMNS.BALANCE,
        Cell: ({ value }) => value.toLocaleString(),
      },
    ],
  },
  {
    Header: formatMessage(MSG.MY_WALLET_TABLE_PORFOLIO_HEADER_VALUE),
    columns: [
      {
        headerClassName: 'd-none',
        accessor: PORFOLIO_COLUMNS.VALUE,
        Cell: ({ value }) => value,
      },
    ],
  },
  {
    Header: formatMessage(MSG.MY_WALLET_TABLE_PORFOLIO_HEADER_PRICE),
    columns: [
      {
        headerClassName: 'd-none',
        accessor: PORFOLIO_COLUMNS.PRICE,
        Cell: ({ value }) => value,
      },
    ],
  },
  {
    Header: ({ searchToken }) => (
      <InputGroup size='sm'>
        <Input name='searchToken' value={searchToken} />
        <InputGroupAddon addonType='append'>
          <InputGroupText>
            <FontAwesomeIcon icon='search' />
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    ),
    accessor: 'abc',
    columns: [
      {
        headerClassName: 'd-none',
        accessor: PORFOLIO_COLUMNS.SEND,
        Cell: ({ original }) => (
          <div
            role='presentation'
            onClick={() =>
              openSendTokenPopup({
                [SEND_TOKEN_FIELDS.TOKEN]: original,
              })
            }
          >
            {formatMessage(MSG.COMMON_BUTTON_SEND)}
          </div>
        ),
      },
      {
        headerClassName: 'd-none',
        accessor: PORFOLIO_COLUMNS.RECEIVE,
        Cell: () => <div>{formatMessage(MSG.COMMON_BUTTON_RECEIVE)}</div>,
      },
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
