import React from "react";
import Marked from "../../marked";
import Default from "./default";
import readme from "../README.md";

export default () => {
  return (
      <ul className="dance-demo" style={{ listStyle: 'none' }}>
        {Default.map((Item, index) => {
          return (
              <li key={index} id={index + 1 + ""}>
                {<Item />}
              </li>
          );
        })}
        <li id="readme">
          <Marked content={readme} />
        </li>
      </ul>
  );
};
