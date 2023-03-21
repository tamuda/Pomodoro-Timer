import logo from "./logo.svg";
import "./App.css";
import Timer from "./Timer";
import SettingsButton from "./SettingsButton";
import Settings from "./Settings";
import { useState } from "react";
import SettingsContext from "./SettingsContext";
import { useContext } from "react";

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [roundMinutes, setRoundMinutes] = useState(7);
  const [breakMinutes, setBreakMinutes] = useState(1);
  const settingsInfo = useContext(SettingsContext);

  return (
    <SettingsContext.Provider
      value={{
        showSettings,
        setShowSettings,
        roundMinutes,
        breakMinutes,
        setRoundMinutes,
        setBreakMinutes,
      }}
    >
      <main>
        <SettingsButton
          onClick={() => {
            setShowSettings(true);
          }}
          style={{ position: "absolute", top: 0, right: 0 }}
        />
        {showSettings ? <Settings /> : null}
        <h1>Out of the box</h1>
        <Timer />
      </main>
    </SettingsContext.Provider>
  );
}
export default App;
