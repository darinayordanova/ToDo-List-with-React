import React, { useState, createContext, useEffect } from "react";

export const ClickedTaskContext = createContext();

export function ClickedTaskProvider(props) {
    const [task, setTask] = useState({});

    return (
        <ClickedTaskContext.Provider value={[task, setTask]}>
            {props.children}
        </ClickedTaskContext.Provider>);
}

