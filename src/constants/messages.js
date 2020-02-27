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
const clipboardPopupPrefix = `${componentPrefix}.popup.clipboard`;
const fileUploadInputPrefix = `${componentPrefix}.input.fileupload`;
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
  COMMON_BUTTON_CLOSE: {
    id: `${buttonPrefix}.close`,
    defaultMessage: 'Close',
  },
  COMMON_BUTTON_DEPOSIT: {
    id: `${buttonPrefix}.deposit`,
    defaultMessage: 'Deposit',
  },
  COMMON_BUTTON_WITHDRAW: {
    id: `${buttonPrefix}.withdraw`,
    defaultMessage: 'Withdraw',
  },
  COMMON_BUTTON_COPY: {
    id: `${buttonPrefix}.copy`,
    defaultMessage: 'Copy',
  },
  // Common - Lists
  COMMON_LIST_LANGUAGE_ENGLISH: {
    id: `${listPrefix}.language.english`,
    defaultMessage: 'English',
  },
  COMMON_LIST_LANGUAGE_FRENCH: {
    id: `${listPrefix}.language.french`,
    defaultMessage: 'Français',
  },
  COMMON_LIST_NETWORK_TOMOCHAIN_TESTNET: {
    id: `${listPrefix}.network.tomochain.testnet`,
    defaultMessage: 'TomoChain TestNet',
  },
  COMMON_LIST_NETWORK_TOMOCHAIN_MAINNET: {
    id: `${listPrefix}.network.tomochain.mainnet`,
    defaultMessage: 'TomoChain MainNet',
  },
  // Component - Header Navigation Bar
  HEADER_NAVBAR_MENU_SWITCH_NETWORK: {
    id: `${navbarPrefix}.menu.switch.network`,
    defaultMessage: 'Switch netwok',
  },
  HEADER_NAVBAR_MENU_LANGUAGE: {
    id: `${navbarPrefix}.menu.language`,
    defaultMessage: 'Language',
  },
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
  HEADER_NAVBAR_PRIVACY_MOD: {
    id: `${navbarPrefix}.switch.mode.privacy`,
    defaultMessage: 'Switch to Privacy Mode',
  },
  HEADER_NAVBAR_NORMAL_MOD: {
    id: `${navbarPrefix}.switch.mode.main`,
    defaultMessage: 'Switch to Public Mode',
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
  HEADER_NAVBAR_POPUP_NETWORK_CONFIRMATION_TITLE: {
    id: `${navbarPrefix}.popup.networkconfirmation.title`,
    defaultMessage: 'Confirmation',
  },
  HEADER_NAVBAR_POPUP_NETWORK_CONFIRMATION_CONTENT_TEXT: {
    id: `${navbarPrefix}.popup.networkconfirmation.content.text`,
    defaultMessage:
      'Changing network setting will log you out of the wallet as well. Are you sure you want to change the network?',
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
  FOOTER_OPTION_TERMS_USE: {
    id: `${footerPrefix}.option.termsofuse`,
    defaultMessage: 'Terms of Use',
  },
  FOOTER_OPTION_PRIVACY_POLICY: {
    id: `${footerPrefix}.option.privacypolicy`,
    defaultMessage: 'Privacy Policy',
  },
  // Component - Clipboard Popup
  POPUP_CLIPBOARD_CONTENT_MESSAGE: {
    id: `${clipboardPopupPrefix}.content.message`,
    defaultMessage: 'Copied to Clipboard',
  },
  // Component - File Upload Input
  INPUT_FILE_UPLOAD_BUTTON_LABEL: {
    id: `${fileUploadInputPrefix}.button.label`,
    defaultMessage: 'Upload File',
  },
  INPUT_FILE_UPLOAD_PLACEHOLDER: {
    id: `${fileUploadInputPrefix}.placeholder`,
    defaultMessage: 'Drag/drop a file or click to browse...',
  },
  // Welcome Page
  WELCOME_TITLE: {
    id: `${welcomePagePrefix}.title`,
    defaultMessage: 'Welcome to TomoWallet',
  },
  WELCOME_DESCRIPTION: {
    id: `${welcomePagePrefix}.description`,
    defaultMessage:
      'TomoWallet (our friends call us TMW) is a free, client-side interface helping you interact with TomoChain. Our easy-to-use, open-source platform allows you to generate wallets, interact with smart contracts, and so much more.',
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
  WELCOME_FORM_PASSWORD_TITLE: {
    id: `${welcomePagePrefix}.form.password.title`,
    defaultMessage: 'Wallet Quick Access',
  },
  WELCOME_FORM_PASSWORD_ADDRESS_VIEW: {
    id: `${welcomePagePrefix}.form.password.addressview`,
    defaultMessage: 'Address: ',
  },
  WELCOME_FORM_PASSWORD_DESCRIPTION: {
    id: `${welcomePagePrefix}.form.password.description`,
    defaultMessage:
      'Type in password to continue accessing your previous wallet',
  },
  WELCOME_FORM_PASSWORD_DESCRIPTION_ALTERNATIVE_LOGIN: {
    id: `${welcomePagePrefix}.form.password.description.alternative.login`,
    defaultMessage: 'Access different wallet',
  },
  WELCOME_FORM_PASSWORD_BUTTON_LOGIN: {
    id: `${welcomePagePrefix}.form.password.button.login`,
    defaultMessage: 'Log In',
  },
  WELCOME_FORM_PASSWORD_INPUT_PASSWORD_LABEL: {
    id: `${welcomePagePrefix}.form.password.input.password.label`,
    defaultMessage: 'Password',
  },
  WELCOME_FORM_PASSWORD_INPUT_PASSWORD_PLACEHOLDER: {
    id: `${welcomePagePrefix}.form.password.input.password.placeholder`,
    defaultMessage: 'Enter password...',
  },
  WELCOME_FORM_PASSWORD_ERROR_INVALID_PASSWORD: {
    id: `${welcomePagePrefix}.form.password.error.invalid.password`,
    defaultMessage: 'Given password is incorrect',
  },
  WELCOME_FORM_PASSWORD_ERROR_KEYSTORE_NOT_EXISTS: {
    id: `${welcomePagePrefix}.form.password.error.keystore.not.exists`,
    defaultMessage: 'Cannot find any keystore file.',
  },
  WELCOME_FORM_PASSWORD_ERROR_INVALID_PRIVATE_KEY: {
    id: `${welcomePagePrefix}.form.password.error.invalid.privatekey`,
    defaultMessage: 'Received private key is invalid.',
  },
  WELCOME_FORM_PASSWORD_ERROR_RETRIEVE_WALLET_FAILED: {
    id: `${welcomePagePrefix}.form.password.error.retrieve.wallet.failed`,
    defaultMessage:
      'Cannot retrieve wallet information due to corrupted Web3 provider.',
  },
  WELCOME_NOTIFICATION_MOBILE_BROWSER_NOT_SUPPORTED: {
    id: `${welcomePagePrefix}.notification.mobile.browser.not.supported`,
    defaultMessage:
      'Sorry! We don’t support TomoWallet web version on mobile browsers. Please download app version to access TomoWallet.',
  },
  WELCOME_NOTIFICATION_MOBILE_DOWNLOAD_PART_1: {
    id: `${welcomePagePrefix}.notification.mobile.download.part1`,
    defaultMessage: 'Download TomoWallet app',
  },
  WELCOME_NOTIFICATION_MOBILE_DOWNLOAD_PART_2: {
    id: `${welcomePagePrefix}.notification.mobile.download.part2`,
    defaultMessage: 'Link: http://l.ead.me/bb0oA6',
  },
  // Create Wallet Page
  CREATE_WALLET_TITLE: {
    id: `${createWalletPagePrefix}.title`,
    defaultMessage: 'Create New Wallet',
  },
  CREATE_WALLET_POPUP_PASSWORD_TITLE: {
    id: `${createWalletPagePrefix}.popup.password.title`,
    defaultMessage: 'Password',
  },
  CREATE_WALLET_POPUP_PASSWORD_INPUT_LABEL: {
    id: `${createWalletPagePrefix}.popup.password.input.label`,
    defaultMessage: 'Your Password',
  },
  CREATE_WALLET_POPUP_PASSWORD_INPUT_PLACEHOLDER: {
    id: `${createWalletPagePrefix}.popup.password.input.placeholder`,
    defaultMessage: 'Type at least 8 characters',
  },
  CREATE_WALLET_POPUP_PASSWORD_INPUT_TOOLTIP: {
    id: `${createWalletPagePrefix}.popup.password.input.tooltip`,
    defaultMessage:
      'This password is used to encrypt your private key, not to generate it as a seed.',
  },
  CREATE_WALLET_POPUP_PASSWORD_INPUT_REMIND_TEXT_PART_1: {
    id: `${createWalletPagePrefix}.popup.password.input.remindtext.part.1`,
    defaultMessage: 'DO NOT FORGET',
  },
  CREATE_WALLET_POPUP_PASSWORD_INPUT_REMIND_TEXT_PART_2: {
    id: `${createWalletPagePrefix}.popup.password.input.remindtext.part.2`,
    defaultMessage: "to save your password. You'll need",
  },
  CREATE_WALLET_POPUP_PASSWORD_INPUT_REMIND_TEXT_PART_3: {
    id: `${createWalletPagePrefix}.popup.password.input.remindtext.part.3`,
    defaultMessage: 'Password + Keystore',
  },
  CREATE_WALLET_POPUP_PASSWORD_INPUT_REMIND_TEXT_PART_4: {
    id: `${createWalletPagePrefix}.popup.password.input.remindtext.part.4`,
    defaultMessage: 'to unlock your wallet.',
  },
  CREATE_WALLET_POPUP_PASSWORD_INPUT_CONFIRMATION_LABEL: {
    id: `${createWalletPagePrefix}.popup.password.input.confirmation.label`,
    defaultMessage: 'Password Confirmation',
  },
  CREATE_WALLET_POPUP_PASSWORD_INPUT_CONFIRMATION_PLACEHOLDER: {
    id: `${createWalletPagePrefix}.popup.password.input.confirmation.placeholder`,
    defaultMessage: 'Type your password again',
  },
  CREATE_WALLET_POPUP_PASSWORD_ERROR_PASSWORD_REQUIRED: {
    id: `${createWalletPagePrefix}.popup.password.error.passwordrequired`,
    defaultMessage: 'Password is required.',
  },
  CREATE_WALLET_POPUP_PASSWORD_ERROR_MINIMUM_PASSWORD: {
    id: `${createWalletPagePrefix}.popup.password.error.minimumpassword`,
    defaultMessage: 'Password should contain at least 8 characters.',
  },
  CREATE_WALLET_POPUP_PASSWORD_ERROR_INVALID_CONFIRMATION: {
    id: `${createWalletPagePrefix}.popup.password.error.invalidconfirmation`,
    defaultMessage: "Password confirmation doesn't match password.",
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
  RECOVERY_PHRASE_BUTTON_RELOAD: {
    id: `${recoveryPhrasePrefix}.button.reload`,
    defaultMessage: 'Reload',
  },
  RECOVERY_PHRASE_BUTTON_SAVE: {
    id: `${recoveryPhrasePrefix}.button.save`,
    defaultMessage: 'Save as Keystore',
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
      'Click here to view your key. Make sure no one else is looking!',
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
  IMPORT_WALLET_TITLE: {
    id: `${importWalletPagePrefix}.title`,
    defaultMessage: 'Import Wallet',
  },
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
  IMPORT_WALLET_TAB_METAMASK_IMAGE_ALT: {
    id: `${importWalletPagePrefix}.tab.metamask.image.alt`,
    defaultMessage: 'MetaMask',
  },
  IMPORT_WALLET_TAB_METAMASK_TEXT: {
    id: `${importWalletPagePrefix}.tab.metamask.text`,
    defaultMessage: 'MetaMask',
  },
  IMPORT_WALLET_TAB_METAMASK_CONTENT_MESSAGE: {
    id: `${importWalletPagePrefix}.tab.metamask.content.message`,
    defaultMessage:
      'Make sure you installed MetaMask extension in order for this option to work.',
  },
  IMPORT_WALLET_TAB_RECOVERY_PHRASE_TEXT: {
    id: `${importWalletPagePrefix}.tab.recoveryphrase.text`,
    defaultMessage: 'Recovery Phrase/ Private Key',
  },
  IMPORT_WALLET_TAB_RECOVERY_PHRASE_NOT_RECOMMENDED_TEXT: {
    id: `${importWalletPagePrefix}.tab.recoveryphrase.notrecommmended.text`,
    defaultMessage: '(Not Recommended)',
  },
  IMPORT_WALLET_TAB_RECOVERY_PHRASE_TYPE_PRIVATE_KEY: {
    id: `${importWalletPagePrefix}.tab.recoveryphrase.type.privatekey`,
    defaultMessage: 'Private Key',
  },
  IMPORT_WALLET_TAB_RECOVERY_PHRASE_TYPE_PRIVATE_KEY_INPUT_PRIVATE_KEY_LABEL: {
    id: `${importWalletPagePrefix}.tab.recoveryphrase.type.privatekey.input.privatekey.label`,
    defaultMessage: 'Enter your Private Key',
  },
  IMPORT_WALLET_TAB_RECOVERY_PHRASE_TYPE_PRIVATE_KEY_INPUT_PRIVATE_KEY_PLACEHOLDER: {
    id: `${importWalletPagePrefix}.tab.recoveryphrase.type.privatekey.input.privatekey.placeholder`,
    defaultMessage: 'Type a 64-character-length hex string',
  },
  IMPORT_WALLET_TAB_RECOVERY_PHRASE_TYPE_MNEMONIC: {
    id: `${importWalletPagePrefix}.tab.recoveryphrase.type.mnemonic`,
    defaultMessage: 'Recovery Phrase',
  },
  IMPORT_WALLET_TAB_RECOVERY_PHRASE_TYPE_MNEMONIC_INPUT_MNEMONIC_LABEL: {
    id: `${importWalletPagePrefix}.tab.recoveryphrase.type.mnemonic.input.mnemonic.label`,
    defaultMessage: 'Enter your Recovery Phrase',
  },
  IMPORT_WALLET_TAB_RECOVERY_PHRASE_TYPE_MNEMONIC_INPUT_MNEMONIC_PLACEHOLDER: {
    id: `${importWalletPagePrefix}.tab.recoveryphrase.type.mnemonic.input.mnemonic.placeholder`,
    defaultMessage: 'Type a 12-word phrase',
  },
  IMPORT_WALLET_TAB_RECOVERY_PHRASE_TYPE_MNEMONIC_INPUT_HD_PATH_LABEL: {
    id: `${importWalletPagePrefix}.tab.recoveryphrase.type.mnemonic.input.hdpath.label`,
    defaultMessage: 'Enter HD Path',
  },
  IMPORT_WALLET_TAB_RECOVERY_PHRASE_TYPE_MNEMONIC_INPUT_HD_PATH_PLACEHOLDER: {
    id: `${importWalletPagePrefix}.tab.recoveryphrase.type.mnemonic.input.hdpath.placeholder`,
    defaultMessage: "e.g. m/44'/889'/0'/0, m/44'/60'/0'...",
  },
  IMPORT_WALLET_TAB_KEYSTORE_IMAGE_ALT: {
    id: `${importWalletPagePrefix}.tab.keystore.image.alt`,
    defaultMessage: 'Keystore',
  },
  IMPORT_WALLET_TAB_KEYSTORE_TEXT: {
    id: `${importWalletPagePrefix}.tab.keystore.text`,
    defaultMessage: 'Keystore File',
  },
  IMPORT_WALLET_ERROR_INVALID_RECOVERY_PHRASE: {
    id: `${importWalletPagePrefix}.error.invalid.recoveryphrase`,
    defaultMessage: 'Invalid recovery phrase.',
  },
  IMPORT_WALLET_ERROR_INVALID_PRIVATE_KEY: {
    id: `${importWalletPagePrefix}.error.invalid.privatekey`,
    defaultMessage: 'Invalid private key.',
  },
  IMPORT_WALLET_ERROR_INVALID_HD_PATH: {
    id: `${importWalletPagePrefix}.error.invalid.hdpath`,
    defaultMessage: 'Invalid HD Path',
  },
  IMPORT_WALLET_ERROR_DEVICE_NOT_FOUND: {
    id: `${importWalletPagePrefix}.error.device.notfound`,
    defaultMessage: "The system can't find any Ledger device.",
  },
  IMPORT_WALLET_ERROR_TRANSPORT_NODE_NOT_SUPPORTED: {
    id: `${importWalletPagePrefix}.error.transport.node.notsupported`,
    defaultMessage: 'Node transport not supported in this application.',
  },
  IMPORT_WALLET_ERROR_TRANSPORT_U2F_NOT_SUPPORTED: {
    id: `${importWalletPagePrefix}.error.transport.u2t.notsuppported`,
    defaultMessage:
      'U2F not supported in this browser. Please try using Google Chrome with a secure (SSL / HTTPS) connection!',
  },
  IMPORT_WALLET_POPUP_ADDRESS_TITLE: {
    id: `${importWalletPagePrefix}.popup.address.title`,
    defaultMessage: 'Ledger Wallet',
  },
  IMPORT_WALLET_POPUP_PASSWORD_TITLE: {
    id: `${importWalletPagePrefix}.popup.password.title`,
    defaultMessage: 'Password',
  },
  IMPORT_WALLET_POPUP_PASSWORD_INPUT_PLACEHOLDER: {
    id: `${importWalletPagePrefix}.popup.password.input.placeholder`,
    defaultMessage: 'Enter password',
  },
  IMPORT_WALLET_POPUP_PASSWORD_INPUT_INVALID_PASSWORD: {
    id: `${importWalletPagePrefix}.popup.password.input.invalidpassword`,
    defaultMessage: 'Given password is incorrect.',
  },
  // My Wallet Page
  MY_WALLET_TITLE: {
    id: `${myWalletPagePrefix}.title`,
    defaultMessage: 'My TomoWallet',
  },
  MY_WALLET_MAIN_MODE: {
    id: `${myWalletPagePrefix}.mode.main`,
    defaultMessage: 'PUBLIC MODE',
  },
  MY_WALLET_MAIN_MODE_DESCRIPTION: {
    id: `${myWalletPagePrefix}.mode.main.description`,
    defaultMessage: 'Main mode allows you to make public & traceable transactions that can be tracked via',
  },
  MY_WALLET_PRIVACY_MODE: {
    id: `${myWalletPagePrefix}.mode.privacy`,
    defaultMessage: 'Privacy Mode',
  },
  MY_WALLET_PRIVACY_MODE_DESCRIPTION: {
    id: `${myWalletPagePrefix}.mode.privacy.description`,
    defaultMessage: 'Privacy Mode allows you to make transactions where the wallet addresses and amount are hidden',
  },
  MY_WALLET_SECTION_ADDRESS_TITLE: {
    id: `${myWalletPagePrefix}.section.address.title`,
    defaultMessage: 'Public Address',
  },
  MY_WALLET_SECTION_PRIVACY_ADDRESS_TITLE: {
    id: `${myWalletPagePrefix}.section.address.privacy.title`,
    defaultMessage: 'Privacy Address',
  },
  MY_WALLET_SECTION_BALANCE_BALANCE: {
    id: `${myWalletPagePrefix}.section.balance.balance`,
    defaultMessage: 'Total Balance',
  },
  MY_WALLET_SECTION_BALANCE_ESTIMATED: {
    id: `${myWalletPagePrefix}.section.balance.estimated`,
    defaultMessage: 'Estimated Value',
  },
  MY_WALLET_SECTION_BALANCE_PRIVACY: {
    id: `${myWalletPagePrefix}.section.balance.privacy`,
    defaultMessage: 'Privacy Balance',
  },
  MY_WALLET_SECTION_BALANCE_MAIN: {
    id: `${myWalletPagePrefix}.section.balance.main`,
    defaultMessage: 'Public Balance',
  },
  MY_WALLET_SECTION_EXCHANGE_CHART_RANK: {
    id: `${myWalletPagePrefix}.section.exchange.chart.rank`,
    defaultMessage: 'Rank',
  },
  MY_WALLET_SECTION_EXCHANGE_CHART_MARKET_CAP: {
    id: `${myWalletPagePrefix}.section.exchange.chart.marketcap`,
    defaultMessage: 'Market Cap',
  },
  MY_WALLET_SECTION_EXCHANGE_CHART_VOLUME: {
    id: `${myWalletPagePrefix}.section.exchange.chart.volume`,
    defaultMessage: 'Volume',
  },
  MY_WALLET_SECTION_EXCHANGE_UNIT_USD: {
    id: `${myWalletPagePrefix}.section.exchange.unit.usd`,
    defaultMessage: 'USD',
  },
  MY_WALLET_SECTION_EXCHANGE_UNIT_BTC: {
    id: `${myWalletPagePrefix}.section.exchange.unit.btc`,
    defaultMessage: 'BTC',
  },
  MY_WALLET_TABLE_NODATA: {
    id: `${myWalletPagePrefix}.table.nodata`,
    defaultMessage: 'You have no items',
  },
  MY_WALLET_TABLE_PORTFOLIO_TITLE: {
    id: `${myWalletPagePrefix}.table.tab.portfolio.title`,
    defaultMessage: 'Portfolio',
  },
  MY_WALLET_TABLE_PORTFOLIO_HEADER_TOKEN_NAME: {
    id: `${myWalletPagePrefix}.table.portfolio.header.tokenname`,
    defaultMessage: 'Token Name',
  },
  MY_WALLET_TABLE_PORTFOLIO_HEADER_BALANCE: {
    id: `${myWalletPagePrefix}.table.portfolio.header.balance`,
    defaultMessage: 'Balance',
  },
  MY_WALLET_TABLE_PORTFOLIO_PRIVACY_HEADER_BALANCE: {
    id: `${myWalletPagePrefix}.table.portfolio.header.balance`,
    defaultMessage: 'Privacy Balance',
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
  MY_WALLET_TABLE_PORTFOLIO_CELL_ACTION_VIEW_ON_TOMOSCAN: {
    id: `${myWalletPagePrefix}.table.portfolio.cell.action.viewontomoscan`,
    defaultMessage: 'View {token} on TomoScan',
  },
  MY_WALLET_TABLE_PORTFOLIO_ERROR_LOAD_FAILED: {
    id: `${myWalletPagePrefix}.table.portfolio.error.load.failed`,
    defaultMessage: 'Cannot load token list!',
  },
  MY_WALLET_TABLE_TRANSACTION_TITLE: {
    id: `${myWalletPagePrefix}.table.tab.transaction.title`,
    defaultMessage: 'Transactions',
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
    defaultMessage: 'Amount',
  },
  MY_WALLET_POPUP_SEND_TOKEN_TITLE: {
    id: `${myWalletPagePrefix}.popup.sendtoken.title`,
    defaultMessage: 'Send',
  },
  MY_WALLET_POPUP_DEPOSIT_PRIVACY_TITLE: {
    id: `${myWalletPagePrefix}.popup.deposit.title`,
    defaultMessage: 'Deposit',
  },
  MY_WALLET_POPUP_WITHDRAW_PRIVACY_TITLE: {
    id: `${myWalletPagePrefix}.popup.withdraw.title`,
    defaultMessage: 'Withdraw',
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
    defaultMessage: 'Paste an address...',
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
  MY_WALLET_POPUP_SEND_TOKEN_ERROR_PRIVACY_RECIPIENT_INVALID: {
    id: `${myWalletPagePrefix}.popup.sendtoken.error.privacy.recipient.invalid`,
    defaultMessage: 'This Privacy Address is invalid',
  },
  MY_WALLET_POPUP_SEND_TOKEN_ERROR_AMOUNT_REQUIRED: {
    id: `${myWalletPagePrefix}.popup.sendtoken.error.amount.required`,
    defaultMessage: 'Please enter an amount of token',
  },
  MY_WALLET_POPUP_SEND_TOKEN_ERROR_INSUFFICIENT_FEE_FROM_TOKEN: {
    id: `${myWalletPagePrefix}.popup.sendtoken.error.insufficientfee.fromtoken`,
    defaultMessage: 'Remaining token is insufficient for transaction fee.',
  },
  MY_WALLET_POPUP_SEND_TOKEN_ERROR_INSUFFICIENT_FEE_FROM_CURRENCY: {
    id: `${myWalletPagePrefix}.popup.sendtoken.error.insufficientfee.frombalance`,
    defaultMessage: 'Remaining balance is insufficient for transaction fee.',
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
  MY_WALLET_POPUP_SUCCESS_INFO_AMOUNT_DEPOSIT: {
    id: `${myWalletPagePrefix}.popup.success.info.amount.deposit`,
    defaultMessage: 'You have deposited',
  },
  MY_WALLET_POPUP_SUCCESS_INFO_AMOUNT_DEPOSIT_AFTER: {
    id: `${myWalletPagePrefix}.popup.success.info.amount.deposit.after`,
    defaultMessage: 'into your Privacy Wallet',
  },
  MY_WALLET_POPUP_SUCCESS_INFO_AMOUNT_WITHDRAW: {
    id: `${myWalletPagePrefix}.popup.success.info.amount.withdraw`,
    defaultMessage: 'You have withdrawn',
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
    defaultMessage: 'Your address supports transferring to TOMO and other TomoChain tokens.',
  },
  MY_WALLET_POPUP_RECEIVE_TOKEN_PRIVACY_CONTENT_MESSAGE: {
    id: `${myWalletPagePrefix}.popup.receivetoken.privacy.content.message`,
    defaultMessage: 'This is your Privacy Wallet Address. It supports transfers sent only through Privacy Mode',
  },
  MY_WALLET_POPUP_RECEIVE_TOKEN_TITLE_DEPOSIT: {
    id: `${myWalletPagePrefix}.popup.receivetoken.title.deposit`,
    defaultMessage: 'Deposit',
  },
  MY_WALLET_POPUP_RECEIVE_TOKEN_INPUT_AMOUNT_LABEL: {
    id: `${myWalletPagePrefix}.popup.receivetoken.input.amount.label`,
    defaultMessage: 'Amount',
  },
  MY_WALLET_POPUP_RECEIVE_TOKEN_INPUT_AMOUNT_PLACEHOLDER: {
    id: `${myWalletPagePrefix}.popup.receivetoken.input.amount.placeholder`,
    defaultMessage: 'Enter an amount of TOMO...',
  },
  MY_WALLET_POPUP_RECEIVE_TOKEN_ERROR_AMOUNT_REQUIRED: {
    id: `${myWalletPagePrefix}.popup.receivetoken.error.amount.required`,
    defaultMessage: 'Given amount is invalid.',
  },
  MY_WALLET_POPUP_RECEIVE_TOKEN_ERROR_AMOUNT_INVALID: {
    id: `${myWalletPagePrefix}.popup.receivetoken.error.amount.invalid`,
    defaultMessage: 'Given amount is invalid.',
  },
  MY_WALLET_TABLE_PORTFOLIO_HEADER_PRIVACY_BALANCE: {
    id: `${myWalletPagePrefix}.table.portfolio.header.privacy.balance`,
    defaultMessage: 'Privacy Balance',
  },
  MY_WALLET_POPUP_PROCESSING_SEND_TOKEN_TITLE: {
    id: `${myWalletPagePrefix}.popup.processing.send.token.title`,
    defaultMessage: 'ANONYMIZING YOUR TRANSACTION INFORMATION',
  },
  IMPORT_WALLET_ERROR_SPENT_UTXO: {
    id: `${myWalletPagePrefix}.error.spent.utxo`,
    defaultMessage: 'Privacy data is not synched. Need to re-synch',
  },
  MY_WALLET_POPUP_PROCESSING_SCANNING_PRIVACY_TITLE: {
    id: `${myWalletPagePrefix}.popup.processing.scanning.privacy.title`,
    defaultMessage: 'YOUR PRIVACY MODE IS BEING SETUP',
  },
  MY_WALLET_POPUP_DEPOSIT_PRIVACY_REQUIRED: {
    id: `${myWalletPagePrefix}.popup.deposit.privacy.required`,
    defaultMessage: 'You need to Deposit TOMO to Privacy Balance from Public Balance first',
  },
  MY_WALLET_POPUP_DEPOSIT_PRIVACY_DESCRIPTION: {
    id: `${myWalletPagePrefix}.popup.deposit.privacy.description`,
    defaultMessage: 'Deposit tokens from your Public Balance to start making privacy transactions',
  },
  MY_WALLET_POPUP_WITHDRAW_PRIVACY_DESCRIPTION: {
    id: `${myWalletPagePrefix}.popup.withdraw.privacy.description`,
    defaultMessage: 'Withdraw your privacy tokens back to your Public Balance to make public transactions',
  },
  MY_WALLET_POPUP_SEND_PRIVACY_DESCRIPTION: {
    id: `${myWalletPagePrefix}.popup.send.privacy.description`,
    defaultMessage: 'Send tokens to another Privacy Wallet Address',
  },
});
// ====================
