/* eslint-disable react/prop-types */
import { useMemo, useRef, useState } from "react";
import { useStore } from "../store";
import "./Column.css";
import Task from "./Task";
import classNames from "classnames";
import TaskAddEditModal from "./task-add-edit-modal";
const Column = ({ state }) => {
  const [isDropping, setIsDropping] = useState(false);
  const modalRef = useRef();
  const tasks = useStore((store) => store.tasks);
  const draggedTask = useStore((store) => store.draggedTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const moveTask = useStore((store) => store.moveTask);

  const onEditTask = (task) => {
    modalRef.current.openModal({ task, state });
  }

  const filtered = useMemo(() => {
    return tasks.filter((task) => task.state === state);
  }, [tasks, state]);
  
  return (
    <div
      className={classNames("column", { isDropping })}
      onDragOver={(e) => {
        setIsDropping(true);
        e.preventDefault();
      }}
      onDragLeave={() => setIsDropping(false)}
      onDrop={() => {
        setIsDropping(false);
        moveTask(draggedTask.id, state);
        setDraggedTask(null);
      }}
    >
      <div className="titleWrapper">
        <p className={classNames(`${state}-title`)}>{state}</p>
        {state === "PLANNED" && (
          <button onClick={() => modalRef.current.openModal({ state })}>Add</button>
        )}
      </div>
      {filtered.map((task) => (
        <Task key={task.id} task={task} onEditTask={onEditTask} />
      ))}
      <TaskAddEditModal ref={modalRef} />
    </div>
  );
};

export default Column;
