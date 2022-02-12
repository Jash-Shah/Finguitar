import { useState } from "react";
import GestureContext from "./GestureContext";

const GestureState = (props) => {
  const [gestureIndex, setGestureIndex] = useState(-1);
  return (
    <GestureContext.Provider value={(gestureIndex, setGestureIndex)}>
      {props.children}
    </GestureContext.Provider>
  );
};

export default GestureState;
