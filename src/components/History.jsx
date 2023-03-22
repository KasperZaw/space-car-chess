import React from "react";
const History = ({
  setSettings,
  setRecords,
  records,
  settings,
  moveCounter,
}) => {
  const history = (
    <div className="history-container" key={moveCounter}>
      <div className="history-buttons">
        <button className="history-button" onClick={() => setRecords([])}>
          Clear
        </button>
        <button
          className="history-button"
          onClick={() =>
            setSettings((settings) => ({ ...settings, historyOn: false }))
          }
        >
          Hide
        </button>
      </div>
      <div className="history">
        {records?.map((record) => (
          <p>{record}</p>
        ))}
      </div>
    </div>
  );
  const historyButton = (
    <button
      className="history-button"
      onClick={() =>
        setSettings((settings) => ({ ...settings, historyOn: true }))
      }
    >
      Show
      <br />
      Records
    </button>
  );

  return (
    <>
      {settings?.gameOn && !settings?.historyOn ? (
        historyButton
      ) : (
        <div style={{ display: "none" }}></div>
      )}
      {settings?.historyOn ? history : <div style={{ display: "none" }}></div>}
    </>
  );
};

export default History;
