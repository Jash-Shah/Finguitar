import { useState } from "react";
import GestureContext from "./GestureContext";

const GestureState = (props) => {
  const [gestureIndex, setGestureIndex] = useState(-1);
  const [prevGestureIndex, setPrevGestureIndex] = useState(-1);
  return (
    <GestureContext.Provider
      value={{
        gestureIndex,
        setGestureIndex,
        prevGestureIndex,
        setPrevGestureIndex,
      }}
    >
      {props.children}
    </GestureContext.Provider>
  );
};

export default GestureState;
