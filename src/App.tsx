import React from "react";
import RainAnimation from "./rainAnimation";
import "./App.css";

const rainSound = require("./assets/rainsound.mp3");

class App extends React.PureComponent {
  private canvasRef = React.createRef<HTMLDivElement>();
  private audio = new Audio(rainSound);

  componentDidMount() {
    if (this.canvasRef.current) {
      new RainAnimation(this.canvasRef.current);
      this.audio.muted = false;
      this.audio.play();

      this.audio.addEventListener(
        "ended",
        function() {
          this.play();
        },
        false
      );
    }
  }
  render() {
    return <div ref={this.canvasRef}></div>;
  }
}

export default App;
