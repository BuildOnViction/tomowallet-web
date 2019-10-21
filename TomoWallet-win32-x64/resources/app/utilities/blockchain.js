const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

const createWeb3 = function(mnemonic, serverConfig) {
  let provider = null;
  if (mnemonic) {
    if (typeof serverConfig === 'object') {
      provider = new HDWalletProvider(
        mnemonic,
        serverConfig.host,
        0,
        1,
        true,
        serverConfig.hdPath,
      );
    } else if (typeof serverConfig === 'string') {
      provider = new HDWalletProvider(mnemonic, serverConfig);
    }
  } else if (typeof serverConfig === 'object') {
    if (serverConfig.type === 'ws') {
      provider = new Web3.providers.WebsocketProvider(serverConfig.host);
    } else if (serverConfig.type === 'ipc') {
      provider = new Web3.providers.IpcProvider(serverConfig.host);
    } else {
      provider = new Web3.providers.HttpProvider(serverConfig.host);
    }
  } else if (typeof serverConfig === 'string') {
    provider = new Web3.providers.HttpProvider(serverConfig);
  }
  return new Web3(provider);
};

module.exports = {
  createWeb3,
};
