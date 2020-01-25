/**
 *
 * TomoWallet - My Wallet Page - Transaction Table Configuration
 *
 */
// ===== IMPORTS =====
// Modules
import React, { Fragment } from 'react';
import _get from 'lodash.get';
// Custom Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { EllipsisCellStyler } from '../../../../components/Table/style';
import Ellipsis from '../../../../components/Ellipsis';
import { TextBlue } from '../../../../styles';
// Utilities & Constants
import { getNetwork } from '../../../../utils';
import { TRANSACTION_COLUMNS } from '../../constants';
import { MSG, API } from '../../../../constants';
// ===================

// ===== CONFIGURATION =====
export default ({ formatMessage }) => [
  {
    Header: () => (
      <Fragment>
        <FontAwesomeIcon icon='hashtag' className='mr-2' />
        {formatMessage(MSG.MY_WALLET_TABLE_TRANSACTIONS_HEADER_TX_HASH)}
      </Fragment>
    ),
    accessor: TRANSACTION_COLUMNS.TX_HASH,
    Cell: ({ value }) => (
      <a
        href={`${_get(API, [getNetwork(), 'VIEW_TRANSACTION'])}/${value}`}
        rel='noopener noreferrer'
        target='_blank'
      >
        <TextBlue><Ellipsis middle>{value}</Ellipsis></TextBlue>
      </a>
    ),
  },
  {
    Header: () => (
      <Fragment>
        <FontAwesomeIcon icon='history' className='mr-2' />
        {formatMessage(MSG.MY_WALLET_TABLE_TRANSACTIONS_HEADER_CREATE_TIME)}
      </Fragment>
    ),
    accessor: TRANSACTION_COLUMNS.CREATE_TIME,
    Cell: ({ value }) => {
      const timeStr = value.format('HH:MM, DD MMM YYYY');
      return <Ellipsis>{timeStr}</Ellipsis>;
    },
  },
  {
    Header: () => (
      <Fragment>
        <FontAwesomeIcon icon={['far', 'address-card']} className='mr-2' />
        {formatMessage(MSG.MY_WALLET_TABLE_TRANSACTIONS_HEADER_FROM)}
      </Fragment>
    ),
    accessor: TRANSACTION_COLUMNS.FROM,
    Cell: ({ value }) => (
      <a
        href={`${_get(API, [getNetwork(), 'VIEW_ADDRESS'])}/${value}`}
        rel='noopener noreferrer'
        target='_blank'
      >
        <TextBlue><Ellipsis middle>{value}</Ellipsis></TextBlue>
      </a>
    ),
  },
  {
    Header: '',
    headerClassName: 'no-header',
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
    Header: () => (
      <Fragment>
        <FontAwesomeIcon icon={['far', 'address-card']} className='mr-2' />
        {formatMessage(MSG.MY_WALLET_TABLE_TRANSACTIONS_HEADER_TO)}
      </Fragment>
    ),
    accessor: TRANSACTION_COLUMNS.TO,
    Cell: ({ value }) => (    
      <a
        href={`${_get(API, [getNetwork(), 'VIEW_ADDRESS'])}/${value}`}
        rel='noopener noreferrer'
        target='_blank'
      >
        <TextBlue><Ellipsis middle>{value}</Ellipsis></TextBlue>
      </a>
    ),
  },
  {
    Header: () => (
      <Fragment>
        <FontAwesomeIcon icon='funnel-dollar' className='mr-2' />
        {formatMessage(MSG.MY_WALLET_TABLE_TRANSACTIONS_HEADER_QUANTITY)}
      </Fragment>
    ),
    accessor: TRANSACTION_COLUMNS.QUANTITY,
    Cell: ({ value, original }) => {
      const displayValue = `${value} ${_get(original, [
        TRANSACTION_COLUMNS.TOKEN_TYPE,
      ])}`;
      return <Ellipsis>{displayValue}</Ellipsis>;
    },
  },
];
// =========================
