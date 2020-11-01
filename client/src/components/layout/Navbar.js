import React from "react";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Button, Nav } from "react-bootstrap";

class NavBar extends React.Component {
  render() {
    return (
      <Navbar
        bg="light"
        className="navbar shadow-sm p-3 mb-5 bg-white rounded"
        expand
      >
        <Button variant="outline-info" onClick={this.props.toggle}>
          <FontAwesomeIcon icon={faAlignLeft} />
        </Button>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto" navbar>
            <NavLink exact className="navbarLink" activeClassName="activeLink" to="/">Home</NavLink>
            <NavLink exact className="navbarLink" activeClassName="activeLink" to="/add-patient">Add Patient</NavLink>
            <NavLink exact className="navbarLink" activeClassName="activeLink" to="/patients">Find Patient</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
