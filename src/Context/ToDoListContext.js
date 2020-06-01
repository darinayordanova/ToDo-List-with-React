import React, { useState, createContext, useEffect } from "react";

export const ToDoListContext = createContext();

export function ToDoListProvider(props) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('Tasks'))) {
            if (JSON.parse(localStorage.getItem('Tasks')).length > 0) {
                setTasks(JSON.parse(localStorage.getItem('Tasks')))
            }
        }

    }, [])
    useEffect(() => {
        localStorage.setItem('Tasks', JSON.stringify(tasks))


    }, [tasks])

    return (
        <ToDoListContext.Provider value={[tasks, setTasks]}>
            {props.children}
        </ToDoListContext.Provider>);
}

