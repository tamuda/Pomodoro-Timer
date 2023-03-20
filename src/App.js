import logo from "./logo.svg";
import "./App.css";
import Timer from "./Timer";
import SettingsButton from "./SettingsButton";

function App() {
  return (
    <main>
      <SettingsButton style={{ position: "absolute", top: 0, right: 0 }} />

      <h1>Out of the box</h1>
      <Timer></Timer>
    </main>
  );
}

export default App;
