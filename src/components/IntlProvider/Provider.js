/**
 *
 * TomoWallet - React Intl Customized Provider
 *
 * This provider defines React Intl injection method with an additional function to change the locale
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { IntlProvider, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import hoistNonReactStatics from 'hoist-non-react-statics';
// Utilities & Constants
import { selectLanguage } from '../../containers/Global/selectors';
import { setLanguage } from '../../containers/Global/actions';
import { ENUM } from '../../constants';
// ===================

// ===== React Intl Customized Provider =====
class CustomIntlProvider extends PureComponent {
  render() {
    const { language, children } = this.props;
    return (
      <IntlProvider locale={language} messages={ENUM.MESSAGE_SET[language]}>
        {children}
      </IntlProvider>
    );
  }
}

const mapStateToProps = () =>
  createStructuredSelector({
    language: selectLanguage,
  });

export default connect(mapStateToProps)(CustomIntlProvider);
// ==========================

// ===== React Intl Customized Injection =====
export const withIntl = WrappedComponent => {
  class IntlConsumer extends PureComponent {
    render() {
      const { language, onSetLanguage } = this.props;
      return (
        <WrappedComponent
          {...this.props}
          language={language}
          changeLocale={onSetLanguage}
        />
      );
    }
  }

  if (WrappedComponent.defaultProps) {
    IntlConsumer.defaultProps = { ...WrappedComponent.defaultProps };
  }

  const mapStateToProps = () =>
    createStructuredSelector({
      language: selectLanguage,
    });
  const mapDispatchToProps = dispatch => ({
    onSetLanguage: language => dispatch(setLanguage(language)),
  });
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );

  return hoistNonReactStatics(
    compose(
      withConnect,
      injectIntl,
    )(IntlConsumer),
    WrappedComponent,
  );
};
// ===========================================
