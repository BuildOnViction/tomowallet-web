// Modules
import React, { PureComponent, Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
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
// -- TO-DO: Update style for Navigation Bar component into following styled component:
import { NavBarStyler, LinkHeader, DropdownToggleHeader } from './style';
// Utilities & Constants
import { withWeb3 } from '../Web3';
import { withIntl } from '../IntlProvider';
import {
  releaseWallet,
  toggleWalletPopup,
} from '../../containers/Global/actions';
import { ROUTE, RPC_SERVER, LIST, MSG } from '../../constants';
// -- TO-DO: Import TomoWallet logo's source
// IMG
import logo_tomochain from '../../assets/images/logo-tomochain.png';
import { removeWeb3Info } from '../../utils';

// ===== MAIN COMPONENT =====
class NavigationBar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isExpandOptions: false,
      networkTitle: Object.keys(RPC_SERVER)[0],
    };

    this.handleRenderPublicBar = this.handleRenderPublicBar.bind(this);
    this.handleRenderPrivateBar = this.handleRenderPrivateBar.bind(this);
    this.handleRedirectToHomepage = this.handleRedirectToHomepage.bind(this);
    this.handleToggleOptions = this.handleToggleOptions.bind(this);
    this.handleChangeNetwork = this.handleChangeNetwork.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleRenderPublicBar() {
    const {
      language,
      changeLocale,
      intl: { formatMessage },
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
                  onClick={() => changeLocale(opt.value)}
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
      onToggleWalletPopup,
    } = this.props;
    const { networkTitle } = this.state;

    return (
      <Fragment>
        <Nav className='ml-auto' navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggleHeader nav caret>
              {networkTitle}
            </DropdownToggleHeader>
            <DropdownMenu right>
              {Object.keys(RPC_SERVER).map((title, titleIdx) => (
                <DropdownItem
                  key={`network_${titleIdx + 1}`}
                  onClick={() => this.handleChangeNetwork(title)}
                >
                  {title}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggleHeader nav caret>
              {formatMessage(MSG.HEADER_NAVBAR_OPTION_MY_WALLET)}
            </DropdownToggleHeader>
            <DropdownMenu right>
              <DropdownItem onClick={() => onToggleWalletPopup(true)}>
                {formatMessage(
                  MSG.HEADER_NAVBAR_OPTION_MY_WALLET_OPTION_SHOW_WALLET,
                )}
              </DropdownItem>
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

  handleRedirectToHomepage() {
    const { history } = this.props;
    history.push(ROUTE.LOGIN);
  }

  handleToggleOptions() {
    this.setState(({ isExpandOptions }) => ({
      isExpandOptions: !isExpandOptions,
    }));
  }

  handleChangeNetwork(title) {
    const { switchRPCServer } = this.props;
    this.setState({
      networkTitle: title,
    });
    switchRPCServer(title);
  }

  handleLogout() {
    const { onReleaseWallet, switchRPCServer } = this.props;

    Promise.all([
      onReleaseWallet(),
      removeWeb3Info(),
      switchRPCServer(Object.keys(RPC_SERVER)[0]),
    ]).then(() => this.handleRedirectToHomepage());
  }

  render() {
    const {
      isLoggedIn,
      intl: { formatMessage },
    } = this.props;
    const { isExpandOptions } = this.state;

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
          <Collapse isOpen={isExpandOptions} navbar>
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
  /** Action to remove current wallet's data */
  onReleaseWallet: PropTypes.func,
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
  onReleaseWallet: () => {},
  onToggleWalletPopup: () => {},
  switchRPCServer: () => {},
};
// ======================

// ===== INJECTIONS =====
const mapDispatchToProps = dispatch => ({
  onReleaseWallet: () => dispatch(releaseWallet()),
  onToggleWalletPopup: bool => dispatch(toggleWalletPopup(bool)),
});
const withConnect = connect(
  null,
  mapDispatchToProps,
);
// ======================

export default compose(
  withConnect,
  withRouter,
  withWeb3,
  withIntl,
)(NavigationBar);
