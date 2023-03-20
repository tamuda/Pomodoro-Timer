import ReactSlider from "react-slider";
import "./slider.css";

function Settings() {
  return (
    <div
      style={{ position: "absolute", top: 100, right: 100, textAlign: "left" }}
    >
      <label>Round Time:</label>
      <ReactSlider
        classname={"slider"}
        thumbClassname={"thumb"}
        trackClassName={"track"}
        value={7}
        min={1}
        max={24}
      />
      <label>Break:</label>
    </div>
  );
}
export default Settings;
