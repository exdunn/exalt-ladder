import React, { Component } from "react";
import {
  Col,
  Form,
  FormControl,
  Navbar,
  NavDropdown,
  Nav
} from "react-bootstrap";

class Navigator extends Component {
  render() {
    const {
      leagueNames,
      ascendancies,
      targetClass,
      targetLeague,
      name,
      onLeagueClick,
      onAscendancyClick,
      onNameSearchChange,
      onNameSearchEnterPress
    } = this.props;
    return (
      <Navbar expand="md" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Exalt-Ladder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Col>
              <NavDropdown
                title={targetLeague === "" ? "Select" : targetLeague}
              >
                {leagueNames.map(leagueName => (
                  <NavDropdown.Item
                    eventKey={leagueName}
                    onClick={() => onLeagueClick(leagueName)}
                  >
                    {leagueName}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Col>

            <Col>
              <NavDropdown title={targetClass}>
                {ascendancies.map(ascd => (
                  <NavDropdown.Item
                    eventKey={ascd.description}
                    onClick={() => onAscendancyClick(ascd)}
                  >
                    {ascd}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Col>

            <Col>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Name"
                  className="mr-sm-2"
                  value={name}
                  onChange={e => onNameSearchChange(e)}
                  onKeyPress={e => onNameSearchEnterPress(e)}
                />
              </Form>
            </Col>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigator;
