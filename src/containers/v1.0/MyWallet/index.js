/**
 *
 * TomoWallet - My Wallet Page
 *
 * This component defines a wallet-provided home page, with all basic information &
 * options to send/receive tokens...
 */
// ==== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { get as _get } from 'lodash';
import { Container, Row, Col } from 'reactstrap';
// Utilities
import {} from './actions';
import {} from './selectors';
import reducer from './reducer';
import { DOMAIN_KEY } from './constants';
import { injectReducer } from '../../../utils';
import { withIntl } from '../../../components/IntlProvider';
import { withWeb3 } from '../../../components/Web3';
import { MSG } from '../../../constants';
import { selectWallet } from '../../Global/selectors';
// -- TO-DO: Add style for My Wallet page component
// ==================

// ===== MAIN COMPONENT =====
class MyWallet extends PureComponent {
  render() {
    const {
      intl: { formatMessage },
      wallet,
    } = this.props;
    return (
      <Container fluid className='px-0'>
        <Row noGutters>
          <Col>
            <h3>{formatMessage(MSG.MY_WALLET_SECTION_ADDRESS_TITLE)}</h3>
            <div>
              <span>{_get(wallet, 'address')}</span>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
MyWallet.propTypes = {
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Current wallet's data */
  wallet: PropTypes.object,
};

MyWallet.defaultProps = {
  intl: {},
  wallet: {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    wallet: selectWallet,
  });
const withConnect = connect(mapStateToProps);

const withReducer = injectReducer({ key: DOMAIN_KEY, reducer });
// ======================

export default compose(
  withConnect,
  withReducer,
  withIntl,
  withRouter,
  withWeb3,
)(MyWallet);
