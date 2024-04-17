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
  const [roundMessage, setRoundMessage] = useState("Happy chatting!");
  const [breakMessage, setBreakMessage] = useState("Time to switch tables!");
  const [messageModal, setMessageModal] = useState(false);
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);
  const message = mode === "round" ? roundMessage : breakMessage;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "Enter") {
        setMessageModal(false);
      }
    };

    const handleClickOutside = (e) => {
      const messageElement = document.getElementById("messageModal");

      if (
        messageModal &&
        messageElement &&
        !messageElement.contains(e.target)
      ) {
        setMessageModal(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [messageModal]);

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
      <div className="relative w-[400px] h-[400px]">
        <img
          src={"./cosmo-05.png"}
          className="absolute w-5/6 scale-105 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 font-mono"
        />
        <h2 className="absolute w-5/6 top-[5.2rem] text-2xl font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
          {timeLeft}
        </h2>

        <div className="absolute w-full h-full z-10">
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

      <div className="pt-8" id="messageModal">
        {messageModal ? (
          <form
            className="flex gap-2 text-xl text-center text-gray-600 "
            id="messageModal"
          >
            <input
              type="text"
              autoFocus
              value={roundMessage}
              onChange={(e) => setRoundMessage(e.target.value)}
              className="p-2 border text-center focus:outline-none rounded-lg"
            />
            <input
              type="text"
              value={breakMessage}
              onChange={(e) => setBreakMessage(e.target.value)}
              className="p-2 border text-center rounded-lg"
            />
          </form>
        ) : (
          <h2
            onClick={(e) => {
              e.stopPropagation();
              setMessageModal(true);
            }}
            className="text-3xl cursor-pointer hover:text-neutral-400 "
          >
            {message}
          </h2>
        )}
      </div>

      <div className="flex justify-center pt-1">
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
