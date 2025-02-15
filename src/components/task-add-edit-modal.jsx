import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useStore } from "../store";

// eslint-disable-next-line react/display-name
const TaskAddEditModal = forwardRef((props, ref) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const addTask = useStore((store) => store.addTask);
  const updateTask = useStore((store) => store.updateTask);

  const closeModal = () => {
    setOpen(false);
    setText("");
    setModalData({});
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    console.log("Modal Data", modalData);
    if (modalData.task) {
        updateTask(modalData.task.id, title);
    }
    else {
        addTask(title, modalData.state);
    }
    closeModal();
  };

  useImperativeHandle(ref, () => ({
    openModal: (data) => {
      setOpen(true);
      setModalData(data);
    },
    closeModal,
  }));

  useEffect(() => {
    if (modalData.task) {
      setText(modalData.task.title);
    }
  }, [modalData]);
  return (
    <>
      {open && (
        <div className="modal">
          <div className="modalContent">
            <div className="modalHeader">
              <h2>{ modalData.task ? "Edit" : "Add" } Task</h2>
              <button
                onClick={() => {
                  setOpen(false);
                  setText("");
                }}
              >
                ✕
              </button>
            </div>
            <form
              className="addTaskForm"
              onSubmit={(e) => {
                handleTaskSubmit(e);
              }}
            >
              <input
                type="text"
                value={text}
                name="title"
                onChange={(e) => setText(e.target.value)}
              />
              <button type="submit" >
                {modalData.task ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
});

export default TaskAddEditModal;
