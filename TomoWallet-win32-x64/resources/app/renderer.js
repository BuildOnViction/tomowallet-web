const ipcRenderer = require('electron').ipcRenderer;
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

// // ===== COMMUNICATION TEST =====
// const logo = document.getElementsByClassName('nuxt-link-active')[0];

// if (logo) {
//   ipcRenderer.on('reply', function(evt, message) {
//     console.log('TomoWallet replied: ', message);
//   });

//   logo.removeAttribute('href');
//   logo.addEventListener('click', function(event) {
//     event.preventDefault();
//     ipcRenderer.send(
//       'message',
//       "Hello TomoWallet, it's " + new Date().toLocaleTimeString() + '.',
//     );
//   });
// }
// // ==============================

// // ==== MAXBET =====
// const createWeb3 = function(mnemonic, serverConfig) {
//   let provider = null;
//   if (mnemonic) {
//     if (typeof serverConfig === 'object') {
//       provider = new HDWalletProvider(
//         mnemonic,
//         serverConfig.host,
//         0,
//         1,
//         true,
//         serverConfig.hdPath,
//       );
//     } else if (typeof serverConfig === 'string') {
//       provider = new HDWalletProvider(mnemonic, serverConfig);
//     }
//   } else if (typeof serverConfig === 'object') {
//     if (serverConfig.type === 'ws') {
//       provider = new Web3.providers.WebsocketProvider(serverConfig.host);
//     } else if (serverConfig.type === 'ipc') {
//       provider = new Web3.providers.IpcProvider(serverConfig.host);
//     } else {
//       provider = new Web3.providers.HttpProvider(serverConfig.host);
//     }
//   } else if (typeof serverConfig === 'string') {
//     provider = new Web3.providers.HttpProvider(serverConfig);
//   }
//   return new Web3(provider);
// };

// const web3 = createWeb3(
//   '0xe58d6cbc8562ab3f99e802fdfdd94c005dd503b45504c2c00bd4cb9b6557f686',
//   {
//     type: 'http',
//     host: 'https://rpc.tomochain.com',
//     networkId: 88,
//     hdPath: "m/44'/889'/0'/0/",
//   },
// );

// document.getElementsByClassName('account-login')[0].click();
// setTimeout(function() {
//   document.getElementsByClassName('login-item')[1].click();
// }, 100);
// setTimeout(function() {
//   document.getElementsByTagName('textarea')[0].value =
//     'a11060f64bebb7fceed87940682952d8e17fd1143ac1df05c67215d19269a12a';
// }, 200);
// // =================
