import React, { Component } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  Navbar,
  NavDropdown,
  Nav,
  Tooltip,
  OverlayTrigger
} from "react-bootstrap";

class Navigator extends Component {
  render() {
    const {
      leagueNames,
      ascendancies,
      curAscd,
      curLeag,
      account,
      onLeagueClick,
      onAscdClick,
      onAccountChange,
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
                  placeholder="Account"
                  className="mr-sm-2"
                  value={account}
                  onChange={e => onAccountChange(e)}
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
