import ReactSlider from "react-slider";
import "./slider.css";
import SettingsContext from "./SettingsContext";
import { useContext } from "react";
import SaveButton from "./SaveButton";

function Settings() {
  const settingsInfo = useContext(SettingsContext);

  return (
    <card
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        textAlign: "left",
      }}
    >
      <div>
        <label>Round Time: {settingsInfo.roundMinutes}:00</label>
        <ReactSlider
          classname={"slider"}
          thumbClassname={"thumb"}
          trackClassName={"track"}
          value={settingsInfo.roundMinutes}
          min={1}
          max={15}
          onChange={(newValue) => settingsInfo.setRoundMinutes(newValue)}
        />
        <label>Break: {settingsInfo.breakMinutes}:00</label>
        <ReactSlider
          classname={"slider green"}
          thumbClassname={"thumb"}
          trackClassName={"track"}
          value={settingsInfo.breakMinutes}
          onChange={(newValue) => settingsInfo.setBreakMinutes(newValue)}
          min={1}
          max={5}
        />

        <SaveButton onClick={() => settingsInfo.setShowSettings(false)} />
      </div>
    </card>
  );
}
export default Settings;
