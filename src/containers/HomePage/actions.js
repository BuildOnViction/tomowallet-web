import { UPDATE_FORM_STATE } from './constants';

export const updateFormState = newState => ({
  type: UPDATE_FORM_STATE,
  newState,
});
