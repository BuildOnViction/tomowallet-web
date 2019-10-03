/**
 *
 * TomoWallet - Utility - Blockchain - Ledger Utilities
 *
 */
// ===== IMPORTS =====
// Modules
import Eth from '@ledgerhq/hw-app-eth';
import * as HDKey from 'hdkey';
import * as ethUtils from 'ethereumjs-util';
import Transaction from 'ethereumjs-tx';
import _isEqual from 'lodash.isequal';
// Utilities & Constants
import electron, { isElectron } from '../electron';
import { getGlobalIntl } from '../../components/IntlProvider';
import trc20 from '../../contractABIs/trc20.json';
import trc21 from '../../contractABIs/trc21.json';
import { MSG, ENUM } from '../../constants';
import { decimalsToBN, repeatGetTransaction } from './utilities';
// ===================

// ===== SUPPORTED VARIABLES =====
const LEDGER_WALLET_LIMIT = 5;
// ===============================

// ===== METHODS =====
/**
 * PRIVATE - unlockLedger
 *
 * Initiate Ledger access through Ledger Nano S by given HD path.
 * Support for web & desktop app versions
 * @param {String} hdPath HD path for accessing Ledger wallets
 */
const unlockLedger = hdPath => {
  const { formatMessage } = getGlobalIntl();
  if (isElectron()) {
    return electron.transportNodeHid.isSupported().then(nodeSupported => {
      if (!nodeSupported) {
        throw new Error(
          formatMessage(MSG.IMPORT_WALLET_ERROR_TRANSPORT_NODE_NOT_SUPPORTED),
        );
      }
      return Promise.race([
        electron.transportNodeHid.create(),
        new Promise((_, reject) => {
          const timeout = setTimeout(() => {
            clearTimeout(timeout);
            reject(
              new Error(
                formatMessage(MSG.IMPORT_WALLET_ERROR_DEVICE_NOT_FOUND),
              ),
            );
          }, 5000);
        }),
      ])
        .then(transport => new Eth(transport).getAddress(hdPath, false, true))
        .catch(error => {
          throw error;
        });
    });
  }
  const TransportU2F = require('@ledgerhq/hw-transport-u2f').default;
  return TransportU2F.isSupported()
    .then(u2fSuppported => {
      if (!u2fSuppported) {
        throw new Error(
          formatMessage(MSG.IMPORT_WALLET_ERROR_TRANSPORT_U2F_NOT_SUPPORTED),
        );
      }
      return TransportU2F.create()
        .then(transport => new Eth(transport).getAddress(hdPath, false, true))
        .catch(error => {
          throw error;
        });
    })
    .catch(error => {
      throw error;
    });
};

/**
 * PRIVATE - createHWAddress
 *
 * Generate wallet information from Ledger's payload information & given address offset
 * @param {Web3} web3 A Web3 object with provider initiated
 * @param {Object} payload Ledger Nano S information to generate wallet addresses
 * @param {int} index Address offset
 */
const createHWAddress = (web3, payload, index) => {
  const { publicKey, chainCode } = payload;

  try {
    // Get wallet address from ledger payload & index
    const hdKey = new HDKey();
    hdKey.publicKey = Buffer.from(publicKey, 'hex');
    hdKey.chainCode = Buffer.from(chainCode, 'hex');
    const derivedKey = hdKey.derive(`m/${index}`);
    const convertedPubKey = ethUtils.bufferToHex(derivedKey.publicKey);
    const addressBuff = ethUtils.publicToAddress(convertedPubKey, true);
    const walletAddress = ethUtils.bufferToHex(addressBuff);

    // return full wallet object
    return web3.eth.getBalance(walletAddress).then(balance => {
      const balanceInDecimals = web3.utils.fromWei(balance);
      const trimmedBalance = balanceInDecimals.slice(
        0,
        balanceInDecimals.indexOf('.') + 4,
      );
      return {
        address: walletAddress,
        balance: trimmedBalance,
      };
    });
  } catch (error) {
    return new Promise((_, reject) => reject(error));
  }
};

