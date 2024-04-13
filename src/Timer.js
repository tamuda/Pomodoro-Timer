import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import { useContext, useState, useEffect, useRef } from "react";
import SettingsContext from "./SettingsContext";
import Props from "./Props";
const bellSound = require("./bell.wav");

const red = "#f54e4e";
const green = "#4ecf54";

function Timer() {
  const settingsInfo = useContext(SettingsContext);
  const [mode, setMode] = useState("round"); //round/break/null

  const [isPaused, setIsPaused] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);
  const message = mode === "round" ? "Happy chatting" : "Time to switch tables";

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === "round" ? "break" : "round";
      const nextSeconds =
        (nextMode === "round"
          ? settingsInfo.roundMinutes
          : settingsInfo.breakMinutes) * 60;

      setMode(nextMode);
      //check if next mode is break
      if (nextMode === "break") {
        const audioEl = document.querySelector(".audio-element");
        audioEl.play().catch((e) => console.error("Error playing audio:", e));
      }

      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = settingsInfo.roundMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [settingsInfo.roundMinutes, settingsInfo.breakMinutes]);

  const totalSeconds =
    mode === "round"
      ? settingsInfo.roundMinutes * 60
      : settingsInfo.breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);
  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;
  const timeLeft = minutes + ":" + seconds;

  return (
    <div>
      <audio className="audio-element">
        <source src={bellSound}></source>
      </audio>
      <div style={{ position: "relative", width: "400px", height: "400px" }}>
        <img
          src={"./cosmo-05.png"}
          style={{
            width: "85%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 0,
          }}
        />
        <h2
          style={{
            width: "85%",
            position: "absolute",
            top: "16%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 0,
          }}
        >
          {timeLeft}
        </h2>

        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 3,
          }}
        >
          <CircularProgressbar
            value={percentage}
            styles={buildStyles({
              textColor: "white",
              pathColor: mode === "round" ? red : green,
              trailColor: "transparent",
            })}
          />
        </div>
      </div>

      <h2 style={{ width: "100%", textAlign: "center", marginTop: "50px" }}>
        {message}
      </h2>

      <div
        style={{
          marginTop: "10px",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 4,
        }}
      >
        {isPaused ? (
          <PlayButton
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <PauseButton
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          />
        )}
      </div>
      <div style={{ relative: "absolute", zIndex: 0 }}>
        <Props style={{ position: "absolute", zIndex: 0 }} />
      </div>
    </div>
  );
}
export default Timer;
