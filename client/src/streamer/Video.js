import React, { useRef, useEffect, useContext } from "react";
import Webcam from "react-webcam";
import useSound from "use-sound";
import GestureContext from "../context/GestureContext";

import tune1 from "../tunes/tune1.wav";
import tune2 from "../tunes/tune2.wav";
import tune3 from "../tunes/tune3.wav";
import tune4 from "../tunes/tune4.wav";
import tune5 from "../tunes/tune5.wav";
import tune6 from "../tunes/tune6.wav";
import tune7 from "../tunes/tune7.wav";
import tune8 from "../tunes/tune8.wav";
import tune9 from "../tunes/tune9.wav";

import music1 from "../music/music1.mp3";
import music2 from "../music/music2.mp3";

const Video = () => {
  const webcamRef = useRef(null);
  const { gestureIndex, setGestureIndex } = useContext(GestureContext);

  const [playMusic1] = useSound(music1, { volume: 0.25 });

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
    let rec = -1;
    ws.onmessage = (msg) => {
      let prev = rec;
      rec = Number(msg.data);

      if (prev === rec) {
      } else {
        if (rec === 1) {
          const audioEl = document.getElementsByClassName("audio-element-1")[0];
          audioEl.play();
        } else if (rec === 2) {
          const audioEl = document.getElementsByClassName("audio-element-2")[0];
          audioEl.play();
        } else if (rec === 3) {
          const audioEl = document.getElementsByClassName("audio-element-3")[0];
          audioEl.play();
        } else if (rec === 4) {
          const audioEl = document.getElementsByClassName("audio-element-4")[0];
          audioEl.play();
        } else if (rec === 5) {
          const audioEl = document.getElementsByClassName("audio-element-5")[0];
          audioEl.play();
        } else if (rec === 6) {
          const audioEl = document.getElementsByClassName("audio-element-6")[0];
          audioEl.play();
        } else if (rec === 7) {
          const audioEl = document.getElementsByClassName("audio-element-7")[0];
          audioEl.play();
        } else if (rec === 8) {
          const audioEl = document.getElementsByClassName("audio-element-8")[0];
          audioEl.play();
        } else if (rec === 9) {
          const audioEl = document.getElementsByClassName("audio-element-9")[0];
          audioEl.play();
        } else if (rec === 0) {
          const audioEl =
            document.getElementsByClassName("audio-element-10")[0];
          audioEl.play();
        }
      }

      console.log(prev, rec, msg.data);
    };
  }, []);

  playMusic1();

  return (
    <>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <audio className="audio-element-10">
        <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"></source>
      </audio>
      <audio className="audio-element-1">
        <source src={tune1}></source>
      </audio>
      <audio className="audio-element-2">
        <source src={tune2}></source>
      </audio>
      <audio className="audio-element-3">
        <source src={tune3}></source>
      </audio>
      <audio className="audio-element-4">
        <source src={tune4}></source>
      </audio>
      <audio className="audio-element-5">
        <source src={tune5}></source>
      </audio>
      <audio className="audio-element-6">
        <source src={tune6}></source>
      </audio>
      <audio className="audio-element-7">
        <source src={tune7}></source>
      </audio>
      <audio className="audio-element-8">
        <source src={tune8}></source>
      </audio>
      <audio className="audio-element-9">
        <source src={tune9}></source>
      </audio>
    </>
  );
};

export default Video;
