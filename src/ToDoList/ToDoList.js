import React, { useState, useContext, useEffect } from 'react';
import Task from './Task/Task';
import { ToDoListContext } from "../Context/ToDoListContext";
import { FilteredTaskContext } from '../Context/FilteredTaskContext';

function ToDoList() {
    const [tasks, setTasks] = useContext(ToDoListContext);
    const [filter, setFilter] = useContext(FilteredTaskContext);

    const [local, setLocal] = useState([])
    useEffect(() => {

        setLocal(tasks)
        

    }, [tasks])

    
    console.log(tasks)
    return (

        <div className="taskList">
            {
                local !== null 
                    ? (
                        local.map((item, index) => (
                            filter
                                ? (
                                    item.status === "active" 
                                        ?  (<Task key={index} task={item} id={index} />)
                                        : null

                                )
                                : <Task key={index} task={item} id={index} />
                        ))
                    )
                    : null
            }
        </div> 
    )

}
export default ToDoList;