import React, { PureComponent } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ROUTE } from '../../../constants';

export default class extends PureComponent {
  render() {
    const { isLoggedIn, ...remains } = this.props;

    return !isLoggedIn ? (
      <Redirect strict to={ROUTE.LOGIN} />
    ) : (
      <Route {...remains} />
    );
  }
}
