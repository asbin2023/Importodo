import Todo from "./Todo";
import { useState, useEffect } from "react";
//imported useStateto display message to the user when they first load the page
const App = () => {
  const [alert, setAlert] = useState("");
  const [time, setTime] = useState("");
  function handleConfirm() {
    setAlert(
      confirm(
        "‼️ = marks as important \n✓ = marks as complete \n 𝖷 = removes the selected list item \n - ability to toggle display/hide on completed items \n - able to sort list based on importance "
      )
    );
  }
  useEffect(() => {
    function updateTime() {
      let daytime = new Date();
      let todaysTime = daytime.toLocaleTimeString();
      setTime(todaysTime);
    }
    updateTime();
    setInterval(updateTime, 1000);
  }, []);

  return (
    <div className="main-main">
      <nav>
        <h1>Importodo</h1>
        <p className="time" style={{ fontFamily: "monospace" }}>
          {" "}
          {time}
        </p>
        <button onClick={handleConfirm}>Help</button>
      </nav>
      <Todo />
    </div>
  );
};

export default App;
