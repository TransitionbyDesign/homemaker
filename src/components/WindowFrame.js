import React from 'react';
import windowFrame from "../styles/components/windowFrame.module.scss";

const WindowFrame = (props) => {
  return (
    <div className={`${windowFrame.window_frame} ${props.className}`} style={props.styles}>
      {props.children}
    </div>
  );
}

export default WindowFrame;
