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
            style={{ marginBottom: "-2rem" }}
            className="mt-4"
          >
            <FontAwesomeIcon icon={faTimes} size="xs" />
          </Button>
          <NavLink to="/" onClick={this.props.toggleLink}>
                <h3>Jamshed's Clinic</h3>
            </NavLink>
        </div>

        <Nav className="flex-column pt-2" activeKey="/" onClick={this.props.toggleLink}>
          {/*<p className="ml-3">Clinic</p>*/}

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
        </Nav>
      </div>
    );
  }
}

export default SideBar;



