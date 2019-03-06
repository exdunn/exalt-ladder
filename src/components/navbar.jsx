import React, { Component } from "react";
import { Navbar, NavDropdown, Nav, Form, FormControl } from "react-bootstrap";

class Navigator extends Component {
  render() {
    const {
      leagues,
      ascendancies,
      curAscd,
      curLeag,
      onLeagueClick,
      onAscdClick,
      onNameEnterPress
    } = this.props;
    return (
      <Navbar expand="sm" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Exalt-Ladder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title={curLeag}>
              {leagues.map(league => (
                <NavDropdown.Item
                  eventKey={league.description}
                  onClick={() => onLeagueClick(league.id)}
                >
                  {league.id}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <NavDropdown title={curAscd}>
              {ascendancies.map(ascd => (
                <NavDropdown.Item
                  eventKey={ascd.description}
                  onClick={() => onAscdClick(ascd)}
                >
                  {ascd}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

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
