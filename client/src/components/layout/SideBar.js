import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faUsers,
  faTimes,
  faSignInAlt,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
//import SubMenu from "./SubMenu";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";
import { logout } from '../../actions/auth';

const SideBar = ({ toggle, isOpen, toggleLink, auth: { isAuthenticated, loading }, logout }) => {

  const authLinks = (
    <Fragment>
      <NavLink exact className="sidebarLink" activeClassName="sidebarLinkActive" to="/">
        <FontAwesomeIcon icon={faHome} className="mr-2" />
        Home
      </NavLink>

      <NavLink exact className="sidebarLink" activeClassName="sidebarLinkActive" to="/add-patient">
        <FontAwesomeIcon icon={faUser} className="mr-2" />
        Add Patient
      </NavLink>

      <NavLink exact className="sidebarLink" activeClassName="sidebarLinkActive" to="/patients">
        <FontAwesomeIcon icon={faUsers} className="mr-2" />
        Find Patient
      </NavLink>
      
      <NavLink style={{marginTop: "2rem"}} exact className="sidebarLink" to="/login" onClick={logout}>
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
        Logout
      </NavLink>
    </Fragment>
 );

  const guestLinks = (
    <Fragment>
      <NavLink exact className="sidebarLink" activeClassName="sidebarLinkActive" to="/login">
        <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
        Login
      </NavLink>
    </Fragment>
  );

  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>

      <div className="sidebar-header">
        <Button
          variant="link"
          onClick={toggle}
          style={{ marginBottom: "-2rem" }}
          className="mt-4"
        >
          <FontAwesomeIcon icon={faTimes} size="xs" />
        </Button>
        <NavLink to="/" onClick={toggleLink}>
              <h3>Alam's Clinic</h3>
          </NavLink>
      </div>

      <Nav className="flex-column pt-2" activeKey="/" onClick={toggleLink}>
        {/*<p className="ml-3">Clinic</p>*/}
        { !loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
      </Nav>
    </div>
  );
}

SideBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout }) (SideBar);



