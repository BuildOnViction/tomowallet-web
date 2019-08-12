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
import { TokenCellStyler } from './style';
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
          <TokenCellStyler>
            <div className='block-symbol'>
              {/* -- TO-DO: Add token's image source */}
              <img
                src=''
                alt={formatMessage(
                  MSG.MY_WALLET_TABLE_PORFOLIO_CELL_TOKEN_NAME_IMAGE_ALT,
                  { name: value },
                )}
              />
            </div>
            <div className='block-token'>
              <div className='block-token__name'>{value}</div>
              <div className='block-token__publisher'>
                {formatMessage(
                  MSG.MY_WALLET_TABLE_PORFOLIO_CELL_TOKEN_NAME_PUBLISHER,
                )}
              </div>
            </div>
          </TokenCellStyler>
        ),
        width: 250,
      },
      {
        Header: formatMessage(MSG.MY_WALLET_TABLE_PORFOLIO_HEADER_BALANCE),
        accessor: PORFOLIO_COLUMNS.BALANCE,
        Cell: ({ value }) => value,
        width: 150,
      },
      {
        Header: formatMessage(MSG.MY_WALLET_TABLE_PORFOLIO_HEADER_VALUE),
        accessor: PORFOLIO_COLUMNS.VALUE,
        Cell: ({ value }) => value,
        width: 150,
      },
      {
        Header: formatMessage(MSG.MY_WALLET_TABLE_PORFOLIO_HEADER_PRICE),
        accessor: PORFOLIO_COLUMNS.PRICE,
        Cell: ({ value }) => value,
        width: 150,
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
        width: 300,
      },
    ],
  },
];
// =========================
