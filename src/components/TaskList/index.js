import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, completedTask } from "../Redux/taskSlice";
import { MdDelete } from "react-icons/md";
import "./index.css";

// Define listElemnt component outside TaskList
const ListElement = ({ task, handleCheckboxChange, handleDelete }) => {
  let backgroundCss = task.completed
    ? "completed-container elemnt"
    : "uncompleted-container elemnt";
  return (
    <li className={backgroundCss} key={task.id}>
      <input
        className="checkBoxIcon"
        type="checkbox"
        checked={task.completed}
        onChange={() => handleCheckboxChange(task.id)}
      />
      <p className="task-name">{task.text}</p>

      <MdDelete className="deleteicon" onClick={() => handleDelete(task.id)} />
    </li>
  );
};

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleCheckboxChange = (taskId) => {
    dispatch(completedTask(taskId));
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <ul className="element-container">
      {tasks.map((task) => (
        <ListElement
          key={task.id}
          task={task}
          handleCheckboxChange={handleCheckboxChange}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default TaskList;
