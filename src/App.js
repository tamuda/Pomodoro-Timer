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
  const [roundMinutes, setRoundMinutes] = useState(5);
  const [breakMinutes, setBreakMinutes] = useState(0.5);
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
        <h1>Venture Vibes</h1>
        <div style={{ zIndex: 2 }}>
          <Timer />
        </div>
        <span />
        <img
          src={"./timer_bg-01.png"}
          style={{
            width: "100%",
            position: "absolute",
            bottom: "-40%",
            left: "0%",
            zIndex: 1,
            marginTop: "50px",
          }}
        />
      </main>
    </SettingsContext.Provider>
  );
}
export default App;
