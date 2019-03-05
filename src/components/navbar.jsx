import React, { Component } from "react";
import { Navbar, NavDropdown, Nav, Form, FormControl } from "react-bootstrap";

class Navigator extends Component {
  render() {
    const {
      leagues,
      currentLeague,
      onLeagueClick,
      onAscendancyEnterPress,
      onNameEnterPress
    } = this.props;
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
            <Form inline>
              <FormControl
                type="text"
                placeholder="Ascendancy"
                className="mr-sm-2"
                onKeyPress={e => onAscendancyEnterPress(e)}
              />
            </Form>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Character Name"
                className="mr-sm-2"
                onKeyPress={e => onNameEnterPress(e)}
              />
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigator;
