/**
 *
 * TomoWallet - Common Messages
 *
 * This file defines all common React Intl message objects
 * that'll be used in many places in the web app
 */
// ===== IMPORTS =====
// Modules
import { defineMessages } from 'react-intl';
// ===================

// ===== MESSAGES =====
const basePrefix = 'tomowallet';
const commonPrefix = `${basePrefix}.common`;
const componentPrefix = `${basePrefix}.component`;
const containerPrefix = `${basePrefix}.container`;
const buttonPrefix = `${commonPrefix}.button`;
const listPrefix = `${commonPrefix}.list`;
const navbarPrefix = `${componentPrefix}.navbar`;
const footerPrefix = `${componentPrefix}.footer`;
const welcomePagePrefix = `${containerPrefix}.welcome`;
const createWalletPagePrefix = `${containerPrefix}.createwallet`;
const warningPagePrefix = `${createWalletPagePrefix}.warning`;
const recoveryPhrasePrefix = `${createWalletPagePrefix}.recoveryphrase`;
const verificationPrefix = `${createWalletPagePrefix}.verification`;
const successNotificationPrefix = `${createWalletPagePrefix}.successnotification`;
const importWalletPagePrefix = `${containerPrefix}.importwallet`;
const myWalletPagePrefix = `${containerPrefix}.mywallet`;

