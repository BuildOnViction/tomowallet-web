// Modules
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { get as _get, isEmpty as _isEmpty } from 'lodash';
import {
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  CardImg,
} from 'reactstrap';
// Custom Components
import WalletPopup from './subcomponents/WalletPopup';
import { NavBarStyler, LinkHeader, DropdownToggleHeader } from './style';
// Utilities & Constants
import { withWeb3 } from '../Web3';
import { withIntl } from '../IntlProvider';
import {
  releaseWallet,
  toggleWalletPopup,
  setNetwork,
} from '../../containers/Global/actions';
import { ROUTE, LIST, MSG } from '../../constants';
import {
  removeWeb3Info,
  setLocale,
  getLocale,
  getNetwork,
  removeLedger,
  getLedger,
} from '../../utils';
import { selectNetworkData } from '../../containers/Global/selectors';
import logo_tomochain from '../../assets/images/logo-tomochain.png';

// ===== MAIN COMPONENT =====
class NavigationBar extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChangeLocale = this.handleChangeLocale.bind(this);
    this.handleChangeNetwork = this.handleChangeNetwork.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRedirectToHomepage = this.handleRedirectToHomepage.bind(this);
    this.handleRenderPrivateBar = this.handleRenderPrivateBar.bind(this);
    this.handleRenderPublicBar = this.handleRenderPublicBar.bind(this);
  }

  componentDidMount() {
    const { changeLocale, onSetNetwork } = this.props;
    const storedNetwork = LIST.NETWORKS.find(opt => opt.value === getNetwork());
    const storedLocale = getLocale();

    if (!_isEmpty(storedNetwork)) {
      onSetNetwork(storedNetwork);
    }
    if (!_isEmpty(storedLocale)) {
      changeLocale(storedLocale);
    }
  }

  handleChangeLocale(locale) {
    const { changeLocale } = this.props;
    setLocale(locale);
    changeLocale(locale);
  }

  handleChangeNetwork(newNetwork) {
    const { onSetNetwork, switchRPCServer } = this.props;
    onSetNetwork(newNetwork);
    switchRPCServer(newNetwork.value);
    this.handleLogout();
  }

  handleLogout() {
    const { onReleaseWallet } = this.props;

    Promise.all([onReleaseWallet(), removeWeb3Info(), removeLedger()]).then(
      () => this.handleRedirectToHomepage(),
    );
  }

  handleRedirectToHomepage() {
    const { history } = this.props;
    history.push(ROUTE.LOGIN);
  }

  handleRenderPublicBar() {
    const {
      changeLocale,
      intl: { formatMessage },
      language,
    } = this.props;

    return (
      <Fragment>
        <Nav className='ml-auto' navbar>
          <NavItem>
            <LinkHeader>
              {formatMessage(MSG.HEADER_NAVBAR_OPTION_ABOUT)}
            </LinkHeader>
          </NavItem>
          <NavItem>
            <LinkHeader>
              {formatMessage(MSG.HEADER_NAVBAR_OPTION_FAQS)}
            </LinkHeader>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggleHeader nav caret>
              {(LIST.LANGUAGES.find(opt => opt.value === language) || {}).label}
            </DropdownToggleHeader>
            <DropdownMenu right>
              {LIST.LANGUAGES.map((opt, optIdx) => (
                <DropdownItem
                  key={`language_${optIdx + 1}`}
                  onClick={() => this.handleChangeLocale(opt.value)}
                >
                  {opt.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Fragment>
    );
  }

  handleRenderPrivateBar() {
    const {
      intl: { formatMessage },
      network,
      onToggleWalletPopup,
    } = this.props;

    return (
      <Fragment>
        <Nav className='ml-auto' navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggleHeader nav caret>
              {_get(network, 'data.label')}
            </DropdownToggleHeader>
            <DropdownMenu right>
              {LIST.NETWORKS.map((opt, optIdx) => (
                <DropdownItem
                  key={`network_${optIdx + 1}`}
                  onClick={() => this.handleChangeNetwork(opt)}
                >
                  {opt.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggleHeader nav caret>
              {formatMessage(MSG.HEADER_NAVBAR_OPTION_MY_WALLET)}
            </DropdownToggleHeader>
            <DropdownMenu right>
              {!getLedger() && (
                <DropdownItem onClick={() => onToggleWalletPopup(true)}>
                  {formatMessage(
                    MSG.HEADER_NAVBAR_OPTION_MY_WALLET_OPTION_SHOW_WALLET,
                  )}
                </DropdownItem>
              )}
              <DropdownItem>
                {formatMessage(MSG.HEADER_NAVBAR_OPTION_MY_WALLET_OPTION_HELP)}
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={this.handleLogout}>
                {formatMessage(
                  MSG.HEADER_NAVBAR_OPTION_MY_WALLET_OPTION_LOG_OUT,
                )}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Fragment>
    );
  }

  render() {
    const {
      intl: { formatMessage },
      isLoggedIn,
      network,
    } = this.props;

    return (
      <Fragment>
        <NavBarStyler light expand='lg'>
          <NavbarBrand onClick={this.handleRedirectToHomepage}>
            {/* -- TO-DO: Add TomoChain logo's source */}
            <CardImg
              src={logo_tomochain}
              alt={formatMessage(MSG.HEADER_NAVBAR_LOGO_ALT)}
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.handleToggleOptions} />
          <Collapse isOpen={_get(network, 'isExpanded', false)} navbar>
            {isLoggedIn && this.handleRenderPrivateBar()}
            {this.handleRenderPublicBar()}
          </Collapse>
        </NavBarStyler>
        <WalletPopup />
      </Fragment>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
NavigationBar.propTypes = {
  /** Action to change locale */
  changeLocale: PropTypes.func,
  /** React Router's API object */
  history: PropTypes.object,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Condition flag to check authentication state for proper option view */
  isLoggedIn: PropTypes.bool,
  /** Current chosen locale */
  language: PropTypes.string,
  /** Network dropdown data */
  network: PropTypes.object,
  /** Action to remove current wallet's data */
  onReleaseWallet: PropTypes.func,
  /** Action to update network options */
  onSetNetwork: PropTypes.func,
  /** Action to show/hide show-wallet popup */
  onToggleWalletPopup: PropTypes.func,
  /** Action to change current RPC Server */
  switchRPCServer: PropTypes.func,
};

NavigationBar.defaultProps = {
  changeLocaleL: () => {},
  history: {},
  intl: {},
  isLoggedIn: false,
  language: 'en',
  network: {},
  onReleaseWallet: () => {},
  onSetNetwork: () => {},
  onToggleWalletPopup: () => {},
  switchRPCServer: () => {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    network: selectNetworkData,
  });
const mapDispatchToProps = dispatch => ({
  onReleaseWallet: () => dispatch(releaseWallet()),
  onSetNetwork: network => dispatch(setNetwork(network)),
  onToggleWalletPopup: bool => dispatch(toggleWalletPopup(bool)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
// ======================

export default compose(
  withConnect,
  withRouter,
  withWeb3,
  withIntl,
)(NavigationBar);
