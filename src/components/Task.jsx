/* eslint-disable react/prop-types */
import { format } from "date-fns";
import classNames from "classnames";
import { useStore } from "../store";
import "./Task.css";
const Task = ({task, onEditTask}) => {
    const { title, state, id, timestamp } = task;
    const {deleteTask, setDraggedTask} = useStore((store) => store);
  return (
    <div className={classNames("task", `${task.state}-task`)} draggable onDragStart={() => {setDraggedTask(task)}}>
        <div className="timestampWrapper">
            <span>{format(timestamp,  "dd MMM hh:mm a")}</span>
        </div>
      <div style={{ margin: "1rem 0"}}>{title}</div>
      <div className="bottomWrapper">
        <div className="buttons">
            {task.state === "PLANNED" && <button onClick={() => { onEditTask(task)}}>🖊️</button>}
            <button onClick={() => {deleteTask(id)}}>🗑️</button>
        </div>
        <div className={classNames('status', state)}>{state}</div>
      </div>
    </div>
  )
}

export default Task
