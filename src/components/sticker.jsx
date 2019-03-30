import React, { Component } from "react";
import { Badge, Image, Col } from "react-bootstrap";
import Images from "../images/images";
import "../css/style.css";

class Sticker extends Component {
  render() {
    const { image, text, onStickerClick } = this.props;
    return (
      <div className="cursor-pointer" onClick={() => onStickerClick(text)}>
        <Col>
          <Image src={Images[image]} roundedCircle />
        </Col>
        <Col>{text}</Col>
      </div>
    );
  }
}

export default Sticker;
