import React from "react";
import "./App.css";
import Game from "./components/Game";
import PlayHook from "./components/hooks/PlayHook";

function App() {
  return (
    <div className="App" style={{ textAlign: "center" }}>
      <h1>Class Component</h1>
      <Game />
      <hr />
      <h1>Hooks</h1>
      <PlayHook />
    </div>
  );
}

export default App;
