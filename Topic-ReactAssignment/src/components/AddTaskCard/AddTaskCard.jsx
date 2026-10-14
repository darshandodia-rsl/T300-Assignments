import { useState } from "react";
import "./AddTaskCard.css";

function AddTaskCard({ onAddTask }) {
  const [taskText, setTaskText] = useState("");

  // submit new task and clear input
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddTask) {
      onAddTask(taskText);
      setTaskText("");
    }
  };

  return (
    <div className="todo-input-card">
      <form onSubmit={handleSubmit}>
        <div className="todo-input-group">
          <div className="todo-input-icon">
            <i className="fa-solid fa-book"></i>
          </div>
          <input
            type="text"
            className="todo-input-field"
            placeholder="New Todo"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
        </div>

        <button type="submit" className="add-button">
          Add new task
        </button>
      </form>
    </div>
  );
}

export default AddTaskCard;