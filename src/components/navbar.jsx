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
      leagues,
      ascendancies,
      curAscd,
      curLeag,
      account,
      onLeagueClick,
      onAscdClick,
      onAccountChange,
      onNameEnterPress,
      onLoadMoreClick
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
                  placeholder="Account"
                  className="mr-sm-2"
                  value={account}
                  onChange={e => onAccountChange(e)}
                  onKeyPress={e => onNameEnterPress(e)}
                />
              </Form>
            </Col>

            <Col>
              <OverlayTrigger
                placement={"right"}
                overlay={<Tooltip>Click to load more characters!</Tooltip>}
              >
                <Button
                  variant="primary"
                  style={{
                    display: curLeag === "Select" ? "none" : "inline"
                  }}
                  onClick={() => onLoadMoreClick()}
                >
                  Load
                </Button>
              </OverlayTrigger>
            </Col>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigator;
