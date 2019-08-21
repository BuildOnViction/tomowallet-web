import { createSelectorCreator, defaultMemoize } from 'reselect';
import _isEqual from 'lodash.isequal';

export default createSelectorCreator(defaultMemoize, _isEqual);
