/**
 *
 * TomoWallet - Header Navigation Bar
 *
 * This component defines a header menu for web page,
 * with different kinds of options (public & private)
 */
// Modules
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import _get from 'lodash.get';
import _isEmpty from 'lodash.isempty';
import _isEqual from 'lodash.isequal';
import {
  NavbarBrand,
  Collapse,
  UncontrolledDropdown,
  Container,
  CardImg,
} from 'reactstrap';
// Custom Components
import WalletPopup from './subcomponents/WalletPopup';
import NetworkConfirmationPopup from './subcomponents/NetworkConfirmationPopup';
import {
  NavRight,
  NavWrapper,
  NavBarStyler,
  DropdownToggleHeader,
  DropdownMenuStyler,
  DropdownItemStyler,
  SubDropdownItem,
  CustomDropdownItem,
  ButtonSwitchMode,
  LogoBox,
  TomoText,
  ExternalLink,
} from './style';

// Utilities & Constants
import { withWeb3 } from '../Web3';
import { withIntl } from '../IntlProvider';
import {
  releaseWallet,
  releasePrivacyMode,
  toggleWalletPopup,
  setNetwork,
  toggleNetworkConfirmationPopup,
  togglePrivacyMode,
} from '../../containers/Global/actions';
import { ROUTE, LIST, MSG, ENUM } from '../../constants';
import {
  removeWeb3Info,
  setLocale,
  getLocale,
  getNetwork,
  removeLedger,
  getWeb3Info,
  getPrivacyMode,
  isElectron,
  withGlobal,
  truncateMiddle,
} from '../../utils';

import {
  selectNetworkData,
  selectNetworkConfirmationPopup,
  selectPrivacyMode,
  selectWallet,
  selectPrivacyWallet,
} from '../../containers/Global/selectors';

