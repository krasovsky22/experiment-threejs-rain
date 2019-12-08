import React, { PureComponent } from "react";
import { MuteIcon, PlayIcon } from "./Components";

const rainSound = require("./assets/rainsound.mp3");

interface PlayerState {
  isMuted: boolean;
}

class Player extends PureComponent<{}, PlayerState> {
  state = {
    isMuted: true
  };

  private audio = new Audio(rainSound);

  componentDidMount() {
    this.audio.addEventListener(
      "ended",
      function() {
        this.play();
      },
      false
    );
  }

  clickSound = () => {
    const { isMuted } = this.state;
    this.setState({ isMuted: !isMuted });
  };

  render() {
    const { isMuted } = this.state;

    if (isMuted) {
      this.audio.muted = true;
    } else {
      this.audio.muted = false;
      this.audio.play();
    }

    return (
      <button className="player" onClick={this.clickSound}>
        {isMuted ? <MuteIcon /> : <PlayIcon />}
      </button>
    );
  }
}

export default Player;
