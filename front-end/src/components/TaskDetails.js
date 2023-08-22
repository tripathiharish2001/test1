import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

const TaskDetails = ({ task }) => {
  const { dispatch } = useTasksContext(useTasksContext);
  const { user } = useAuthContext();
  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("api/tasks/" + task._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      console.log(json);
      dispatch({ type: "DELETE_TASK", payload: json });
    }
  };
  return (
    <div className="task-container">
      <div className="task-details">
        <h3>{task.title}</h3>
        <p>
          <strong>Application Closed Date : </strong> {task.deadlineTime}
        </p>
        <p>
          <strong>Application Closed Time : </strong> {task.deadlineDate}
        </p>
        <p>
          <strong>Note :</strong> {task.note}
        </p>
        <p>
          <strong>Posted on :</strong> {task.date}
        </p>
        <span className="material-symbols-outlined" onClick={handleClick}>
          delete
        </span>
      </div>
    </div>
  );
};

export default TaskDetails;
