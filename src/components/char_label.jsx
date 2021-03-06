import React, { Component } from "react";
import Sticker from "./sticker";
import "../css/style.css";
import Images from "../images/images.js";

class CharLabel extends Component {
  render() {
    const { entry, onAscendancyClick } = this.props;
    const className =
      "card m-2" + (entry.character.level >= 100 ? " text-primary" : "");

    return (
      <div className={className}>
        <div className="row no-gutters p-2">
          <div className="col-8">
            {entry.dead && (
              <Sticker
                tooltip={"Dead"}
                image={Images.skull}
                onStickerClick={() => {}}
              />
            )}
            {entry.online && (
              <Sticker
                tooltip={"Online"}
                image={Images.plug}
                onStickerClick={() => {}}
              />
            )}
            <div>
              {entry.rank}
              <a
                class="account-link"
                target="_blank"
                href={`https://www.pathofexile.com/account/view-profile/${
                  entry.account.name
                }`}
              >
                {entry.character.name}
              </a>
            </div>
          </div>
          <div className="col">{entry.character.level}</div>
          <div className="col">
            <Sticker
              tooltip={entry.character.class}
              image={Images[entry.character.class.toLowerCase()]}
              onStickerClick={onAscendancyClick}
              variant="dark"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CharLabel;
