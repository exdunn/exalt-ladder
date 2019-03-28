import React, { Component } from "react";
import { Badge, Image, Col } from "react-bootstrap";
import Images from "../images/images";

class Sticker extends Component {
  render() {
    const { image, text } = this.props;
    return (
      <div>
        <Col>
          <Image src={Images[image]} roundedCircle />
        </Col>
        <Col>{text}</Col>
      </div>
    );
  }
}

export default Sticker;
