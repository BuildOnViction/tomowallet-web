/**
 *
 * Import Wallet Page - Actions
 *
 */
import {
  TOGGLE_LOCK,
  UPDATE_ERRORS,
  UPDATE_INPUT,
  UPDATE_TYPE,
} from './constants';

export const toggleLock = bool => ({
  type: TOGGLE_LOCK,
  bool,
});

export const updateErrors = errors => ({
  type: UPDATE_ERRORS,
  errors,
});

export const updateInput = (name, value) => ({
  type: UPDATE_INPUT,
  name,
  value,
});

export const updateImportType = importType => ({
  type: UPDATE_TYPE,
  importType,
});
