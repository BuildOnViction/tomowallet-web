/**
 *
 * TomoWallet - Utility - Blockchain - ClaimLition Utilities
 *
 */
// ===== IMPORTS =====
import Web3 from "web3";
// Utilities
import claimLition from "./abi/claimLition.json";
import { bnToDecimals } from "./utilities";
// ===================

// ===== SUPPORTED VARIABLES =====
const CLAIM_LITION_CONTRACT = '0x2c45e23dbba7051eed71a7596b8c72742c30b5d3';
const LITION_ADDRESS = '0xf9787e76750c1e731054cf4cc97a2e3f490db360';

const START_BLOCK = 27813000;
const END_BLOCK = 29109000;
const DEFAULT_DECIMALS = 2;
// ===============================

// ===== METHODS =====
/**
 * claimToken
 *
 * Claim airdrop token
 * @param {Web3} web3 A Web3 object with provider initiated
 * @param {String} guy The guy claim token
 */
const claimToken = async (web3, guy) => {
  const contract = await new web3.eth.Contract(claimLition, CLAIM_LITION_CONTRACT);
  return new Promise((resolve, reject) => {
    contract.methods.claimToken(LITION_ADDRESS).send({from: guy}, function (err, hash) {
      if (err) {
        console.log(err)
        return reject(err)
      } else {
        return resolve(hash)
      }
    }).catch(e => { reject(e) })
  })
}

/**
 * claimToken
 *
 * Check the guy can claim
 * @param {Web3} web3 A Web3 object with provider initiated
 * @param {String} guy The guy claim token
 */
const canClaim = async (web3, guy) => {
  const currentBlock = await web3.eth.blockNumber
  if (currentBlock < START_BLOCK || currentBlock > END_BLOCK) {
    return 0
  }
  const contract = await new web3.eth.Contract(claimLition, CLAIM_LITION_CONTRACT);

  let amount = await contract.methods.getBalanceCanClain(guy).call()
  amount = bnToDecimals(amount, DEFAULT_DECIMALS)
  return amount
}
// ===================

export {
  claimToken,
  canClaim
};
