import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
const store = (set) => ({
    tasks: [],
    draggedTask: null,
    addTask: (title, state) => set(store => ({ tasks: [...store.tasks, { title, state, id: new Date().getTime(), timestamp: new Date() }] }), false, 'addTask'),
    deleteTask: (id) => set(store => ({ tasks: store.tasks.filter(task => task.id !== id) }), false, 'deleteTask'),
    updateTask: (id, title) => set(store => ({ tasks: store.tasks.map(task => task.id === id ? { ...task, title } : task) }), false, 'updateTask'),
    setDraggedTask: (task) => set({ draggedTask: task }, false, 'setDraggedTask'),
    moveTask: (id, newState) => set(store => ({ tasks: store.tasks.map(task => task.id === id ? { ...task, state: newState, timestamp: new Date() } : task) }), false, 'moveTask')
});

export const useStore = create(persist(devtools(store), { name: 'store'}));