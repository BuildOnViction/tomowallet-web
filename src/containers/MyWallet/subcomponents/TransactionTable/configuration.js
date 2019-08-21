/**
 *
 * TomoWallet - My Wallet Page - Transaction Table Configuration
 *
 */
// ===== IMPORTS =====
// Modules
import React from 'react';
// Custom Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EllipsisCellStyler } from '../../../../components/Table/style';
import { TextBlue } from '../../../../styles';
// Utilities & Constants
import { fromWei } from '../../../../utils';
import { TRANSACTION_COLUMNS } from '../../constants';
import { MSG } from '../../../../constants';
// ===================

// ===== CONFIGURATION =====
export default ({ formatMessage }) => [
  {
    Header: formatMessage(MSG.MY_WALLET_TABLE_TRANSACTIONS_HEADER_TOKEN_TYPE),
    accessor: TRANSACTION_COLUMNS.TOKEN_TYPE,
    Cell: ({ value }) => (
      <EllipsisCellStyler title={value}>{value}</EllipsisCellStyler>
    ),
  },
  {
    Header: formatMessage(MSG.MY_WALLET_TABLE_TRANSACTIONS_HEADER_TX_HASH),
    accessor: TRANSACTION_COLUMNS.TX_HASH,
    Cell: ({ value }) => (
      <EllipsisCellStyler title={value}>
        <TextBlue>{value}</TextBlue>
      </EllipsisCellStyler>
    ),
  },
  {
    Header: formatMessage(MSG.MY_WALLET_TABLE_TRANSACTIONS_HEADER_CREATE_TIME),
    accessor: TRANSACTION_COLUMNS.CREATE_TIME,
    Cell: ({ value }) => {
      const timeStr = value.format('DD MMM YYYY');
      return <EllipsisCellStyler title={timeStr}>{timeStr}</EllipsisCellStyler>;
    },
  },
  {
    Header: formatMessage(MSG.MY_WALLET_TABLE_TRANSACTIONS_HEADER_FROM),
    accessor: TRANSACTION_COLUMNS.FROM,
    Cell: ({ value }) => (
      <EllipsisCellStyler title={value}>
        <TextBlue>{value}</TextBlue>
      </EllipsisCellStyler>
    ),
  },
  {
    Header: '',
    accessor: 'connectArrow',
    Cell: () => <FontAwesomeIcon icon='arrow-right' />,
    className: 'text-center',
  },
  {
    Header: formatMessage(MSG.MY_WALLET_TABLE_TRANSACTIONS_HEADER_TO),
    accessor: TRANSACTION_COLUMNS.TO,
    Cell: ({ value }) => (
      <EllipsisCellStyler title={value}>
        <TextBlue>{value}</TextBlue>
      </EllipsisCellStyler>
    ),
  },
  {
    Header: formatMessage(MSG.MY_WALLET_TABLE_TRANSACTIONS_HEADER_QUANTITY),
    accessor: TRANSACTION_COLUMNS.QUANTITY,
    Cell: ({ value }) => (
      <EllipsisCellStyler title={value}>{fromWei(value)}</EllipsisCellStyler>
    ),
  },
];
// =========================
