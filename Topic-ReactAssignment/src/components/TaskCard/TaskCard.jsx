import { useState } from "react";
import "./TaskCard.css";

function TaskCard({ text, completed = false, onToggle, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(text);

    return (
        <div className="task-card">
            {isEditing ? (
                <div className="task-edit-group">
                    <input
                        type="text"
                        value={editedText}
                        autoFocus
                        className="task-text"
                        onChange={(e) => setEditedText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                onEdit(e.target.value);
                                setIsEditing(false);
                            }
                        }}
                    />

                    <button
                        type="button"
                        className="action-btn save-btn"
                        onClick={() => {
                            setEditedText(editedText);
                            onEdit(editedText);
                            setIsEditing(false);
                        }}
                        title="Save changes"
                    >
                        <i className="fa-solid fa-save icon-save"></i>
                    </button>

                    <button
                        type="button"
                        className="action-btn cancel-btn"
                        onClick={() => setIsEditing(false)}
                        title="Cancel editing"
                    >
                        <i className="fa-solid fa-xmark icon-cancel"></i>
                    </button>
                </div>
            ) : (
                <>
                    <span
                        className={`task-text ${completed ? "completed" : ""}`}
                    >
                        {text}
                    </span>

                    <div className="task-actions">
                        <button
                            type="button"
                            className="action-btn check-btn"
                            onClick={onToggle}
                            title={completed ? "Mark as todo" : "Mark as done"}
                        >
                            {completed ? (
                                <i className="fa-regular fa-square-check icon-checked"></i>
                            ) : (
                                <i className="fa-regular fa-square icon-unchecked"></i>
                            )}
                        </button>

                        {completed ? (
                            <button
                                type="button"
                                className="action-btn delete-btn"
                                onClick={onDelete}
                                title="Delete task"
                            >
                                <i className="fa-solid fa-trash icon-delete"></i>
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="action-btn edit-btn"
                                onClick={() => setIsEditing(true)}
                                title="Edit task"
                            >
                                <i className="fa-solid fa-pen icon-edit"></i>
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default TaskCard;