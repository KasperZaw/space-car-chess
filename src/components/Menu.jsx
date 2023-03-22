import React from "react";
import Coordinates from "./Coordinates";
const Menu = (props) => {
  return (
    <div className="menu-container">
      <div
        className="menu"
        key={Menu.id}
        style={
          props.settings.gameOn
            ? { transform: "none" }
            : {
                transform: "scale(2)",
                height: "40vmin",
                width: "40vmin",
              }
        }
      >
        {props.settings.playOn ? (
          props.playButton
        ) : (
          <div style={{ display: "none" }}></div>
        )}
        <label htmlFor="rows">Rows:</label>
        <input
          required
          type="number"
          name="rows"
          id="row"
          max={6}
          min={1}
          value={props.rows}
          onChange={(e) => props.setRows(e.target.value)}
        />
        <label htmlFor="columns">Columns:</label>
        <input
          required
          type="number"
          name="columns"
          id="column"
          max={10}
          min={1}
          value={props.columns}
          onChange={(e) => props.setColumns(e.target.value)}
        />
      </div>
      {props.settings.gameOn ? (
        <Coordinates
          position={props.position}
          moveCounter={props.moveCounter}
        />
      ) : (
        <div style={{ display: "none" }}></div>
      )}
    </div>
  );
};

export default Menu;
