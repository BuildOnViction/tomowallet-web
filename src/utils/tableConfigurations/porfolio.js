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
// Constants
import { PORFOLIO_COLUMNS } from '../../containers/v1.0/MyWallet/constants';
import { MSG } from '../../constants';
// ===================

// ===== CONFIGURATION =====
export default ({ formatMessage }) => [
  {
    Header: formatMessage(MSG.MY_WALLET_TABLE_PORFOLIO_HEADER_TOKEN_NAME),
    accessor: PORFOLIO_COLUMNS.TOKEN_NAME,
  },
  {
    Header: formatMessage(MSG.MY_WALLET_TABLE_PORFOLIO_HEADER_BALANCE),
    accessor: PORFOLIO_COLUMNS.BALANCE,
  },
  {
    Header: formatMessage(MSG.MY_WALLET_TABLE_PORFOLIO_HEADER_VALUE),
    accessor: PORFOLIO_COLUMNS.VALUE,
  },
  {
    Header: formatMessage(MSG.MY_WALLET_TABLE_PORFOLIO_HEADER_PRICE),
    accessor: PORFOLIO_COLUMNS.PRICE,
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
    accessor: PORFOLIO_COLUMNS.ACTIONS,
  },
];
// =========================