export default defineMessages({
  // Common - Button
  COMMON_BUTTON_BACK: {
    id: `${buttonPrefix}.back`,
    defaultMessage: 'Back',
  },
  COMMON_BUTTON_NEXT: {
    id: `${buttonPrefix}.next`,
    defaultMessage: 'Next',
  },
  COMMON_BUTTON_SAVE: {
    id: `${buttonPrefix}.save`,
    defaultMessage: 'Save',
  },
  COMMON_BUTTON_IMPORT: {
    id: `${buttonPrefix}.import`,
    defaultMessage: 'Import',
  },
  COMMON_BUTTON_SEND: {
    id: `${buttonPrefix}.send`,
    defaultMessage: 'Send',
  },
  COMMON_BUTTON_RECEIVE: {
    id: `${buttonPrefix}.receive`,
    defaultMessage: 'Receive',
  },
  COMMON_BUTTON_MAXIMUM: {
    id: `${buttonPrefix}.maximum`,
    defaultMessage: 'Max',
  },
  COMMON_BUTTON_CONFIRM: {
    id: `${buttonPrefix}.confirm`,
    defaultMessage: 'Confirm',
  },
  COMMON_BUTTON_UNLOCK: {
    id: `${buttonPrefix}.unlock`,
    defaultMessage: 'Unlock',
  },
  // Common - Lists
  COMMON_LIST_LANGUAGE_ENGLISH: {
    id: `${listPrefix}.language.english`,
    defaultMessage: 'English',
  },
  COMMON_LIST_LANGUAGE_FRENCH: {
    id: `${listPrefix}.language.french`,
    defaultMessage: 'French',
  },
  COMMON_LIST_NETWORK_TOMOCHAIN_TESTNET: {
    id: `${listPrefix}.network.tomochain.testnet`,
    defaultMessage: 'TomoChain Test Network',
  },
  COMMON_LIST_NETWORK_TOMOCHAIN_MAINNET: {
    id: `${listPrefix}.network.tomochain.mainnet`,
    defaultMessage: 'Main TomoChain Network',
  },
  // Component - Header Navigation Bar
  HEADER_NAVBAR_LOGO_ALT: {
    id: `${navbarPrefix}.logo.alt`,
    defaultMessage: 'TOMOCHAIN LOGO',
  },
  HEADER_NAVBAR_OPTION_ABOUT: {
    id: `${navbarPrefix}.option.about`,
    defaultMessage: 'About',
  },
  HEADER_NAVBAR_OPTION_FAQS: {
    id: `${navbarPrefix}.option.faqs`,
    defaultMessage: 'FAQ',
  },
  HEADER_NAVBAR_OPTION_MY_WALLET: {
    id: `${navbarPrefix}.option.mywallet`,
    defaultMessage: 'My Wallet',
  },
  HEADER_NAVBAR_OPTION_MY_WALLET_OPTION_SHOW_WALLET: {
    id: `${navbarPrefix}.option.mywallet.option.showprofile`,
    defaultMessage: 'Show Wallet',
  },
  HEADER_NAVBAR_OPTION_MY_WALLET_OPTION_HELP: {
    id: `${navbarPrefix}.option.mywallet.option.settings`,
    defaultMessage: 'Help',
  },
  HEADER_NAVBAR_OPTION_MY_WALLET_OPTION_LOG_OUT: {
    id: `${navbarPrefix}.option.mywallet.option.logout`,
    defaultMessage: 'Log out',
  },
  HEADER_NAVBAR_POPUP_SHOW_WALLET_TITLE: {
    id: `${navbarPrefix}.popup.showwallet.title`,
    defaultMessage: 'Show Wallet',
  },
  HEADER_NAVBAR_POPUP_SHOW_WALLET_WARNING_IMAGE_ALT: {
    id: `${navbarPrefix}.popup.showwallet.warning.image.alt`,
    defaultMessage: 'Warning image',
  },
  HEADER_NAVBAR_POPUP_SHOW_WALLET_WARNING_TEXT: {
    id: `${navbarPrefix}.popup.showwallet.warning.text`,
    defaultMessage:
      'We are about to show your recovery phrase and private key, please ensure that no one else is looking at your screen.',
  },
  HEADER_NAVBAR_POPUP_SHOW_WALLET_TAB_RECOVERY_PHRASE: {
    id: `${navbarPrefix}.popup.showwallet.tab.recoveryphrase`,
    defaultMessage: 'Recovery phrase',
  },
  HEADER_NAVBAR_POPUP_SHOW_WALLET_TAB_PRIVATE_KEY: {
    id: `${navbarPrefix}.popup.showwallet.tab.privatekey`,
    defaultMessage: 'Private key',
  },
  HEADER_NAVBAR_POPUP_SHOW_WALLET_TAB_PRIVATE_KEY_NOTE: {
    id: `${navbarPrefix}.popup.showwallet.tab.privatekey.note`,
    defaultMessage: 'Remove all spaces to use private key, please',
  },
  // Component - Page Footer
  FOOTER_VERSION_TEXT: {
    id: `${footerPrefix}.versiontext`,
    defaultMessage: 'TomoWallet 2019 - v1.0',
  },
  FOOTER_OPTION_HELP: {
    id: `${footerPrefix}.option.help`,
    defaultMessage: 'Need help?',
  },
  FOOTER_OPTION_POLICY: {
    id: `${footerPrefix}.option.policy`,
    defaultMessage: 'Privacy Policy',
  },
  FOOTER_OPTION_TERMS_OF_SERVICE: {
    id: `${footerPrefix}.option.termsofservice`,
    defaultMessage: 'Terms of Service',
  },
  FOOTER_OPTION_API_DOCUMENTATION: {
    id: `${footerPrefix}.option.apidocumentation`,
    defaultMessage: 'API Documentation',
  },
  // Welcome Page
  WELCOME_TITLE: {
    id: `${welcomePagePrefix}.title`,
    defaultMessage: 'Welcome to TomoWallet',
  },
  WELCOME_DESCRIPTION: {
    id: `${welcomePagePrefix}.description`,
    defaultMessage:
      'TomoWallet (our friends call us TMW) is a free, client-side interface helping you interact with the TomoChain. Our easy-to-use, open-source platform allows you to generate wallets, interact with smart contracts, and so much more.',
  },
  WELCOME_BUTTON_CREATE_NEW_WALLET: {
    id: `${welcomePagePrefix}.button.createnewwallet`,
    defaultMessage: 'Create a New Wallet',
  },
  WELCOME_TEXT_BETWEEN_BUTTONS: {
    id: `${welcomePagePrefix}.textbetweenbuttons`,
    defaultMessage: 'or',
  },
  WELCOME_BUTTON_IMPORT_WALLET: {
    id: `${welcomePagePrefix}.button.importwallet`,
    defaultMessage: 'Import Your Wallet',
  },
  WELCOME_IMAGE_ALT: {
    id: `${welcomePagePrefix}.image.alt`,
    defaultMessage: 'Welcome to TomoWallet',
  },
  // Create Wallet - Warning Page
  WARNING_HEADER_TITLE: {
    id: `${warningPagePrefix}.header.title`,
    defaultMessage: 'Create New Wallet',
  },
  WARNING_HEADER_ALTERNATIVE_TEXT: {
    id: `${warningPagePrefix}.header.alternative.text`,
    defaultMessage: 'Already have a wallet?',
  },
  WARNING_HEADER_ALTERNATIVE_LINK: {
    id: `${warningPagePrefix}.header.alternative.link`,
    defaultMessage: 'Import your wallet',
  },
  WARNING_IMAGE_ALT: {
    id: `${warningPagePrefix}.image.alt`,
    defaultMessage: 'Warning!',
  },
  WARNING_CONTENT_TITLE: {
    id: `${warningPagePrefix}.content.title`,
    defaultMessage: "Let's secure your account",
  },
  WARNING_CONTENT_DESCRIPTION: {
    id: `${warningPagePrefix}.content.description`,
    defaultMessage:
      'Your backup phrase contains all of the private keys within your wallet. Please write down these 12 words, in order, and keep them somewhere safe offline. This phrase will gives you (or anyone who has it) a way to restore your wallet and access your funds. In the event that you lose your password or our service is unavailable, this will be your safety net.',
  },
  WARNING_CONTENT_DESCRIPTION_DANGER: {
    id: `${warningPagePrefix}.content.description.danger`,
    defaultMessage:
      'If you lose your recovery phrase, you will be unable to recover access to your account',
  },
  WARNING_BUTTON_NEXT_TO_RECOVERY_PHRASE: {
    id: `${warningPagePrefix}.button.nexttorecoveryphrase`,
    defaultMessage: 'Next to Recovery Phrase',
  },
  // Create Wallet - Recovery Phrase Page
  RECOVERY_PHRASE_TITLE: {
    id: `${recoveryPhrasePrefix}.title`,
    defaultMessage: 'Recovery Phrase',
  },
  RECOVERY_PHRASE_NOTIFICATION_TITLE: {
    id: `${recoveryPhrasePrefix}.notification.title`,
    defaultMessage: 'Please back up recovery phrase',
  },
  RECOVERY_PHRASE_NOTIFICATION_DESCRIPTION: {
    id: `${recoveryPhrasePrefix}.notification.description`,
    defaultMessage:
      'Back up the text below on paper and keep it somewhere secret and save.',
  },
  RECOVERY_PHRASE_BUTTON_SAVE: {
    id: `${recoveryPhrasePrefix}.button.save`,
    defaultMessage: 'Save Recovery Phrase',
  },
  RECOVERY_PHRASE_BUTTON_VIEW_PRIVATE_KEY: {
    id: `${recoveryPhrasePrefix}.button.view.privatekey`,
    defaultMessage: 'View my private key',
  },
  RECOVERY_PHRASE_BUTTON_CONFIRMATION: {
    id: `${recoveryPhrasePrefix}.button.confirmation`,
    defaultMessage: 'I Wrote My Recovery Phrase',
  },
  RECOVERY_PHRASE_POPUP_CONFIRMATION_IMAGE_ALT: {
    id: `${recoveryPhrasePrefix}.popup.confirmation.image.alt`,
    defaultMessage: 'Did you note down?',
  },
  RECOVERY_PHRASE_POPUP_CONFIRMATION_HEADER: {
    id: `${recoveryPhrasePrefix}.popup.confirmation.header`,
    defaultMessage: 'Recovery Phrase?',
  },
  RECOVERY_PHRASE_POPUP_CONFIRMATION_CONTENT: {
    id: `${recoveryPhrasePrefix}.popup.confirmation.content`,
    defaultMessage: 'Are you sure you have noted down your Recovery Phrase?',
  },
  RECOVERY_PHRASE_POPUP_KEY_VIEW_HEADER: {
    id: `${recoveryPhrasePrefix}.popup.keyview.header`,
    defaultMessage: 'Private Key',
  },
  RECOVERY_PHRASE_POPUP_KEY_VIEW_CONTENT_TITLE: {
    id: `${recoveryPhrasePrefix}.popup.keyview.content.title`,
    defaultMessage: 'Your private key',
  },
  RECOVERY_PHRASE_POPUP_KEY_VIEW_CONTENT_TEXT: {
    id: `${recoveryPhrasePrefix}.popup.keyview.content.text`,
    defaultMessage:
      'Back up the text below on paper and keep it somewhere secret and save.',
  },
  RECOVERY_PHRASE_POPUP_KEY_VIEW_CONTENT_QRCODE_ALT: {
    id: `${recoveryPhrasePrefix}.popup.keyview.content.qrcode.alt`,
    defaultMessage:
      'Click here to view QR Code. Make sure no one else is looking!',
  },
  // Create Wallet - Mnemonic Verification Page
  VERIFICATION_TITLE: {
    id: `${verificationPrefix}.title`,
    defaultMessage: 'Verification',
  },
  VERIFICATION_DESCRIPTION: {
    id: `${verificationPrefix}.description`,
    defaultMessage:
      'Verify your Recovery Phrase. Choose each word in the correct order',
  },
  VERIFICATION_BUTTON_VERIFY: {
    id: `${verificationPrefix}.button.verify`,
    defaultMessage: 'Verify',
  },
  VERIFICATION_ERROR_VERIFY_FAILED: {
    id: `${verificationPrefix}.error.verify.failed`,
    defaultMessage: 'Incorrect recovery phrase order.',
  },
  // Create Wallet - Success Notification Page
  SUCCESS_NOTIFICATION_IMAGE_ALT: {
    id: `${successNotificationPrefix}.image.alt`,
    defaultMessage: 'Success!',
  },
  SUCCESS_NOTIFICATION_CONTENT_TITLE: {
    id: `${successNotificationPrefix}.content.title`,
    defaultMessage: 'Successful',
  },
  SUCCESS_NOTIFICATION_CONTENT_DESCRIPTION: {
    id: `${successNotificationPrefix}.content.description`,
    defaultMessage: "You've created your new wallet successfully",
  },
  SUCCESS_NOTIFICATION_BUTTON_ACCESS_WALLET: {
    id: `${successNotificationPrefix}.button.accesswallet`,
    defaultMessage: 'Access your wallet now',
  },
  // Import Wallet Page
  IMPORT_WALLET_HEADER_TITLE: {
    id: `${importWalletPagePrefix}.header.title`,
    defaultMessage: 'Import Your Wallet',
  },
  IMPORT_WALLET_ALTERNATIVE_TEXT: {
    id: `${importWalletPagePrefix}.alternative.text`,
    defaultMessage: 'Do not have a wallet?',
  },
  IMPORT_WALLET_ALTERNATIVE_LINK: {
    id: `${importWalletPagePrefix}.alternative.link`,
    defaultMessage: 'Create a new wallet',
  },
  IMPORT_WALLET_TAB_LEDGER_IMAGE_ALT: {
    id: `${importWalletPagePrefix}.tab.ledger.image.alt`,
    defaultMessage: 'Ledger',
  },
  IMPORT_WALLET_TAB_LEDGER_TEXT: {
    id: `${importWalletPagePrefix}.tab.ledger.text`,
    defaultMessage: 'Ledger Wallet',
  },
  IMPORT_WALLET_TAB_LEDGER_INPUT_LABEL: {
    id: `${importWalletPagePrefix}.tab.ledger.input.label`,
    defaultMessage: 'Select HD derivation path',
  },
  IMPORT_WALLET_TAB_LEDGER_INPUT_PLACEHOLDER: {
    id: `${importWalletPagePrefix}.tab.ledger.input.placeholder`,
    defaultMessage: 'Select HD derivation path...',
  },
  IMPORT_WALLET_TAB_LEDGER_INPUT_DESCRIPTION: {
    id: `${importWalletPagePrefix}.tab.ledger.input.description`,
    defaultMessage:
      'To unlock the wallet, try paths {path1} or {path2} with Ethereum App, or try path {path3} with TomoChain App (on Ledger)',
  },
  IMPORT_WALLET_TAB_RECOVERY_PHRASE_TEXT: {
    id: `${importWalletPagePrefix}.tab.recoveryphrase.text`,
    defaultMessage: 'Recovery Phrase/ Private Key',
  },
  IMPORT_WALLET_TAB_RECOVERY_PHRASE_INPUT_LABEL: {
    id: `${importWalletPagePrefix}.tab.recoveryphrase.input.label`,
    defaultMessage: 'Enter your Recovery Phrase or Private Key',
  },
  IMPORT_WALLET_TAB_RECOVERY_PHRASE_INPUT_PLACEHOLDER: {
    id: `${importWalletPagePrefix}.tab.recoveryphrase.input.placeholder`,
    defaultMessage: 'Enter your Recovery Phrase or Private Key...',
  },
  IMPORT_WALLET_TAB_RECOVERY_PHRASE_OPTION_IMPORT_VIA_QRCODE: {
    id: `${importWalletPagePrefix}.tab.recoveryphrase.option.importviaqrcode`,
    defaultMessage: 'Import Private Key via QR code',
  },
  IMPORT_WALLET_ERROR_INVALID_RECOVERY_PHRASE: {
    id: `${importWalletPagePrefix}.error.invalid.recoveryphrase`,
    defaultMessage: 'Invalid recovery phrase/private key',
  },
  IMPORT_WALLET_ERROR_INVALID_HD_PATH: {
    id: `${importWalletPagePrefix}.error.invalid.hdpath`,
    defaultMessage: 'Invalid HD Path',
  },
  IMPORT_WALLET_POPUP_ADDRESS_TITLE: {
    id: `${importWalletPagePrefix}.popup.address.title`,
    defaultMessage: 'Ledger Wallet',
  },
  // My Wallet Page
  MY_WALLET_SECTION_ADDRESS_TITLE: {
    id: `${myWalletPagePrefix}.section.address.title`,
    defaultMessage: 'Address',
  },
  MY_WALLET_TABLE_PORTFOLIO_TITLE: {
    id: `${myWalletPagePrefix}.table.tab.portfolio.title`,
    defaultMessage: 'PORTFOLIO',
  },
  MY_WALLET_TABLE_PORTFOLIO_HEADER_TOKEN_NAME: {
    id: `${myWalletPagePrefix}.table.portfolio.header.tokenname`,
    defaultMessage: 'Token name',
  },
  MY_WALLET_TABLE_PORTFOLIO_HEADER_BALANCE: {
    id: `${myWalletPagePrefix}.table.portfolio.header.balance`,
    defaultMessage: 'Balance',
  },
  MY_WALLET_TABLE_PORTFOLIO_HEADER_VALUE: {
    id: `${myWalletPagePrefix}.table.portfolio.header.value`,
    defaultMessage: 'Value (USD)',
  },
  MY_WALLET_TABLE_PORTFOLIO_HEADER_PRICE: {
    id: `${myWalletPagePrefix}.table.portfolio.header.price`,
    defaultMessage: 'Price (USD)',
  },
  MY_WALLET_TABLE_PORTFOLIO_HEADER_SEND: {
    id: `${myWalletPagePrefix}.table.portfolio.header.send`,
    defaultMessage: 'Send',
  },
  MY_WALLET_TABLE_PORTFOLIO_HEADER_RECEIVE: {
    id: `${myWalletPagePrefix}.table.portfolio.header.receive`,
    defaultMessage: 'Receive',
  },
  MY_WALLET_TABLE_PORTFOLIO_CELL_TOKEN_NAME_IMAGE_ALT: {
    id: `${myWalletPagePrefix}.table.portfolio.cell.tokenname.image.alt`,
    defaultMessage: '{name} Symbol',
  },
  MY_WALLET_TABLE_PORTFOLIO_CELL_TOKEN_NAME_PUBLISHER: {
    id: `${myWalletPagePrefix}.table.portfolio.cell.tokenname.publisher`,
    defaultMessage: 'TomoChain',
  },
  MY_WALLET_TABLE_PORTFOLIO_ERROR_LOAD_FAILED: {
    id: `${myWalletPagePrefix}.table.portfolio.error.load.failed`,
    defaultMessage: 'Cannot load token list!',
  },
  MY_WALLET_TABLE_TRANSACTION_TITLE: {
    id: `${myWalletPagePrefix}.table.tab.transaction.title`,
    defaultMessage: 'TRANSACTIONS',
  },
  MY_WALLET_TABLE_TRANSACTIONS_HEADER_TOKEN_TYPE: {
    id: `${myWalletPagePrefix}.table.transactions.header.tokentype`,
    defaultMessage: 'Token',
  },
  MY_WALLET_TABLE_TRANSACTIONS_HEADER_TX_HASH: {
    id: `${myWalletPagePrefix}.table.transactions.header.txhash`,
    defaultMessage: 'Txn Hash',
  },
  MY_WALLET_TABLE_TRANSACTIONS_HEADER_CREATE_TIME: {
    id: `${myWalletPagePrefix}.table.transactions.header.createtime`,
    defaultMessage: 'Age',
  },
  MY_WALLET_TABLE_TRANSACTIONS_HEADER_FROM: {
    id: `${myWalletPagePrefix}.table.transactions.header.from`,
    defaultMessage: 'From',
  },
  MY_WALLET_TABLE_TRANSACTIONS_HEADER_TO: {
    id: `${myWalletPagePrefix}.table.transactions.header.to`,
    defaultMessage: 'To',
  },
  MY_WALLET_TABLE_TRANSACTIONS_HEADER_QUANTITY: {
    id: `${myWalletPagePrefix}.table.transactions.header.quantity`,
    defaultMessage: 'Quantity',
  },
  MY_WALLET_POPUP_SEND_TOKEN_TITLE: {
    id: `${myWalletPagePrefix}.popup.sendtoken.title`,
    defaultMessage: 'Send',
  },
  MY_WALLET_POPUP_SEND_TOKEN_INPUT_TOKEN_LABEL: {
    id: `${myWalletPagePrefix}.popup.sendtoken.input.token.label`,
    defaultMessage: 'Token',
  },
  MY_WALLET_POPUP_SEND_TOKEN_INPUT_TOKEN_PLACEHOLDER: {
    id: `${myWalletPagePrefix}.popup.sendtoken.input.token.placeholder`,
    defaultMessage: 'Select token...',
  },
  MY_WALLET_POPUP_SEND_TOKEN_INPUT_RECIPIENT_LABEL: {
    id: `${myWalletPagePrefix}.popup.sendtoken.input.recipient.label`,
    defaultMessage: 'Recipient',
  },
  MY_WALLET_POPUP_SEND_TOKEN_INPUT_RECIPIENT_PLACEHOLDER: {
    id: `${myWalletPagePrefix}.popup.sendtoken.input.recipient.placeholder`,
    defaultMessage: 'Paste or scan an address...',
  },
  MY_WALLET_POPUP_SEND_TOKEN_INPUT_TRANSFER_AMOUNT_LABEL: {
    id: `${myWalletPagePrefix}.popup.sendtoken.input.transferamount.label`,
    defaultMessage: 'Transfer Amount',
  },
  MY_WALLET_POPUP_SEND_TOKEN_INPUT_TRANSFER_AMOUNT_PLACEHOLDER: {
    id: `${myWalletPagePrefix}.popup.sendtoken.input.transferamount.placeholder`,
    defaultMessage: 'Add amount token...',
  },
  MY_WALLET_POPUP_SEND_TOKEN_INPUT_MESSAGE_LABEL: {
    id: `${myWalletPagePrefix}.popup.sendtoken.input.message.label`,
    defaultMessage: 'Message',
  },
  MY_WALLET_POPUP_SEND_TOKEN_INPUT_MESSAGE_PLACEHOLDER: {
    id: `${myWalletPagePrefix}.popup.sendtoken.input.message.placeholder`,
    defaultMessage: 'Write message...',
  },
  MY_WALLET_POPUP_SEND_TOKEN_INPUT_AMOUNT_LABEL: {
    id: `${myWalletPagePrefix}.popup.sendtoken.input.amount.label`,
    defaultMessage: 'Amount',
  },
  MY_WALLET_POPUP_SEND_TOKEN_INPUT_FROM_LABEL: {
    id: `${myWalletPagePrefix}.popup.sendtoken.input.from.label`,
    defaultMessage: 'From',
  },
  MY_WALLET_POPUP_SEND_TOKEN_INPUT_TO_LABEL: {
    id: `${myWalletPagePrefix}.popup.sendtoken.input.to.label`,
    defaultMessage: 'To',
  },
  MY_WALLET_POPUP_SEND_TOKEN_INFO_TRANSACTION_FEE_LABEL: {
    id: `${myWalletPagePrefix}.popup.sendtoken.info.transactionfee.label`,
    defaultMessage: 'Transaction fee',
  },
  MY_WALLET_POPUP_SEND_TOKEN_ERROR_TOKEN_REQUIRED: {
    id: `${myWalletPagePrefix}.popup.sendtoken.error.token.required`,
    defaultMessage: 'Please choose a token',
  },
  MY_WALLET_POPUP_SEND_TOKEN_ERROR_RECIPIENT_REQUIRED: {
    id: `${myWalletPagePrefix}.popup.sendtoken.error.recipient.required`,
    defaultMessage: 'Please enter a recipient address',
  },
  MY_WALLET_POPUP_SEND_TOKEN_ERROR_RECIPIENT_INVALID: {
    id: `${myWalletPagePrefix}.popup.sendtoken.error.recipient.invalid`,
    defaultMessage: 'This recipient is invalid',
  },
  MY_WALLET_POPUP_SEND_TOKEN_ERROR_AMOUNT_REQUIRED: {
    id: `${myWalletPagePrefix}.popup.sendtoken.error.amount.required`,
    defaultMessage: 'Please enter an amount of token',
  },
  MY_WALLET_POPUP_SEND_TOKEN_ERROR_AMOUNT_INVALID: {
    id: `${myWalletPagePrefix}.popup.sendtoken.error.amount.invalid`,
    defaultMessage: 'Transfer amount is not correct',
  },
  MY_WALLET_POPUP_SEND_TOKEN_ERROR_MESSAGE_MAXLENGTH: {
    id: `${myWalletPagePrefix}.popup.sendtoken.error.message.maxlength`,
    defaultMessage: 'Message exceeds maximum 255 characters',
  },
  MY_WALLET_POPUP_SUCCESS_INFO_AMOUNT_SENT: {
    id: `${myWalletPagePrefix}.popup.success.info.amountsent`,
    defaultMessage: 'You have sent',
  },
  MY_WALLET_POPUP_SUCCESS_INFO_TRANSACTION_HASH: {
    id: `${myWalletPagePrefix}.popup.success.info.transactionhash`,
    defaultMessage: 'Transaction hash',
  },
  MY_WALLET_POPUP_RECEIVE_TOKEN_TITLE: {
    id: `${myWalletPagePrefix}.popup.receivetoken.title`,
    defaultMessage: 'Receive',
  },
  MY_WALLET_POPUP_RECEIVE_TOKEN_CONTENT_MESSAGE: {
    id: `${myWalletPagePrefix}.popup.receivetoken.content.message`,
    defaultMessage: 'Your address supports transferring to TOMO and its token',
  },
});
// ====================
