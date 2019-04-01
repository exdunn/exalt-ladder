import React, { Component } from "react";
import { OverlayTrigger, Image, Col, Tooltip } from "react-bootstrap";
import "../css/style.css";

class Sticker extends Component {
  render() {
    const { image, tooltip, onStickerClick } = this.props;
    return (
      <div onClick={() => onStickerClick(tooltip)} className="cursor-pointer">
        <OverlayTrigger placement="left" overlay={<Tooltip>{tooltip}</Tooltip>}>
          <Image src={image} roundedCircle />
        </OverlayTrigger>
      </div>
    );
  }
}

export default Sticker;
