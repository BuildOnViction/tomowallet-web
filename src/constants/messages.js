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
const navbarPrefix = `${componentPrefix}.navbar`;
const welcomePagePrefix = `${containerPrefix}.welcome`;
const createWalletPagePrefix = `${containerPrefix}.createwallet`;
const warningPagePrefix = `${createWalletPagePrefix}.warning`;
const recoveryPhrasePrefix = `${createWalletPagePrefix}.recoveryphrase`;
const verificationPrefix = `${createWalletPagePrefix}.verification`;

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
  // Header Navigation Bar
  HEADER_NAVBAR_LOGO_ALT: {
    id: `${navbarPrefix}.logo.alt`,
    defaultMessage: 'TOMOCHAIN LOGO',
  },
  HEADER_NAVBAR_OPTION_ABOUT: {
    id: `${navbarPrefix}.option.about`,
    defaultMessage: 'Abouts',
  },
  HEADER_NAVBAR_OPTION_FAQS: {
    id: `${navbarPrefix}.option.faqs`,
    defaultMessage: 'FAQs',
  },
  HEADER_NAVBAR_OPTION_MY_WALLET: {
    id: `${navbarPrefix}.option.mywallet`,
    defaultMessage: 'My Wallet',
  },
  HEADER_NAVBAR_OPTION_MY_WALLET_OPTION_SHOW_PROFILE: {
    id: `${navbarPrefix}.option.mywallet.option.showprofile`,
    defaultMessage: 'Show Profile',
  },
  HEADER_NAVBAR_OPTION_MY_WALLET_OPTION_SETTINGS: {
    id: `${navbarPrefix}.option.mywallet.option.settings`,
    defaultMessage: 'Settings',
  },
  HEADER_NAVBAR_OPTION_MY_WALLET_OPTION_LOG_OUT: {
    id: `${navbarPrefix}.option.mywallet.option.logout`,
    defaultMessage: 'Log out',
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
});
// ====================
