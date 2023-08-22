import { createContext, useReducer } from "react";
export const TasksContext = createContext();

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return {
        tasks: action.payload,
      };
    case "CREATE_TASK":
      return {
        tasks: [action.payload, ...state.tasks],
      };
    case "DELETE_TASK":
      let updatedTasks;
      if (Array.isArray(state.tasks)) {
        console.log("i am here");
        updatedTasks = state.tasks.filter(
          (task) => task._id !== action.payload._id
        );
      }
      return {
        ...state,
        tasks: updatedTasks,
      };
    default:
      return state;
  }
};

export const TaskContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, { tasks: [] });
  return (
    <TasksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};
