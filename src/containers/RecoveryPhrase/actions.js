import {
  GENERATE_MNEMONIC,
  ADD_MNEMONIC_WORD,
  REMOVE_MNEMONIC_WORD,
  VERIFY_MNEMONIC,
  UPDATE_FORM_STATE,
  RESET_STATE,
  TOGGLE_CONFIRMATION_POPUP,
  TOGGLE_SUCCESS_POPUP,
  TOGGLE_VERIFYCATION_POPUP,
  RESET_VERIFICATION_FORM,
  UPDATE_ERRORS,
} from './constants';

export const generateMnemonic = mnemonic => ({
  type: GENERATE_MNEMONIC,
  mnemonic,
});

export const addMnemonicWord = word => ({
  type: ADD_MNEMONIC_WORD,
  word,
});

export const removeMnemonicWord = index => ({
  type: REMOVE_MNEMONIC_WORD,
  index,
});

export const verifyMnemonic = () => ({
  type: VERIFY_MNEMONIC,
});

export const updateFormState = newState => ({
  type: UPDATE_FORM_STATE,
  newState,
});

export const resetState = () => ({
  type: RESET_STATE,
});

export const toggleConfirmationPopup = bool => ({
  type: TOGGLE_CONFIRMATION_POPUP,
  bool,
});

export const toggleVerificationPopup = bool => ({
  type: TOGGLE_VERIFYCATION_POPUP,
  bool,
});

export const toggleSuccessPopup = bool => ({
  type: TOGGLE_SUCCESS_POPUP,
  bool,
});

export const resetVerificationForm = () => ({
  type: RESET_VERIFICATION_FORM,
});

export const updateErrors = errors => ({
  type: UPDATE_ERRORS,
  errors,
});
