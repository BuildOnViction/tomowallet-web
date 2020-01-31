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
import { TextSend, TextDeposit, TextWithdraw } from '../../../../styles';
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
export default ({
  formatMessage,
  openSendTokenPopup,
  openDepositPrivacyPopup,
  openWithdrawPrivacyPopup,
}) => [
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
        {formatMessage(MSG.MY_WALLET_TABLE_PORTFOLIO_HEADER_PRIVACY_BALANCE)}
      </Fragment>
    ),
    columns: [
      {
        headerClassName: 'd-none',
        accessor: PORTFOLIO_COLUMNS.BALANCE,
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
    headerClassName: 'no-header',
    accessor: 'abc',
    columns: [
      {
        headerClassName: 'd-none',
        accessor: PORTFOLIO_COLUMNS.SEND,
        Cell: ({ index, original }) => (
          <Fragment>
            <TextSend
              id={`sendIcon_${index + 1}`}
              role='presentation'
              onClick={() =>
                openSendTokenPopup({
                  [SEND_TOKEN_FIELDS.TOKEN]: original,
                  isTokenSpecific: true,
                })
              }
            >{formatMessage(MSG.COMMON_BUTTON_SEND)}
            </TextSend>
          </Fragment>
        ),
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
        Cell: ({ index, original }) => {
          return (
            <Fragment>
              <TextDeposit
                id={`sendIcon_${index + 1}`}
                role='presentation'
                onClick={() =>
                  openDepositPrivacyPopup({
                    [SEND_TOKEN_FIELDS.TOKEN]: original,
                    isTokenSpecific: true,
                  })
                }
              >{formatMessage(MSG.COMMON_BUTTON_DEPOSIT)}
              </TextDeposit>
            </Fragment>
          )
        },
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
            <TextWithdraw
              id={`sendIcon_${index + 1}`}
              role='presentation'
              onClick={() =>
                openWithdrawPrivacyPopup({
                  [SEND_TOKEN_FIELDS.TOKEN]: original,
                  isTokenSpecific: true,
                })
              }
            >{formatMessage(MSG.COMMON_BUTTON_WITHDRAW)}
            </TextWithdraw>
          </Fragment>
        ),
      },
    ],
  },
];
// =========================
