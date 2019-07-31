import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configurations/configureStore';
import { history } from './utils';
import App from './containers/App';

ReactDOM.render(
  <Provider store={configureStore({}, history)}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
