import { useEffect, useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import TaskDetails from "../components/TaskDetails";
import TaskForm from "../components/TaskForm";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { tasks, dispatch } = useTasksContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/tasks", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        // console.log("here i am witj ", json);
        console.log("setting task");
        dispatch({ type: "SET_TASKS", payload: json });
      }
    };
    if (user) fetchTasks();
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="tasks">
        {tasks &&
          tasks.map((task) => <TaskDetails task={task} key={task._id} />)}
      </div>
      <TaskForm />
    </div>
  );
};

export default Home;
