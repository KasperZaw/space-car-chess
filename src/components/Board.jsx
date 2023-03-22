import React, { useEffect } from "react";
import { useRef } from "react";
import video from "../img/mercury-planet-30300.mp4";
import carImage from "../img/rover.png";
import Menu from "./Menu";
import History from "./History";
// destrukturyzacja
const Board = ({
  position,
  setPosition,
  moveCounter,
  setMoveCounter,
  rows,
  setRows,
  columns,
  setColumns,
  savedPosition,
  setSavedPosition,
  records,
  setRecords,
  teleportDirection,
  setTeleportDirection,
  settings,
  setSettings,
}) => {
  //car
  const boxRef = useRef(null);

  // sets up a board
  const rowDivs = Array.from({ length: rows }, (_, index) => (
    <div key={index} className="row">
      {[...Array(parseInt(columns)).keys()].map((_, i) => (
        <div key={i} className={i % 2 === index % 2 ? "white" : "black"}></div>
      ))}
    </div>
  ));

  // starts the game
  const handlePlayClick = () => {
    setPosition((prev) => ({ ...prev, x: 0, y: 0 }));
    setSettings((settings) => ({ ...settings, gameOn: true, playOn: false }));
    setRows(document.getElementById("row").value);
    setColumns(document.getElementById("column").value);
    document.getElementById("row").value = "";
    document.getElementById("column").value = "";
    document.getElementById("chess").style.display = "flex";
  };

  // sets up the movement logic and initial position
  // etBoundingClientRect(); method returning DOMRect object provide information like size and position of viewport no matter of changes with board
  useEffect(() => {
    const chessboard = document.getElementById("chess");
    const chessboardRect = chessboard.getBoundingClientRect();
    const boxRect = boxRef.current.getBoundingClientRect();
    // thats how i calculated the center position for board and car
    const initialX =
      chessboardRect.left + chessboardRect.width / 2 - boxRect.width / 2;
    const initialY =
      chessboardRect.top + chessboardRect.height / 2 - boxRect.height / 2;
    setPosition({ x: initialX, y: initialY });
    const handleKeyDown = (event) => {
      const { key } = event;
      switch (key) {
        case "ArrowLeft":
          setPosition((prevPosition) => ({
            ...prevPosition,
            x: prevPosition.x - 100,
          }));
          break;

        case "ArrowRight":
          setPosition((prevPosition) => ({
            ...prevPosition,
            x: prevPosition.x + 100,
          }));
          break;

        case "ArrowUp":
          setPosition((prevPosition) => ({
            ...prevPosition,
            y: prevPosition.y - 100,
          }));
          break;

        case "ArrowDown":
          setPosition((prevPosition) => ({
            ...prevPosition,
            y: prevPosition.y + 100,
          }));
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // moves initial position in case there is no clear center
  useEffect(() => {
    if (rows % 2) {
      if (columns % 2) setPosition((prev) => ({ ...prev, x: 0, y: 0 }));
      else setPosition((prev) => ({ ...prev, y: 50 }));
    } else {
      if (columns % 2) setPosition((prev) => ({ ...prev, x: 50 }));
      else setPosition((prev) => ({ ...prev, x: 50, y: 50 }));
    }
  }, [columns, rows]);

  // records position and rotates moving image
  const recordPosition = () => {
    setSavedPosition((prevPosition) => ({
      ...prevPosition,
      x: position.x,
      y: position.y,
    }));
    if (position.x - savedPosition.x === 100) {
      setMoveCounter(moveCounter + 1);
      setRecords([...records, `${moveCounter}: ➡️`]);
      setSavedPosition((prevPosition) => ({ ...prevPosition, x: position.x }));
      boxRef.current.style.transform = `translate(${position.x}px, ${position.y}px) rotate(90deg)`;
    } else if (position.x - savedPosition.x === -100) {
      setMoveCounter(moveCounter + 1);
      setRecords([...records, `${moveCounter}: ⬅️`]);
      setSavedPosition((prevPosition) => ({ ...prevPosition, x: position.x }));
      boxRef.current.style.transform = `translate(${position.x}px, ${position.y}px) rotate(270deg)`;
    } else if (position.y - savedPosition.y === 100) {
      setMoveCounter(moveCounter + 1);
      setRecords([...records, `${moveCounter}: ⬇️`]);
      setSavedPosition((prevPosition) => ({ ...prevPosition, y: position.y }));
      boxRef.current.style.transform = `translate(${position.x}px, ${position.y}px) rotate(180deg)`;
    } else if (position.y - savedPosition.y === -100) {
      setMoveCounter(moveCounter + 1);
      setRecords([...records, `${moveCounter}: ⬆️`]);
      setSavedPosition((prevPosition) => ({ ...prevPosition, y: position.y }));
      boxRef.current.style.transform = `translate(${position.x}px, ${position.y}px) rotate(0)`;
    }
  };

  // in case of hitting a wall teleports to the opposite site of a board
  const teleport = () => {
    if (position.x > (100 * rows) / 2) {
      setPosition((prev) => ({ ...prev, x: -((100 * rows) / 2) + 50 }));
      setTeleportDirection("right");
    }
    if (position.x < -(100 * rows) / 2) {
      setPosition((prev) => ({ ...prev, x: (100 * rows) / 2 - 50 }));
      setTeleportDirection("left");
    }
    if (position.y > (100 * columns) / 2) {
      setPosition((prev) => ({ ...prev, y: -((100 * columns) / 2) + 50 }));
      setTeleportDirection("down");
    }
    if (position.y < -(100 * columns) / 2) {
      setPosition((prev) => ({ ...prev, y: (100 * columns) / 2 - 50 }));
      setTeleportDirection("up");
    }
  };

  // changes position and rotation of the moving object on the screen
  const draw = () => {
    if (teleportDirection === "right")
      boxRef.current.style.transform = `translate(${position.x}px, ${position.y}px) rotate(90deg)`;
    else if (teleportDirection === "left")
      boxRef.current.style.transform = `translate(${position.x}px, ${position.y}px) rotate(270deg)`;
    else if (teleportDirection === "down")
      boxRef.current.style.transform = `translate(${position.x}px, ${position.y}px) rotate(180deg)`;
    else
      boxRef.current.style.transform = `translate(${position.x}px, ${position.y}px) rotate(0)`;
  };

  // handleKeyClick changes position and rotation while using buttons (mobile version)
  const handleKeyClick = (key) => {
    if (key === "left") {
      setPosition((prevPosition) => ({
        ...prevPosition,
        x: prevPosition.x - 100,
      }));
      boxRef.current.style.transform = `translate(${position.x}%, ${position.y}px) rotate(270deg)`;
    } else if (key === "right") {
      setPosition((prevPosition) => ({
        ...prevPosition,
        x: prevPosition.x + 100,
      }));
      boxRef.current.style.transform = `translate(${position.x}%, ${position.y}px) rotate(90deg)`;
    } else if (key === "up") {
      setPosition((prevPosition) => ({
        ...prevPosition,
        y: prevPosition.y - 100,
      }));
      boxRef.current.style.transform = `translate(${position.x}%, ${position.y}px) rotate(0)`;
    } else if (key === "down") {
      setPosition((prevPosition) => ({
        ...prevPosition,
        y: prevPosition.y + 100,
      }));
      boxRef.current.style.transform = `translate(${position.x}%, ${position.y}px) rotate(0)`;
    }
  };

  useEffect(() => {
    draw();
    recordPosition();
    teleport();
  }, [position, rows, columns]);

  const playButton = (
    <button id="play" onClick={handlePlayClick}>
      PLAY
    </button>
  );

  return (
    <div className="game">
      <Menu
        settings={settings}
        playButton={playButton}
        setRows={setRows}
        columns={columns}
        position={position}
        moveCounter={moveCounter}
        setColumns={setColumns}
        rows={rows}
        key={Menu.id}
      />

      <div id="chess" className="chessboard">
        {rowDivs}
        <img src={carImage} alt="car" className="box up" ref={boxRef} />
      </div>
      <History
        setSettings={setSettings}
        setRecords={setRecords}
        records={records}
        settings={settings}
      />

      <div className="mobile-keyboard">
        <button onClick={() => handleKeyClick("left")}>⬅️</button>
        <button onClick={() => handleKeyClick("right")}>➡️</button>
        <button onClick={() => handleKeyClick("down")}>⬇️</button>
        <button onClick={() => handleKeyClick("up")}>⬆️</button>
      </div>
      <div className="video-background">
        <video autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Board;
