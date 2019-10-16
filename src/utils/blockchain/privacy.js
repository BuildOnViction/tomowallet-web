/**
 *
 * TomoWallet - Utility - Blockchain - Privacy Utilities
 *
 */
// ===== IMPORTS =====
// Modules
import Web3 from 'web3';
import HDWalletProvider from 'truffle-hdwallet-provider';
import {
  Address,
  Commitment,
  common,
  Crypto,
  Stealth,
  UTXO,
} from 'tomoprivacyjs';
import Base58 from 'bs58';
import _orderBy from 'lodash.orderby';
import _isEmpty from 'lodash.isempty';
// Utilites & Constants
import { mnemonicToPrivateKey } from './wallet';
import {
  isRecoveryPhrase,
  isPrivateKey,
  decimalsToBN,
  toBN,
} from './utilities';
import privacyAbi from './abi/privacy.json';

const ecurve = require('ecurve');
const ecparams = ecurve.getCurveByName('secp256k1');
const { Point } = ecurve;
const BigInteger = Crypto.BigInteger;
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
// ===================

// ===== PRE-DEFINED VARIABLES =====
const DEFAULT_GAS_PRICE = '250000000';
const DEFAULT_GAS_TOKEN = '500000';
const PEDERSON_COMMITMENT_H = [
  '50929b74c1a04954b78b4b6035e97a5e078a5a0f28ec96d547bfee9ace803ac0',
  '31d3c6863973926e049e637cb1b5f40a36dac28af1766968c30c2313f3a38904',
];
const PRIVACY_SMART_CONTRACT_ADDRESS =
  '0xeaE0f510e19C117879fEF5578B4E31B7819105F9';
// =================================

// ===== METHODS =====
const getCurveXPart = bn => bn.toString('hex').substr(2, 64);
const getCurveYPart = bn => bn.toString('hex').substr(-64);
const findOwnedUTXO = (privacyContract, address, index) =>
  new Promise((rs, rj) => {
    privacyContract.methods
      .getUTXO(index)
      .call({ from: address })
      .then(utxo => rs({ ...utxo, _index: index }))
      .catch(error => rj(error));
  });
const getAddressFromProvider = web3 => {
  return (
    web3.currentProvider.selectedAddress ||
    (web3.currentProvider.addresses && web3.currentProvider.addresses[0])
  );
};
const defaultReject = message => new Promise((_, rj) => rj(new Error(message)));

export const createPrivateWeb3 = (mnemonic, serverConfig) => {
  const secretKey =
    (isRecoveryPhrase(mnemonic) &&
      mnemonicToPrivateKey(mnemonic, serverConfig)) ||
    (isPrivateKey(mnemonic) && mnemonic) ||
    '';
  if (secretKey) {
    const { privSpendKey } = getKeys(secretKey);
    if (typeof serverConfig === 'object') {
      const { host, hdPath } = serverConfig;
      return new Web3(new HDWalletProvider(privSpendKey, host, 0, 1, hdPath));
    } else if (typeof serverConfig == 'string') {
      return new Web3(new HDWalletProvider(privSpendKey, serverConfig));
    }
  } else {
    if (typeof serverConfig === 'object') {
      const { type, host } = serverConfig;
      switch (type) {
        case 'ws':
          return new Web3(new Web3.providers.WebsocketProvider(host));
        case 'ipc':
          return new Web3(new Web3.providers.IpcProvider(host));
        default:
          return new Web3(new Web3.providers.HttpProvider(host));
      }
    } else if (typeof serverConfig === 'string') {
      return new Web3(serverConfig);
    }
  }

  return null;
};

export const depositPrivateCoin = (privWeb3, contractData) => {
  const {
    amount,
    from,
    privSpendKey,
    privViewKey,
    pubAddr,
    pubSpendKey,
    pubViewKey,
  } = contractData;
  const weiAmount = decimalsToBN(amount, 18);

  const privacyContract = new privWeb3.eth.Contract(
    privacyAbi,
    PRIVACY_SMART_CONTRACT_ADDRESS,
    {
      from,
      gas: DEFAULT_GAS_TOKEN,
      gasPrice: DEFAULT_GAS_PRICE,
    },
  );
  const sender = new Stealth({
    privSpendKey,
    pubSpendKey,
    privViewKey,
    pubViewKey,
    pubAddr,
  });
  const proof = sender.genTransactionProof(
    weiAmount,
    sender.pubSpendKey,
    sender.pubViewKey,
  );

  return privacyContract.methods
    .deposit(
      `0x${getCurveXPart(proof.onetimeAddress)}`,
      `0x${getCurveYPart(proof.onetimeAddress)}`,
      `0x${getCurveXPart(proof.txPublicKey)}`,
      `0x${getCurveYPart(proof.txPublicKey)}`,
      `0x${proof.mask}`,
      `0x${proof.encryptedAmount}`,
      `0x${proof.encryptedMask}`,
    )
    .send({
      from,
      value: weiAmount,
    })
    .on('error', error => {
      throw error;
    })
    .then(receipt => receipt.events.NewUTXO.returnValues);
};

