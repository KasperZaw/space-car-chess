import "./App.css";
import Board from "./components/Board.jsx";
import { useState } from "react";
// zmienic dlugosc position itp
function App() {
  const [savedPosition, setSavedPosition] = useState({ x: 0, y: 0 }); // Used for recording moves in recordPosition()
  const [records, setRecords] = useState([]); // Used for mapping records in history
  const [teleportDirection, setTeleportDirection] = useState(""); //Used for saving direction in teleport()
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Sets position of the car to start the middle (x: 0, y: 0)
  const [moveCounter, setMoveCounter] = useState(0); // Used for counting moves in recordPosition()
  const [rows, setRows] = useState(3); // inputed number of rows
  const [columns, setColumns] = useState(3); // inputed number of columns
  const [settings, setSettings] = useState({
    gameOn: false,
    historyOn: false,
    playOn: true,
  });
  return (
    <>
      <Board
        position={position}
        setPosition={setPosition}
        moveCounter={moveCounter}
        setMoveCounter={setMoveCounter}
        savedPosition={savedPosition}
        setSavedPosition={setSavedPosition}
        records={records}
        setRecords={setRecords}
        teleportDirection={teleportDirection}
        setTeleportDirection={setTeleportDirection}
        rows={rows}
        setRows={setRows}
        columns={columns}
        setColumns={setColumns}
        settings={settings}
        setSettings={setSettings}
      />
    </>
  );
}

export default App;
