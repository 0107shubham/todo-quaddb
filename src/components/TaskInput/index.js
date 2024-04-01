import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import "./index.css";
import { addTask } from "../../components/Redux/taskSlice";

const TaskInput = () => {
  const [text, setText] = useState(""); // State for task text
  const dispatch = useDispatch(); // Redux dispatch function

  const handleInputChange = (e) => {
    setText(e.target.value); // Update text state as user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      // Check if input is not empty
      // Dispatch action to add task to Redux store
      dispatch(addTask({ id: uuidv4(), text: text, completed: false }));
      setText(""); // Clear input field after submitting task
    }
  };

  return (
    <form className="form-input" onSubmit={handleSubmit}>
      <input
        className="task-input"
        type="text"
        value={text}
        onChange={handleInputChange}
        placeholder="Add a task"
      />
      <button className="task-add-button" type="submit">
        Add Task
      </button>
    </form>
  );
};

export default TaskInput;
