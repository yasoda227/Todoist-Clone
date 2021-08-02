import { React, useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import dateFnsFormat from "date-fns/format";

const FORMAT = "dd//MM/yyyy";
function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}

const AddTask = ({ onCancel, onAddTask }) => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState(null);
  console.log(setTask);
  return (
    <div className="add-task-dialog">
      <input
        value={task}
        onChange={(event) => setTask(event.target.value)}
      ></input>
      <div className="add-task-actions-container">
        <div className="btn-container">
          <button
            className="add-btn"
            onClick={() => {
              onAddTask(task);
              onCancel();
              setTask("");
            }}
          >
            Add Task
          </button>
          <button
            className="cancel-btn"
            onClick={() => {
              onCancel();
              setTask("");
            }}
          >
            Cancel
          </button>
        </div>
        <div className="icon-container"></div>
        <DayPickerInput
          onDayChange={(day) => setDate(day)}
          placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
          formatDate={formatDate}
          format={FORMAT}
          dayPickerProps={{
            modifiers: {
              disabled: [{ before: new Date() }],
            },
          }}
        />
      </div>
    </div>
  );
};

const Tasks = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const addNewTask = (text) => {
    setTasks((prevState) => [...prevState, text]);
  };

  return (
    <div className="tasks">
      <h1>Inbox</h1>
      <div
        className="add-task-btn"
        onClick={() => setShowAddTask((prevState) => !prevState)}
      >
        <span className="plus">+</span>
        <span className="add-task-text">Add Task</span>
      </div>
      {showAddTask && (
        <AddTask
          onAddTask={addNewTask}
          onCancel={() => setShowAddTask(false)}
        />
      )}
      {tasks.length > 0 ? (
        tasks.map((task) => <p>{task}</p>)
      ) : (
        <p>No Task Yet</p>
      )}
    </div>
  );
};

export default Tasks;
