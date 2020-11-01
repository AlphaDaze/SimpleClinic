



import React from "react";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faUsers,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
//import SubMenu from "./SubMenu";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";

class SideBar extends React.Component {
  render() {
    return (
      <div className={classNames("sidebar", { "is-open": this.props.isOpen })}>
        <div className="sidebar-header">
          <Button
            variant="link"
            onClick={this.props.toggle}
            style={{ color: "#fff" }}
            className="mt-4"
          >
            <FontAwesomeIcon icon={faTimes} pull="right" size="xs" />
          </Button>
          <h3>Jamshed's Clinic</h3>
        </div>

        <Nav className="flex-column pt-2">
          <p className="ml-3">Clinic</p>

          
            <NavLink exact activeClassName="activeLink" to="/">
              <Nav.Item className="active sidebarLink">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                     Home
              </Nav.Item>

            </NavLink>


            <NavLink exact activeClassName="activeLink" to="/add-patient">
              <Nav.Item className="active sidebarLink">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                     Add Patient
              </Nav.Item>

            </NavLink>

            <NavLink exact activeClassName="activeLink" to="/patients">
              <Nav.Item className="active sidebarLink">
                <FontAwesomeIcon icon={faUsers} className="mr-2" />
                     Find Patient
              </Nav.Item>

            </NavLink>
        </Nav>
      </div>
    );
  }
}

export default SideBar;



