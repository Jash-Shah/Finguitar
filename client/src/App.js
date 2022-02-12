import "./App.css";
import { useEffect, useRef, useState } from "react";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";
import Video from "./streamer/Video";

function App() {
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          points: 19.0,
          maxDistance: 19.0,
          spacing: 12.0,
          color: 0x215896,
          backgroundColor: 0x7192f,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destory();
    };
  }, [vantaEffect]);
  return (
    <div className="App">
      <div
        style={{ height: "100vh", width: "100%", overflow: "hidden" }}
        ref={vantaRef}
      >
        <h1 className="heading">Finguitar</h1>
        <div className="cam">
          <Video></Video>
        </div>
      </div>
    </div>
  );
}
export default App;