/**
 * PRIVATE - loadLedgerWallets
 *
 * Retrieve list of wallet addresses with Ledger payload data & given offset
 * @param {Web3} web3 A Web3 object with provider initiated
 * @param {Object} payload Ledger Nano S information to generate wallet addresses
 * @param {int} offset Address offset
 */
const loadLedgerWallets = (web3, payload, offset) => {
  const walletPromises = [];

  for (let i = offset; i < offset + LEDGER_WALLET_LIMIT; i++) {
    walletPromises.push(createHWAddress(web3, payload, i));
  }
  return Promise.all(walletPromises)
    .then(wallets => wallets)
    .catch(error => {
      throw error;
    });
};

/**
 * PUBLIC - selectHDPath
 *
 * Retrieve Ledger wallets by given HD path
 * @param {Web3} web3 A Web3 object with provider initiated
 * @param {String} hdPath HD Path for accessing Ledger wallets
 */
const selectHDPath = (web3, hdPath) => {
  return unlockLedger(hdPath)
    .then(payload => {
      if (payload) {
        return loadLedgerWallets(web3, payload, 0);
      }
      return [];
    })
    .catch(error => {
      throw error;
    });
};

/**
 * PRIVATE - getLedgerTokenTransferData
 *
 * Convert token transfer params for Ledger address into hex-string data
 * @param {Web3} web3 A Web3 object with supported APIs
 * @param {*} contractData An object which contains contract data
 */
const getLedgerTokenTransferData = (web3, txData) => {
  const { amount, contractAddress, decimals, to, type } = txData;
  const tokenAbi = _isEqual(type, ENUM.TOKEN_TYPE.TRC21) ? trc21 : trc20;
  const contract = new web3.eth.Contract(tokenAbi, contractAddress);
  const weiAmount = decimalsToBN(amount, decimals);

  return contract.methods.transfer(to, weiAmount).encodeABI();
};

/**
 * sendSignedTransaction
 *
 * Execute signed transaction for Ledger address
 * @param {Web3} web3 A Web3 object with provider initiated
 * @param {Object} txData Set of transaction data
 */
const sendSignedTransaction = (web3, txData) => {
  const {
    amount,
    chainId,
    contractAddress,
    decimals,
    from,
    gas,
    gasPrice,
    hdPath,
    to,
    type,
  } = txData;
  try {
    const transData = getLedgerTokenTransferData(web3, txData);
    return web3.eth.getTransactionCount(from).then(nonce => {
      const txParams = {
        from,
        ...(type === ENUM.TOKEN_TYPE.CURRENCY
          ? {
              to,
              value: `0x${web3.utils
                .toBN(decimalsToBN(amount, decimals))
                .toString('hex')}`,
            }
          : {
              to: contractAddress,
              data: transData,
            }),
        nonce: `0x${web3.utils.toBN(nonce).toString('hex')}`,
        gas: `0x${web3.utils.toBN(gas).toString('hex')}`,
        gasPrice: `0x${web3.utils.toBN(gasPrice).toString('hex')}`,
        chainId,
      };

      const rawTx = new Transaction(txParams);
      rawTx.v = Buffer.from([chainId]);
      const serializedRawTx = rawTx.serialize().toString('hex');
      return new Promise(rs => {
        if (isElectron()) {
          return rs(electron.transportNodeHid.create());
        } else {
          const TransportU2F = require('@ledgerhq/hw-transport-u2f').default;
          return rs(TransportU2F.create());
        }
      }).then(transport =>
        new Eth(transport)
          .signTransaction(hdPath, serializedRawTx)
          .then(signature => {
            const hexifySignature = {};
            Object.keys(signature).forEach(key => {
              hexifySignature[key] = `0x${signature[key].replace(/^0x/, '')}`;
            });
            const txObj = {
              ...txParams,
              ...hexifySignature,
            };

            const tx = new Transaction(txObj);
            const serializedTx = `0x${tx.serialize().toString('hex')}`;

            return web3.eth
              .sendSignedTransaction(serializedTx)
              .on('transactionHash', txHash => {
                repeatGetTransaction(web3, txHash);
              })
              .then(txObj => txObj);
          }),
      );
    });
  } catch (error) {
    throw error;
  }
};
// ===================

export { selectHDPath, sendSignedTransaction };
