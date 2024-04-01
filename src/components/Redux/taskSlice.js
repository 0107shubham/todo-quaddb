import { createSlice } from "@reduxjs/toolkit";

const loadTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: loadTasksFromLocalStorage(),
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      saveTasksToLocalStorage(state);
    },
    deleteTask: (state, action) => {
      const updatedTasks = state.filter((task) => task.id !== action.payload);
      saveTasksToLocalStorage(updatedTasks);
      return updatedTasks;
    },
    completedTask: (state, action) => {
      const taskId = action.payload;
      const taskToUpdate = state.find((task) => task.id === taskId);
      if (taskToUpdate) {
        taskToUpdate.completed = !taskToUpdate.completed;
        saveTasksToLocalStorage(state);
      }
    },
  },
});

export const { addTask, deleteTask, completedTask } = taskSlice.actions;
export default taskSlice.reducer;