export const findUTXOsToUse = (utxoList, amount, decimals) => {
  let remainingAmount = decimalsToBN(amount, decimals);
  let results = [];

  _orderBy(utxoList, ['balance'], ['desc']).forEach(utxo => {
    const remainingAmountInDecimals = remainingAmount.toString(10, decimals);
    if (
      Number(remainingAmountInDecimals) !== 0 &&
      !remainingAmountInDecimals.includes('-')
    ) {
      remainingAmount = remainingAmount.sub(toBN(utxo.balance));
      results.push(utxo);
    }
  });

  return results;
};

export const getKeys = privKey =>
  Address.generateKeys(privKey.replace('0x', ''));

export const getPrivacyWalletBalance = async (privWeb3, walletInfo) => {
  const { address, privSpendKey } = walletInfo;
  let index = 0;
  let utxo;
  let balance = toBN('0');
  const utxos = [];

  const privacyContract = new privWeb3.eth.Contract(
    privacyAbi,
    PRIVACY_SMART_CONTRACT_ADDRESS,
    { from: address, gasPrice: DEFAULT_GAS_PRICE, gas: DEFAULT_GAS_TOKEN },
  );
  do {
    try {
      utxo = await findOwnedUTXO(privacyContract, address, index);
      const utxoIns = new UTXO(utxo);
      const isOwned = utxoIns.checkOwnership(privSpendKey);
      if (isOwned && parseFloat(isOwned.amount).toString() === isOwned.amount) {
        balance = balance.add(toBN(isOwned.amount));
        utxos.push({
          ...utxo,
          balance: isOwned.amount,
        });
      }
      index++;
    } catch (error) {
      utxo = null;
      break;
    }
  } while (!_isEmpty(utxo));

  return {
    utxos,
    balance: balance.toString(10),
  };
};

export const getPrivacyWalletInfo = (mnemonic, serverConfig) => {
  const secretKey =
    (isRecoveryPhrase(mnemonic) &&
      mnemonicToPrivateKey(mnemonic, serverConfig)) ||
    (isPrivateKey(mnemonic) && mnemonic) ||
    '';
  const privacyKeys = getKeys(secretKey);
  const newWeb3 = createPrivateWeb3(mnemonic, serverConfig);
  if (newWeb3) {
    const address = getAddressFromProvider(newWeb3);
    if (address) {
      return getPrivacyWalletBalance(newWeb3, {
        address,
        ...privacyKeys,
      })
        .then(balanceInfo => ({
          ...privacyKeys,
          ...balanceInfo,
          address: privacyKeys.pubAddr,
          privAddr: address,
        }))
        .catch(error => {
          throw new Error(
            "Cannot get wallet balance. Please recheck wallet's privacy keys.",
          );
        });
    }
    return defaultReject('Cannot get wallet balance due to invalid address.');
  }
  return defaultReject(
    'Cannot get wallet balance due to lack of Web3 provider.',
  );
};

