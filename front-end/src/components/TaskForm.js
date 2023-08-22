import React from "react";
import { useState } from "react";
import { json } from "react-router-dom";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

const TaskForm = () => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const task = { title, deadlineTime, deadlineDate, note };
    const response = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setTitle("");
      setDeadlineTime("");
      setDeadlineDate("");
      setNote("");
      setError(null);
      setEmptyFields([]);
      console.log("creating task");
      dispatch({ type: "CREATE_TASK", payload: json });
    }
  };

  return (
    <div className="form-field">
      <form action="" className="create" onSubmit={handleSubmit}>
        <h3>Add a new task</h3>

        {}
        <label htmlFor="">Company Name :</label>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          className={emptyFields.includes("title") ? "error" : ""}
        />

        {}

        <label htmlFor="">Applications Closed Date :</label>
        <input
          type="text"
          onChange={(e) => {
            setDeadlineDate(e.target.value);
          }}
          value={deadlineDate}
          className={emptyFields.includes("deadlineDate") ? "error" : ""}
        />

        {}
        <label htmlFor="">Applications Closed Time :</label>
        <input
          type="text"
          onChange={(e) => {
            setDeadlineTime(e.target.value);
          }}
          value={deadlineTime}
          className={emptyFields.includes("deadlineTime") ? "error" : ""}
        />

        {}
        <label htmlFor="">Note :</label>
        <input
          type="text"
          onChange={(e) => {
            setNote(e.target.value);
          }}
          value={note}
        />
        <button>Add new task!</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default TaskForm;
