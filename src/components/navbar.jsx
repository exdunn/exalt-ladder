import React, { Component } from "react";
import { Navbar, NavDropdown, Nav, Dropdown } from "react-bootstrap";

class Navigator extends Component {
  render() {
    const leagues = this.props.leagues;
    console.log(this.props.leagues);
    return (
      <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              {leagues.map(league => (
                <NavDropdown.Item eventKey={league.description}>
                  {league.id}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigator;
