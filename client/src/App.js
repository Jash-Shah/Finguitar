import { SketchComp } from "./sketch/SketchComp";
import "./App.css";
import Video from "./streamer/Video";

function App() {
  const sketch = (p5) => {
    p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

    p5.draw = () => {
      p5.background(250);
      p5.normalMaterial();
      p5.push();
      p5.rotateZ(p5.frameCount * 0.01);
      p5.rotateX(p5.frameCount * 0.01);
      p5.rotateY(p5.frameCount * 0.01);
      p5.plane(100);
      p5.pop();
    };
  };

  return (
    <div className="App">
      <SketchComp></SketchComp>
      <h1 className="heading">Finguitar</h1>
      <div className="cam">{/* <Video></Video> */}</div>
    </div>
  );
}
export default App;
