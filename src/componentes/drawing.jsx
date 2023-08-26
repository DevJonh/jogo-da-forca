import React from "react";
import "./style-drawing.css";

export const Drawing = (props) => {
  return (
    <div className="container">
      {props.erros >= 4 && <div className="left-leg"></div>}
      {props.erros >= 4 && <div className="right-leg"></div>}
      {props.erros >= 3 && <div className="left-arm"></div>}
      {props.erros >= 3 && <div className="right-arm"></div>}
      {props.erros >= 2 && <div className="body"></div>}
      {props.erros >= 1 && (
        <div className="head">
          {props.erros >= 4 && (
            <div className="face">
              <div className="eyes">
                <span>X</span>
                <span>X</span>
              </div>
              <div className="mouth">
                <p>{")"}</p>
                <span>U</span>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="chord"></div>
      <div className="horizontal-line"></div>
      <div className="haste"></div>
      <div className="base"></div>
    </div>
  );
};
