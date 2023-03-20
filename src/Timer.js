import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButtoon from "./PlayButton";
import PauseButton from "./PauseButton";

const red = "#f54e4e";
const green = "#4ecf54";
const yellow = "#f5d54e";

function Timer() {
  return (
    <div>
      <CircularProgressbar
        value={60}
        text={`60%`}
        styles={buildStyles({
          textColor: "white",
          pathColor: red,
          trailColor: "transparent",
        })}
      />
      <div
        style={{
          marginTop: "20px",
          width: "300px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <PlayButtoon />
        <PauseButton />
      </div>
    </div>
  );
}
export default Timer;
