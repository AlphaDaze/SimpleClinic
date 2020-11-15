import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Navbar, Button, Nav } from "react-bootstrap";
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignLeft,
  faHome,
  faUser,
  faUsers,
  faSignInAlt,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

import { useViewport } from '../../utils/useViewport';

const NavBar = ({ toggle, auth: { isAuthenticated, loading }, logout }) => {
  const isMobile = useViewport();

  const authLinks = (
    <Fragment>
      <NavLink exact className="navbarLink" activeClassName="menubarLinkActove" to="/">
        <FontAwesomeIcon icon={faHome} className="mr-2" />
        {!isMobile ? "Home" : ""}
      </NavLink>
      <NavLink exact className="navbarLink" activeClassName="menubarLinkActove" to="/add-patient">
        <FontAwesomeIcon icon={faUser} className="mr-2" />
        {!isMobile ? "Add Patient" : ""}
      </NavLink>
      <NavLink exact className="navbarLink" activeClassName="menubarLinkActove" to="/patients">
        <FontAwesomeIcon icon={faUsers} className="mr-2" />
        {!isMobile ? "Find Patient" : ""}
      </NavLink>
      |
      <NavLink exact className="navbarLink" activeClassName="menubarLinkActove" to="/login" onClick={logout}>
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
        {!isMobile ? "Logout" : ""}
      </NavLink>
    </Fragment>
 );

  const guestLinks = (
    <Fragment>
      <NavLink exact className="navbarLink" activeClassName="menubarLinkActove" to="/login" onClick={logout}>
        <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
        {!isMobile ? "Login" : ""}
      </NavLink>
    </Fragment>
  );

  return (
    <Navbar
      bg="light"
      className="navbar shadow-sm p-3 mb-5 bg-white rounded"
      expand
    >
      <Button variant="outline-info" onClick={toggle}>
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto" navbar>
          { !loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout }) (NavBar);
