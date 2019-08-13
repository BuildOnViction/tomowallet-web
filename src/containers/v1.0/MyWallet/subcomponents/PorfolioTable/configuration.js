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
// Custom Components
import TokenCell from './subcomponents/TokenCell';
import ActionCell from './subcomponents/ActionCell';
// Constants
import { PORFOLIO_COLUMNS } from '../../constants';
import { MSG } from '../../../../../constants';
// ===================

// ===== CONFIGURATION =====
export default ({ formatMessage }) => [
  {
    headerClassName: 'd-none',
    columns: [
      {
        Header: formatMessage(MSG.MY_WALLET_TABLE_PORFOLIO_HEADER_TOKEN_NAME),
        accessor: PORFOLIO_COLUMNS.TOKEN_NAME,
        Cell: ({ value }) => (
          <TokenCell formatMessage={formatMessage} value={value} />
        ),
      },
      {
        Header: formatMessage(MSG.MY_WALLET_TABLE_PORFOLIO_HEADER_BALANCE),
        accessor: PORFOLIO_COLUMNS.BALANCE,
        Cell: ({ value }) => value,
      },
      {
        Header: formatMessage(MSG.MY_WALLET_TABLE_PORFOLIO_HEADER_VALUE),
        accessor: PORFOLIO_COLUMNS.VALUE,
        Cell: ({ value }) => value,
      },
      {
        Header: formatMessage(MSG.MY_WALLET_TABLE_PORFOLIO_HEADER_PRICE),
        accessor: PORFOLIO_COLUMNS.PRICE,
        Cell: ({ value }) => value,
      },
      {
        accessor: PORFOLIO_COLUMNS.SEND,
        Cell: ({ value }) => value,
      },
      {
        accessor: PORFOLIO_COLUMNS.RECEIVE,
        Cell: ({ value }) => value,
      },
      {
        // Header: ({ searchToken }) => (
        //   <InputGroup size='sm'>
        //     <Input name='searchToken' value={searchToken} />
        //     <InputGroupAddon addonType='append'>
        //       <InputGroupText>
        //         <FontAwesomeIcon icon='search' />
        //       </InputGroupText>
        //     </InputGroupAddon>
        //   </InputGroup>
        // ),
        // accessor: PORFOLIO_COLUMNS.ACTIONS,
        Cell: () => <ActionCell formatMessage={formatMessage} />,
      },
    ],
  },
];
// =========================
