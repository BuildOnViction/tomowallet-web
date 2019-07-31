// Modules
import React, { PureComponent, Fragment } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import {
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardImg,
} from 'reactstrap';
// Custom Components
import NavBarStyler from './style';
// Utilities, Constants & Styles
import { withWeb3 } from '../Web3';
import { ROUTE, RPC_SERVER, LIST } from '../../constants';
import tomoIcon from '../../assets/images/tomo-icon.png';

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
  }

  handleRenderPublicBar() {
    const { language, setLanguage } = this.props;

    return (
      <Fragment>
        <Nav className='ml-auto' navbar>
          <NavItem>
            <NavLink>About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>FAQs</NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              {(LIST.LANGUAGES.find(opt => opt.value === language) || {})
                .label || 'Ulala'}
            </DropdownToggle>
            <DropdownMenu right>
              {LIST.LANGUAGES.map((opt, optIdx) => (
                <DropdownItem
                  key={`language_${optIdx + 1}`}
                  onClick={() => setLanguage(opt.value)}
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
    const { networkTitle } = this.state;

    return (
      <Fragment>
        <Nav className='ml-auto' navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              {networkTitle}
            </DropdownToggle>
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
            <DropdownToggle nav caret>
              My Wallet
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Show Profile</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => this.handleRedirectToHomepage()}>
                Log out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Fragment>
    );
  }

  handleRedirectToHomepage() {
    const { history } = this.props;
    history.push(ROUTE.HOMEPAGE);
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

  render() {
    const { isLoggedIn } = this.props;
    const { isExpandOptions } = this.state;

    return (
      <NavBarStyler light expand='lg'>
        <NavbarBrand onClick={this.handleRedirectToHomepage}>
          <CardImg src={tomoIcon} />
        </NavbarBrand>
        <NavbarToggler onClick={this.handleToggleOptions} />
        <Collapse isOpen={isExpandOptions} navbar>
          {isLoggedIn
            ? this.handleRenderPrivateBar()
            : this.handleRenderPublicBar()}
        </Collapse>
      </NavBarStyler>
    );
  }
}
// ==========================

export default compose(
  withRouter,
  withWeb3,
)(NavigationBar);
