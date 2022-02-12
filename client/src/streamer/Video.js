import React, { useRef, useEffect, useContext } from "react";
import Webcam from "react-webcam";
import useSound from "use-sound";
import GestureContext from "../context/GestureContext";
import tune1 from "../tunes/tune1.wav";
import music1 from "../music/music1.mp3";
import music2 from "../music/music2.mp3";

const Video = () => {
  const webcamRef = useRef(null);
  const { gestureIndex, setGestureIndex } = useContext(GestureContext);

  const [playMusic1] = useSound(music1, { volume: 0.5 });

  //   const getFrame = () => {};
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    return imageSrc;
  };

  const FPS = 3;
  const WS_URL = "ws://localhost:3001";

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    ws.onopen = () => {
      console.log(`Connected to ${WS_URL}`);
      setInterval(() => {
        ws.send(capture());
      }, 1000 / FPS);
    };
    ws.onmessage = (msg) => {
      let rec = Number(msg.data);
      console.log(rec, msg.data);
    };
  }, []);

  playMusic1();

  return (
    <>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
    </>
  );
};

export default Video;
