import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";

const Video = () => {
  const webcamRef = useRef(null);

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
  }, []);

  return (
    <>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
    </>
  );
};

export default Video;
