import React, { Component } from "react";
import {
  Col,
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl
} from "react-bootstrap";

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
      <Navbar expand="md" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Exalt-Ladder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Col>
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
            </Col>

            <Col>
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
            </Col>

            <Col>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Character Name"
                  className="mr-sm-2"
                  onKeyPress={e => onNameEnterPress(e)}
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
