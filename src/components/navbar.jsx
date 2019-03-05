import React, { Component } from "react";
import { Navbar, NavDropdown, Nav, Dropdown } from "react-bootstrap";

class Navigator extends Component {
  render() {
    const { leagues, currentLeague, onLeagueClick } = this.props;
    return (
      <Navbar expand="md" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Exalt-Ladder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title={currentLeague}>
              {leagues.map(league => (
                <NavDropdown.Item
                  eventKey={league.description}
                  onClick={() => onLeagueClick(league.id)}
                >
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
