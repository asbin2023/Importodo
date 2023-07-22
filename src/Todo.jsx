//imported useState to use later
import { useState, useEffect } from "react";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// declaring states
//looking back, I wish i had used objects to store data, instead of creating these many states.

const Todo = () => {
  // inputText is for setting the user input
  const [inputText, setInputText] = useState("");

  //list -> stores the list of input whenever the user submits
  const [list, setList] = useState([]);

  //done -> array of completed todos
  const [done, setDone] = useState([]);

  //this is to show/hide the 'Completed' h2 later on
  const [toggle, setToggle] = useState(false);

  //important -> an array of important todos, used later.
  const [important, setImportant] = useState([]);

  //combine -> combines the important items and the non-important items. important items are in the front compared to the other items.
  const [combine, setCombine] = useState([]);

  const [toggle2, setToggle2] = useState("none");

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //handleChange -> tracks the change in the todo list input (whenever the user types something in )
  //this also sets the inputText state to the current value of the input
  function handleChange(e) {
    setInputText(e.target.value);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //this runs when the user submits the input by either clicking the button or hititng the enter key
  //first we prevent default to stop the form from making a request
  //then we set a condition, if the todoList already includes the input type, it alerts the user that it already exists

  // if the contidion is false (meaning the user is inputting something new), then we use the ...spread operator to make a copy of
  // the original array, and then add whatever the user inputed at the end.

  function handleSubmit(e) {
    e.preventDefault();
    if (list.includes(inputText)) {
      //confirm is very similar to alert(), just different designs
      confirm(
        `'${inputText.toUpperCase()}' already exists. Add something else :) `
      );
    } else {
      setList([...list, inputText]);
    }
    //setting the input to empty after submitting
    setInputText("");
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //for handleDelete function, this is the ❌, it deletes the list item by using .filter method
  // I also ended up deleting the list item from the important array if it was there as well (in order to fix a bug in the future)

  function handleDelete(e) {
    setImportant((prevImportant) =>
      prevImportant.filter((item) => item !== e.target.value)
    );
    setList((prevList) => {
      return prevList.filter((item) => {
        return item !== e.target.value;
        //the filter method filers out new array without the list item we want to delete
      });
    });
    //it also removes the list item from combine array (if it was there in the first place)
    setCombine((prevCombine) =>
      prevCombine.filter((item) => item !== e.target.value)
    );
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //for the next two functions, i created them in order to show/hide the 'Completed' div element. pretty simple functions.
  function handleToggle() {
    console.log(done.length);
    done.length < 1 ? confirm("Completed is empty") : setToggle(!toggle);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //handleAdd -> when the user clicks on ✅, it adds that list to the [done] array.
  //i have a condition that checks whether or not the list item is on the [done] array
  //if its not, that means we should add it to the [done] array

  function handleAdd(e) {
    setToggle("block");
    done.includes(e.target.value) ? null : setDone([...done, e.target.value]);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //this resets everything
  function handleReset() {
    setDone([]);
    setInputText("");
    setList([]);
    setImportant([]);
    setCombine([]);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // deletes the item from the 'Completed' list after the 'x' is pressed.

  function deleteCompleted(e) {
    setDone((done) => done.filter((word) => word !== e.target.value));
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //for this, once the 🟣 is clicked, it adds the selected list item to the important array.
  //the condition returns null if the targeted null is already in the important array

  function handleImportant(e) {
    important.includes(e.target.value)
      ? null
      : //also using the spread operator in order to not mutuate the original
        setImportant([...important, e.target.value]);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // the condition was used to debug later on
  //other than that, this function creates a copy of the list array, and filters it out.
  // my main goal was to create an array which contains the important items first, then the non-important items.
  //this is for the 'Sort by importance'
  // i also use the .includes method to check if the item already existed in the important array

  function handleCombine() {
    if (combine.length <= 1) {
      setCombine([]);
    }
    let listCopy = [...list];
    let filered = listCopy.filter((item) => !important.includes(item));
    setCombine([...important, ...filered]);
    //setting combine at the very end, using ...spread to copy ...both arrays
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //after the important list is displayed, once the user clicks '🍀', the list item is deleted from the ...combine array (filtered)
  //also for the condition,it was once again used to debug the code after running into serval bugs regarding the important array

  function handleImportantDelete(e) {
    if (combine.length <= 1) {
      setCombine([]);
      setImportant([]);
    }

    setCombine((prevCombine) =>
      prevCombine.filter((item) => item !== e.target.value)
    );
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //used useEffect hook and added an condition which renders every time the [combine] state changes.
  //implemented this in order to fix a bug

  useEffect(() => {
    if (important.length !== 0) {
      setToggle2("block");
    } else {
      setToggle2("none");
    }
  }, [combine]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="main-container">
      <div className="sub-main-container">
        <form className="form" onSubmit={handleSubmit} action="#">
          <input
            className="the-input"
            onChange={handleChange}
            value={inputText}
            type="text"
            required
            spellCheck={true}
            autoFocus
            placeholder="Enter todo here.."
          />
          <button className="add-todo-button">Add Todo</button>
          <button type="reset" className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </form>
      </div>
      <div className="the-three-buttons">
        <button className="display-completed-button" onClick={handleToggle}>
          Toggle Completed
        </button>
        <button className="hide-completed-button">Placeholder</button>
        <button
          className="sort-by-button"
          disabled={important.length <= 0 && true}
          onClick={handleCombine}
        >
          {" "}
          Sort by importance
        </button>
      </div>

      <div className="middle-display">
        <div className="the-todo-display">
          <h2
            style={{ display: list.length > 0 ? "block" : "none" }}
            className="todo-h2"
          >
            {" "}
            Todo List
          </h2>
          <ul>
            {list.map((item, index) => (
              <li draggable className="mess" key={index}>
                {item}
                <button
                  className="the-add-button"
                  value={item}
                  onClick={handleAdd}
                >
                  ✅
                </button>
                <button
                  className="the-delete-button"
                  value={item}
                  onClick={handleDelete}
                >
                  {" "}
                  ❌
                </button>
                <button
                  className="purple-important-button"
                  value={item}
                  onClick={handleImportant}
                >
                  🟣
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="the-completed-display">
          <div
            style={{ display: toggle && done.length > 0 ? "block" : "none" }}
          >
            <h2 className="todo-h2">Completed:</h2>
            <ul>
              {done.map((item) => (
                <li
                  className="skies"
                  style={{ textDecoration: "line-through" }}
                  key={item}
                >
                  {item}
                  <button
                    className="completed-delete-button"
                    value={item}
                    onClick={deleteCompleted}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="the-important-display">
          <div style={{ display: toggle2 }}>
            <h2 className="todo-h2">Important:</h2>
            <ul>
              {important.length > 0 &&
                combine.map((item, idx) => {
                  return (
                    <div key={idx}>
                      <li className="stars">
                        {item}
                        <button
                          className="important-delete-button"
                          value={item}
                          onClick={handleImportantDelete}
                        >
                          🍀
                        </button>
                      </li>
                    </div>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
