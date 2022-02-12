import { SketchComp2 } from "./sketch/SketchComp2";
import "./App.css";
import Video from "./streamer/Video";
import GestureState from "./context/GestureState";

function App() {
  return (
    <GestureState>
      <div className="App">
        <SketchComp2></SketchComp2>
        <h1 className="heading">Finguitar</h1>
        <div className="cam">
          <Video></Video>
        </div>
      </div>
    </GestureState>
  );
}
export default App;