import logo_tomochain from '../../assets/images/logo-tomochain.png';
import { removeRPFile } from '../../utils/electron';
// import { MediumButtonStyler } from '../../styles';
import { ArrowRight, LogoTomo } from '../../components/Icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    this.isActiveNetwork = this.isActiveNetwork.bind(this);
    this.handlePrivacyMode = this.handlePrivacyMode.bind(this);
  }

  state = {
    isOpenMainMenu: false,
    isOpenSwitchNetworkMenu: false,
    isOpenLanguageMenu: false,
  };

  componentDidMount() {
    const { changeLocale, onSetNetwork, onTogglePrivacyMode } = this.props;
    const storedNetwork = LIST.NETWORKS.find(opt => opt.value === getNetwork());
    const storedLocale = getLocale();
    const privacy = getPrivacyMode();
    // const isTestnet = getNetwork() === ENUM.NETWORK_TYPE.TOMOCHAIN_TESTNET;

    if (!_isEmpty(storedNetwork)) {
      onSetNetwork(storedNetwork);
    }
    if (!_isEmpty(storedLocale)) {
      changeLocale(storedLocale);
    }
    if (privacy !== undefined) {
      onTogglePrivacyMode(privacy)
    }

    // if (!isTestnet) {
    //   onTogglePrivacyMode(false);
    // }
  }

  toggleSwitchNetworkMenu = _ => {
    this.setState({
      isOpenSwitchNetworkMenu: !this.state.isOpenSwitchNetworkMenu,
    })
  }

  toggleLanguageMenu = _ => {
    this.setState({
      isOpenLanguageMenu: !this.state.isOpenLanguageMenu,
    })
  }

  toggleMainMenu = _ => {
    this.setState({
      isOpenMainMenu: !this.state.isOpenMainMenu,
      isOpenSwitchNetworkMenu: false,
      isOpenLanguageMenu: false,
    })
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
    const { onReleaseWallet, removeMetaMaskProvider, onReleasePrivacyMode } = this.props;

    Promise.all([
      onReleaseWallet(),
      onReleasePrivacyMode(),
      removeWeb3Info(),
      removeLedger(),
      removeMetaMaskProvider(),
      isElectron() && removeRPFile(),
    ]).then(() => this.handleRedirectToHomepage());
  }

  handleRedirectToHomepage() {
    const { history } = this.props;
    history.push(ROUTE.LOGIN);
  }

  handleRenderPublicBar() {
    const { language } = this.props;

    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggleHeader nav>
          {(LIST.LANGUAGES.find(opt => opt.value === language) || {}).label}
          <i className='font-chevron-down' />
        </DropdownToggleHeader>
        <DropdownMenuStyler right className='shadow-lg'>
          {LIST.LANGUAGES.map((opt, optIdx) => (
            <SubDropdownItem
              key={`language_${optIdx + 1}`}
              onClick={() => this.handleChangeLocale(opt.value)}
              active={opt.value === language}
              disabled={opt.value === language}
            >
              {opt.label}
            </SubDropdownItem>
          ))}
        </DropdownMenuStyler>
      </UncontrolledDropdown>
    );
  }

  handlePrivacyMode () {
    const isTestnet = getNetwork() === ENUM.NETWORK_TYPE.TOMOCHAIN_TESTNET;
    const loginType = _get(getWeb3Info(), "loginType");

    if (loginType === ENUM.LOGIN_TYPE.PRIVATE_KEY && isTestnet) {
      return true
    }
  }

  handleRenderPrivateBar() {
    const {
      intl: { formatMessage },
      onToggleNetworkConfirmationPopup,
      onToggleWalletPopup,
      onTogglePrivacyMode,
      privacyMode,
      language,
      wallet,
      privacyWallet
    } = this.props;

    const { isOpenMainMenu, isOpenSwitchNetworkMenu, isOpenLanguageMenu } = this.state
    const hasPrivateKey = _get(getWeb3Info(), 'recoveryPhrase', false);
    const walletAddress = _get(wallet, 'address', '');
    const privacyAddress = _get(privacyWallet, ['privacyAddress', 'pubAddr'], '');

    return (
      <Fragment>
        {this.handlePrivacyMode() ? 
          <ButtonSwitchMode onClick={() => onTogglePrivacyMode()}>
            {formatMessage(privacyMode ? MSG.HEADER_NAVBAR_NORMAL_MOD : MSG.HEADER_NAVBAR_PRIVACY_MOD)}
            <ArrowRight />
          </ButtonSwitchMode>
          :
          ''
        }

        <UncontrolledDropdown nav inNavbar isOpen={isOpenMainMenu} toggle={this.toggleMainMenu}>
          <DropdownToggleHeader nav>
            {/* {formatMessage(MSG.HEADER_NAVBAR_OPTION_MY_WALLET)} */}
            {privacyMode ? 
              truncateMiddle(privacyAddress)
              : truncateMiddle(walletAddress)
            }
            <i className='font-chevron-down' />
          </DropdownToggleHeader>

          <DropdownMenuStyler right className='shadow-lg'>
            {hasPrivateKey && (
              <DropdownItemStyler onClick={() => onToggleWalletPopup(true)}>
                {formatMessage(
                  MSG.HEADER_NAVBAR_OPTION_MY_WALLET_OPTION_SHOW_WALLET,
                )}
              </DropdownItemStyler>
            )}

            {/* Switch network - Begin */}
            {/* <CustomDropdownItem className='onl' onClick={this.toggleSwitchNetworkMenu}>
              {formatMessage(MSG.HEADER_NAVBAR_MENU_SWITCH_NETWORK)}
              <i className='font-chevron-down' />
            </CustomDropdownItem> */}

            {/* <Collapse isOpen={isOpenSwitchNetworkMenu}>
              {LIST.NETWORKS.map((opt, optIdx) => (
                <SubDropdownItem
                  key={`network_${optIdx + 1}`}
                  onClick={() => onToggleNetworkConfirmationPopup(true, opt)}
                  active={this.isActiveNetwork(opt)}
                  disabled={this.isActiveNetwork(opt)}
                >
                  {opt.label}
                </SubDropdownItem>
              ))}
            </Collapse> */}
            {/* Switch network - End */}

            {/* Switch language - Begin */}
            <CustomDropdownItem onClick={this.toggleLanguageMenu}>
              {formatMessage(MSG.HEADER_NAVBAR_MENU_LANGUAGE)}
              <i className='font-chevron-down' />
            </CustomDropdownItem>

            <Collapse isOpen={isOpenLanguageMenu}>
              {LIST.LANGUAGES.map((opt, optIdx) => (
                <SubDropdownItem
                  key={`language_${optIdx + 1}`}
                  onClick={() => this.handleChangeLocale(opt.value)}
                  active={opt.value === language}
                  disabled={opt.value === language}
                >
                  {opt.label}
                </SubDropdownItem>
              ))}
            </Collapse>
            {/* Switch language - End */}

            <DropdownItemStyler>
              <ExternalLink target="_blank" href="https://docs.tomochain.com/products/tomowallet/features/">
                {formatMessage(MSG.HEADER_NAVBAR_OPTION_MY_WALLET_OPTION_HELP)}
              </ExternalLink>
            </DropdownItemStyler>

            <DropdownItemStyler onClick={this.handleLogout}>
              {formatMessage(MSG.HEADER_NAVBAR_OPTION_MY_WALLET_OPTION_LOG_OUT)}
            </DropdownItemStyler>
          </DropdownMenuStyler>
        </UncontrolledDropdown>
      </Fragment>
    );
  }

  isActiveNetwork(networkOpt) {
    const { network } = this.props;
    const { value } = networkOpt;

    return _isEqual(_get(network, 'data.value'), value);
  }

  render() {
    const {
      intl: { formatMessage },
      isLoggedIn,
      networkConfirmationPopup,
      onToggleNetworkConfirmationPopup,
      onTogglePrivacyMode,
    } = this.props;

    return (
      <NavWrapper>
        <Container>
          <div className="row">
            <NavBarStyler light expand='md'>
              <NavbarBrand onClick={this.handleRedirectToHomepage}>
                <CardImg
                    src={logo_tomochain}
                    alt={formatMessage(MSG.HEADER_NAVBAR_LOGO_ALT)}
                />
                {/* <LogoBox>
                  <LogoTomo />
                  <TomoText>TomoChain</TomoText>
                </LogoBox> */}
              </NavbarBrand>
              <Collapse navbar>
                <NavRight className='ml-auto' navbar>
                  {isLoggedIn && this.handleRenderPrivateBar()}
                  {!isLoggedIn && this.handleRenderPublicBar()}
                </NavRight>
              </Collapse>
            </NavBarStyler>
          </div>
        </Container>

        <WalletPopup />

        <NetworkConfirmationPopup
          popupData={networkConfirmationPopup}
          togglePopup={onToggleNetworkConfirmationPopup}
          changeNetwork={this.handleChangeNetwork}
        />
      </NavWrapper>
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
  /** Navigation bar's data */
  navbar: PropTypes.object,
  /** Network dropdown data */
  network: PropTypes.object,
  /** Network update confirmation popup's data */
  networkConfirmationPopup: PropTypes.object,
  /** Action to remove current wallet's data */
  onReleaseWallet: PropTypes.func,
  /** Action to remove current privacy mode */
    onReleasePrivacyMode: PropTypes.func,
  /** Action to update network options */
  onSetNetwork: PropTypes.func,
  /** Action to show/hide navigation bar options */
  onToggleNavbarOptions: PropTypes.func,
  /** Action to show/hide network update confirmation popup */
  onToggleNetworkConfirmationPopup: PropTypes.func,
  /** Action to show/hide show-wallet popup */
  onToggleWalletPopup: PropTypes.func,
  /** Action to remove MetaMask provider */
  removeMetaMaskProvider: PropTypes.func,
  /** Action to change current RPC Server */
  switchRPCServer: PropTypes.func,
  /** Action to show/hide loading screen */
  toggleLoading: PropTypes.func,
  /** Action to switch normal and privacy screen */
  onTogglePrivacyMode: PropTypes.func,
};

NavigationBar.defaultProps = {
  changeLocale: () => {},
  history: {},
  intl: {},
  isLoggedIn: false,
  language: 'en',
  network: {},
  networkConfirmationPopup: {},
  onReleaseWallet: () => {},
  onSetNetwork: () => {},
  onToggleNavbarOptions: () => {},
  onToggleNetworkConfirmationPopup: () => {},
  onToggleWalletPopup: () => {},
  removeMetaMaskProvider: () => {},
  switchRPCServer: () => {},
  toggleLoading: () => {},
  onTogglePrivacyMode: () => {},
  onReleasePrivacyMode: () => {},
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    network: selectNetworkData,
    networkConfirmationPopup: selectNetworkConfirmationPopup,
    privacyMode: selectPrivacyMode,
    wallet: selectWallet,
    privacyWallet: selectPrivacyWallet,
  });
const mapDispatchToProps = dispatch => ({
  onReleaseWallet: () => dispatch(releaseWallet()),
  onReleasePrivacyMode: () => dispatch(releasePrivacyMode()),
  onSetNetwork: network => dispatch(setNetwork(network)),
  onToggleNetworkConfirmationPopup: (bool, networkOpt) =>
    dispatch(toggleNetworkConfirmationPopup(bool, networkOpt)),
  onToggleWalletPopup: bool => dispatch(toggleWalletPopup(bool)),
  onTogglePrivacyMode: bool => dispatch(togglePrivacyMode(bool)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
// ======================

export default compose(
  withConnect,
  withGlobal,
  withIntl,
  withRouter,
  withWeb3,
)(NavigationBar);
