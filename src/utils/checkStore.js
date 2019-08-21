import _conformsTo from 'lodash.conformsto';
import _isFunction from 'lodash.isfunction';
import _isObject from 'lodash.isobject';
import invariant from 'invariant';

/**
 * Validate the shape of redux store
 */
export default function checkStore(store) {
  const shape = {
    dispatch: _isFunction,
    subscribe: _isFunction,
    getState: _isFunction,
    replaceReducer: _isFunction,
    injectedReducers: _isObject,
  };
  invariant(
    _conformsTo(store, shape),
    '(app/utils...) injectors: Expected a valid redux store',
  );
}
