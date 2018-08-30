import React, { Component } from 'react';
import {
  Animation,
  Container,
  Navbar,
  NavbarBrand,
  Collapse,
  NavbarNav,
  NavItem,
  NavLink,
  NavbarToggler
} from 'mdbreact';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import AnimatableImages from '../AnimatableImages';
import Search from '../Search';

import styles from './styles';

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      scrollPositionY: 0,
      isLogoAnimated: false
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.mouseEntered = this.mouseEntered.bind(this);
    this.mouseLeaved = this.mouseLeaved.bind(this);
    this.handleTogglerClick = this.handleTogglerClick.bind(this);
    this.handleLogoClick = this.handleLogoClick.bind(this);
  }

  componentDidMount() {
    return window.addEventListener('scroll', debounce(this.handleScroll, 32));
  }

  componentWillUnmount() {
    return window.addEventListener('scroll', debounce(this.handleScroll, 32));
  }

  handleScroll() {
    const scrollPositionY = +window.scrollY;
    return this.setState({ scrollPositionY });
  }

  mouseEntered() {
    this.setState({ isLogoAnimated: true });
  }

  mouseLeaved() {
    this.setState({ isLogoAnimated: false });
  }

  handleTogglerClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  handleLogoClick() {
    const { firstPage } = this.props;
    firstPage();
  }

  render() {
    const { classes } = this.props;
    const { scrollPositionY, collapse, isLogoAnimated } = this.state;
    const jwt = localStorage.getItem('jwt');
    const isAuth = jwt !== null;
    return (
      <React.Fragment>
        <header
          className={`${classes.headerArea} ${
            scrollPositionY !== 0 ? classes.sticky : ''
          }`}
        >
          <Container className={classes.container}>
            <div className={'row'}>
              <div className={'col-12'}>
                <Navbar
                  color="transparent"
                  dark
                  expand="md"
                  className={`${classes.navBar} ${
                    scrollPositionY !== 0
                      ? classes.navBarScroll
                      : collapse
                        ? classes.navBarScroll
                        : ''
                  }`}
                >
                  <NavbarBrand
                    tag={'span'}
                    onMouseEnter={this.mouseEntered}
                    onMouseLeave={this.mouseLeaved}
                    onClick={this.handleLogoClick}
                  >
                    {isLogoAnimated ? (
                      <Animation type="tada">
                        <Link to={'/'} className={classes.navBarBrand}>
                          <strong>LOGO</strong>
                        </Link>
                      </Animation>
                    ) : (
                      <Link to={'/'} className={classes.navBarBrand}>
                        <strong>LOGO</strong>
                      </Link>
                    )}
                  </NavbarBrand>
                  {!this.state.isWideEnough && (
                    <NavbarToggler onClick={this.handleTogglerClick} />
                  )}
                  <Collapse
                    isOpen={collapse}
                    className={classes.collapsed}
                    navbar
                  >
                    <NavbarNav right>
                      <NavItem>
                        <NavLink to="/home" className={classes.navLink}>
                          Home
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink to="/favourites" className={classes.navLink}>
                          Favourites
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink to="/contactus">Contact</NavLink>
                      </NavItem>
                      {isAuth ? (
                        <NavItem>
                          <NavLink to="/">Log Out</NavLink>
                        </NavItem>
                      ) : (
                        <NavbarNav>
                          <NavItem>
                            <NavLink to="/login">Log In</NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink to="/signup">Sign Up</NavLink>
                          </NavItem>
                        </NavbarNav>
                      )}
                    </NavbarNav>
                  </Collapse>
                </Navbar>
              </div>
            </div>
          </Container>
        </header>
        <AnimatableImages />
        <Search />
      </React.Fragment>
    );
  }
  static propTypes = {
    classes: PropTypes.object,
    firstPage: PropTypes.func
  };
}

export default injectSheet(styles)(Header);