export const sendPrivateCoin = (privWeb3, contractData) => {
  const {
    amount,
    decimals,
    from,
    privSpendKey,
    privViewKey,
    pubSpendKey,
    pubViewKey,
    to,
    utxos,
  } = contractData;

  const privacyContract = new privWeb3.eth.Contract(
    privacyAbi,
    PRIVACY_SMART_CONTRACT_ADDRESS,
    { from },
  );
  const sender = new Stealth({
    privSpendKey,
    privViewKey,
    pubAddr: from,
    pubSpendKey,
    pubViewKey,
  });
  // Get sender's remaining balance after transaction
  // Get receiver public keys
  const decodedPrivacyAddress = common.bintohex(Base58.decode(to));
  const receiver = {
    pubSpendKey: decodedPrivacyAddress.substr(0, 66),
    pubViewKey: decodedPrivacyAddress.substr(66, 66),
  };
  // Get list of necessary UTXOs
  let utxosToSend = findUTXOsToUse(utxos, amount, decimals);
  const totalBalance = utxosToSend
    .map(utxo => toBN(utxo.balance))
    .reduce((total, bal) => total.add(bal));
  const remainingAmount = totalBalance
    .sub(decimalsToBN(amount, decimals))
    .toString(10);
  utxosToSend = utxosToSend.map(utxo => {
    return new UTXO(utxo);
  });
  // Create sender & receiver transaction proves
  const randomMask = ec.genKeyPair().getPrivate('hex');
  const proofOfReceiver = sender.genTransactionProof(
    decimalsToBN(amount, decimals),
    receiver.pubSpendKey,
    receiver.pubViewKey,
    randomMask,
  );
  const remainingMask = ec.genKeyPair().getPrivate('hex');
  const proofOfSender = sender.genTransactionProof(
    remainingAmount,
    sender.pubSpendKey,
    sender.pubViewKey,
    remainingMask,
  );
  // Sum up commitments
  const inputCommitments = Commitment.sumCommitmentsFromUTXOs(
    utxosToSend,
    privSpendKey,
  );
  const proofCommitment = inputCommitments
    .add(Point.decodeFrom(ecparams, proofOfReceiver.commitment).negate())
    .getEncoded(false);

  return privacyContract.methods
    .privateSend(
      utxosToSend.map(utxoIns => utxoIns.index),
      [
        `0x${getCurveXPart(proofCommitment)}`,
        `0x${getCurveYPart(proofCommitment)}`,
        `0x${getCurveXPart(proofOfReceiver.commitment)}`,
        `0x${getCurveYPart(proofOfReceiver.commitment)}`,
        `0x${getCurveXPart(proofOfSender.onetimeAddress)}`,
        `0x${getCurveYPart(proofOfSender.onetimeAddress)}`,
        `0x${getCurveXPart(proofOfReceiver.onetimeAddress)}`,
        `0x${getCurveYPart(proofOfReceiver.onetimeAddress)}`,
        `0x${getCurveXPart(proofOfSender.txPublicKey)}`,
        `0x${getCurveYPart(proofOfSender.txPublicKey)}`,
        `0x${getCurveXPart(proofOfReceiver.txPublicKey)}`,
        `0x${getCurveYPart(proofOfReceiver.txPublicKey)}`,
      ],
      [
        `0x${proofOfSender.encryptedAmount}`,
        `0x${proofOfReceiver.encryptedAmount}`,
        `0x${proofOfSender.encryptedMask}`,
        `0x${proofOfReceiver.encryptedMask}`,
      ],
    )
    .send({
      from,
      gasPrice: DEFAULT_GAS_PRICE,
      gas: DEFAULT_GAS_TOKEN,
    })
    .then(receipt => receipt);
};

export const withdrawPrivateCoin = (privWeb3, contractData) => {
  const {
    address,
    amount,
    decimals,
    from,
    privSpendKey,
    // privViewKey,
    // pubSpendKey,
    // pubViewKey,
    utxos,
  } = contractData;

  const privacyContract = new privWeb3.eth.Contract(
    privacyAbi,
    PRIVACY_SMART_CONTRACT_ADDRESS,
    { from },
  );
  // const sender = new Stealth({
  //   privSpendKey,
  //   privViewKey,
  //   pubAddr: from,
  //   pubSpendKey,
  //   pubViewKey,
  // });
  const utxosToWithdraw = findUTXOsToUse(utxos, amount, decimals);
  let remainingAmount = decimalsToBN(amount, decimals);
  const inputCommitments = Commitment.sumCommitmentsFromUTXOs(
    utxosToWithdraw.map(utxo => new UTXO(utxo)),
    privSpendKey,
  );

  return Promise.all(
    utxosToWithdraw.map(utxo => {
      const utxoIns = new UTXO(utxo);
      const utxoIdx = utxo._index;
      const signature = utxoIns.sign(privSpendKey);
      // Calculate amount to withdraw & the remaining balance in UTXO
      let amountToWithdraw;
      let balanceAfterWithdraw;
      if (remainingAmount.sub(toBN(utxo.balance)).includes('-')) {
        amountToWithdraw = remainingAmount;
        balanceAfterWithdraw = toBN(utxo.balance).sub(remainingAmount);
      } else {
        amountToWithdraw = toBN(utxo.balance);
        balanceAfterWithdraw = toBN('0');
      }
      const basePointH = new Point.fromAffine(
        ecparams,
        new BigInteger(PEDERSON_COMMITMENT_H[0], 16),
        new BigInteger(PEDERSON_COMMITMENT_H[1], 16),
      );
      const remainingCommitment = inputCommitments.add(
        basePointH.multiply(
          BigInteger.fromHex(
            common
              .numberToHex(amountToWithdraw.toString(10, decimals))
              .negate(),
          ),
        ),
      );

      return privacyContract.methods
        .withdrawFunds(
          utxoIdx,
          amount,
          `0x${
            Stealth.encryptedAmount(
              utxoIns.lfTxPublicKey,
              utxoIns.lfStealth,
              balanceAfterWithdraw.toString(10),
            )[([...signature.r.toArray()], [...signature.s.toArray()])]
          }`,
          address,
          [
            `0x${getCurveXPart(remainingCommitment.getEncoded(false))}`,
            `0x${getCurveYPart(remainingCommitment.getEncoded(false))}`,
          ],
        )
        .send({
          from,
          gasPrice: DEFAULT_GAS_PRICE,
          gas: DEFAULT_GAS_TOKEN,
        })
        .then(receipt => receipt);
    }),
  ).then(receipts => {
    console.log('Withdraw successfully!', receipts);
  });
};
// ===================
