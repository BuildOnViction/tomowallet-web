/**
 *
 * TomoWallet - Welcome Page - Selectors
 *
 */
// ===== IMPORTS =====
// Modules
import { fromJS } from 'immutable';
import _get from 'lodash.get';
// Utilities & Constants
import { createDeepEqualSelector } from '../../utils';
import { DOMAIN_KEY } from './constants';
// ===================

// ===== SELECTORS =====
const selectWelcomeDomain = state => _get(state, [DOMAIN_KEY], fromJS({}));

const selectPasswordForm = createDeepEqualSelector(
  selectWelcomeDomain,
  obj => obj.toJS().passwordForm,
);
// =====================

export { selectPasswordForm };
