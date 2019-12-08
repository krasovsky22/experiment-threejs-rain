import React from "react";
import RainAnimation from "./rainAnimation";
import "./App.css";
import Player from "./Player";

class App extends React.PureComponent {
  private canvasRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (this.canvasRef.current) {
      new RainAnimation(this.canvasRef.current);
    }
  }
  render() {
    return (
      <>
        <Player />
        <div ref={this.canvasRef}></div>
      </>
    );
  }
}

export default App;
