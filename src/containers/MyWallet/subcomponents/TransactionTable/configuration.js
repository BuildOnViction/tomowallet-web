/**
 *
 * TomoWallet - My Wallet Page - Transaction Table Configuration
 *
 */
// ===== IMPORTS =====
// Modules
import React from 'react';
import _get from 'lodash.get';
// Custom Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EllipsisCellStyler } from '../../../../components/Table/style';
import { TextBlue } from '../../../../styles';
// Utilities & Constants
import { getNetwork } from '../../../../utils';
import { TRANSACTION_COLUMNS } from '../../constants';
import { MSG, API } from '../../../../constants';
// ===================

// ===== CONFIGURATION =====
export default ({ formatMessage }) => [
  {
    Header: formatMessage(MSG.MY_WALLET_TABLE_TRANSACTIONS_HEADER_TX_HASH),
    accessor: TRANSACTION_COLUMNS.TX_HASH,
    Cell: ({ value }) => (
      <EllipsisCellStyler title={value}>
        <TextBlue>
          <a
            href={`${_get(API, [getNetwork(), 'VIEW_TRANSACTION'])}/${value}`}
            rel='noopener noreferrer'
            target='_blank'
          >
            {value}
          </a>
        </TextBlue>
      </EllipsisCellStyler>
    ),
  },
  {
    Header: formatMessage(MSG.MY_WALLET_TABLE_TRANSACTIONS_HEADER_CREATE_TIME),
    accessor: TRANSACTION_COLUMNS.CREATE_TIME,
    Cell: ({ value }) => {
      const timeStr = value.format('DD MMM YYYY HH:MM:SS');
      return <EllipsisCellStyler title={timeStr}>{timeStr}</EllipsisCellStyler>;
    },
  },
  {
    Header: formatMessage(MSG.MY_WALLET_TABLE_TRANSACTIONS_HEADER_FROM),
    accessor: TRANSACTION_COLUMNS.FROM,
    Cell: ({ value }) => (
      <EllipsisCellStyler title={value}>
        <TextBlue>
          <a
            href={`${_get(API, [getNetwork(), 'VIEW_TRANSACTION'])}/${value}`}
            rel='noopener noreferrer'
            target='_blank'
          >
            {value}
          </a>
        </TextBlue>
      </EllipsisCellStyler>
    ),
  },
  {
    Header: '',
    accessor: 'connectArrow',
    Cell: ({ original }) =>
      _get(original, [TRANSACTION_COLUMNS.TYPE]) === 'IN' ? (
        <FontAwesomeIcon icon='arrow-right' className='text-success' />
      ) : (
        <FontAwesomeIcon icon='arrow-right' className='text-danger' />
      ),
    className: 'text-center',
  },
  {
    Header: formatMessage(MSG.MY_WALLET_TABLE_TRANSACTIONS_HEADER_TO),
    accessor: TRANSACTION_COLUMNS.TO,
    Cell: ({ value }) => (
      <EllipsisCellStyler title={value}>
        <TextBlue>
          <a
            href={`${_get(API, [getNetwork(), 'VIEW_TRANSACTION'])}/${value}`}
            rel='noopener noreferrer'
            target='_blank'
          >
            {value}
          </a>
        </TextBlue>
      </EllipsisCellStyler>
    ),
  },
  {
    Header: formatMessage(MSG.MY_WALLET_TABLE_TRANSACTIONS_HEADER_QUANTITY),
    accessor: TRANSACTION_COLUMNS.QUANTITY,
    Cell: ({ value, original }) => {
      const displayValue = `${value} ${_get(original, [
        TRANSACTION_COLUMNS.TOKEN_TYPE,
      ])}`;
      return (
        <EllipsisCellStyler title={displayValue}>
          {displayValue}
        </EllipsisCellStyler>
      );
    },
  },
];
// =========================
