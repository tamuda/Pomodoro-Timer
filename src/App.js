import logo from "./logo.svg";
import "./App.css";
import Timer from "./Timer";
import SettingsButton from "./SettingsButton";
import Settings from "./Settings";
import { useState } from "react";

function App() {
  const [showSettings, setShowSettings] = useState(true);
  return (
    <main>
      <SettingsButton style={{ position: "absolute", top: 0, right: 0 }} />
      {showSettings ? <Settings /> : null}

      <h1>Out of the box</h1>
      <Timer></Timer>
    </main>
  );
}

export default App;
