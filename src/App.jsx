import Todo from "./Todo";
import { useState } from "react";
//imported useStateto display message to the user when they first load the page
const App = () => {
  const [alert, setAlert] = useState("");
  function handleConfirm() {
    setAlert(
      confirm(
        "‼️ = marks as important \n✓ = marks as complete \n 𝖷 = removes the selected list item \n - ability to toggle display/hide on completed items \n - able to sort list based on importance "
      )
    );
  }
  let daytime = new Date();
  let today =
    daytime.getMonth() +
    1 +
    " / " +
    daytime.getDate() +
    " / " +
    daytime.getFullYear();

  return (
    <div className="main-main">
      <nav>
        <h1>Importodo</h1>
        <p> {today}</p>
        <button onClick={handleConfirm}>Help</button>
      </nav>
      <Todo />
    </div>
  );
};

export default App;
