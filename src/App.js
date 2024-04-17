import React, { useState, useContext, useEffect } from "react";
import SettingsButton from "./SettingsButton";
import Settings from "./Settings";
import Timer from "./Timer";
import SettingsContext from "./SettingsContext";

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [roundMinutes, setRoundMinutes] = useState(5);
  const [breakMinutes, setBreakMinutes] = useState(0.5);
  const [changeTitle, setChangeTitle] = useState(false);
  const [title, setTitle] = useState("Venture Vibes");
  const settingsInfo = useContext(SettingsContext);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "Enter") {
        setShowSettings(false);
        setChangeTitle(false);
      }
    };

    const handleClickOutside = (e) => {
      const settingsElement = document.getElementById("settingsModal");

      if (
        showSettings &&
        settingsElement &&
        !settingsElement.contains(e.target)
      ) {
        setShowSettings(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showSettings, changeTitle]); // Dependencies to re-attach listeners if these values change

  return (
    <SettingsContext.Provider
      value={{
        showSettings,
        setShowSettings,
        roundMinutes,
        breakMinutes,
        setRoundMinutes,
        setBreakMinutes,
        title,
        setTitle,
      }}
    >
      <main>
        <div id="settingsModal">
          <SettingsButton
            onClick={() => setShowSettings(true)}
            id="settingsButton"
            style={{ position: "absolute", top: 0, right: 0 }}
          />
          {showSettings && <Settings />}
        </div>
        <div id="titleModal" className="pb-4">
          {changeTitle ? (
            <input
              type="text"
              autoFocus
              className="px-2 py-1 text-3xl font-bold text-neutral-600 rounded-lg text-center focus:border border-1 focus:outline-none"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              onBlur={() => setChangeTitle(false)} // Automatically close edit mode when focus is lost
              // Prevent click from propagating to the container
            />
          ) : (
            <h1
              className="text-3xl p-4 font-bold cursor-pointer hover:text-gray-400"
              onClick={() => setChangeTitle(true)} // Toggle edit mode on click
            >
              {title}
            </h1>
          )}
        </div>
        <Timer />
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
