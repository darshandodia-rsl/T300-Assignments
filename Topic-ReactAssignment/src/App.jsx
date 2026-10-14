import { useState, useRef } from 'react'
import AddTaskCard from './components/AddTaskCard/AddTaskCard'
import FilterButtonRow from './components/FilterButtonRow/FilterButtonRow'
import TaskCard from './components/TaskCard/TaskCard'
import './App.css'

const INITIAL_TASKS = [
  { id: 1, text: 'Learn ReactJS basics', completed: true },
  { id: 2, text: 'Practice ReactJS', completed: false },
  { id: 3, text: 'Learn Redux', completed: false },
  { id: 4, text: 'Code portfolio in React', completed: false },
  { id: 5, text: 'Learn React Native', completed: false },
]

function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [filter, setFilter] = useState('All')
  const [taskToDelete, setTaskToDelete] = useState(null)

  const dialogRef = useRef(null)

  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    }
    setTasks([...tasks, newTask])
  }

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) => {
        return task.id === id ? { ...task, completed: !task.completed } : task
      })
    )
  }

  const handleDeleteTask = (id) => {
    setTaskToDelete(id)
    dialogRef.current?.showModal()
  }

  const confirmDeleteTask = () => {
    if (taskToDelete !== null) {
      setTasks(tasks.filter((task) => task.id !== taskToDelete))
      setTaskToDelete(null)
    }
    dialogRef.current?.close()
  }

  const cancelDeleteTask = () => {
    setTaskToDelete(null)
    dialogRef.current?.close()
  }

  const handleEditTask = (id, newText) => {
    console.log('Editing task with id:', id, 'New text:', newText)
    setTasks(
      tasks.map((task) => {
        return task.id === id ? { ...task, text: newText } : task
      })
    )
  }

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'Done') return task.completed
      if (filter === 'Todo') return !task.completed
      return true
    })
    .sort((taskA, taskB) => Number(taskB.completed) - Number(taskA.completed))

  return (
    <div className="app-container">
      <h2 className="section-title">TodoInput</h2>
      <AddTaskCard onAddTask={handleAddTask} />

      {filteredTasks.length > 0 ? (
        <>
          <h2 className="section-title todo-list-title">TodoList</h2>
          <FilterButtonRow
            activeFilter={filter}
            onFilterChange={setFilter}
          />

          <div className="task-list">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                text={task.text}
                completed={task.completed}
                onToggle={() => handleToggleTask(task.id)}
                onEdit={(newText) => handleEditTask(task.id, newText)}
                onDelete={() => handleDeleteTask(task.id)}
              />
            ))}
          </div>
        </>
      ) : (
        <h2 className="section-unavailable">No todo is available</h2>
      )}

      <dialog
        ref={dialogRef}
        className="confirm-dialog"
        onCancel={cancelDeleteTask}>
        <h3 className="modal-title">Delete Task</h3>

        <p className="modal-message">
          Are you sure you want to delete this task? This action cannot be undone.
        </p>

        <div className="modal-actions">
          <button
            type="button"
            className="btn-cancel"
            onClick={cancelDeleteTask}>
            Cancel
          </button>

          <button
            type="button"
            className="btn-confirm"
            onClick={confirmDeleteTask}>
            Delete
          </button>
        </div>
      </dialog>
    </div>
  )
}

export default App