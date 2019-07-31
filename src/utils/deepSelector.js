import { createSelectorCreator, defaultMemoize } from 'reselect';
import { isEqual } from 'lodash';

export default createSelectorCreator(defaultMemoize, isEqual);
