import React, { useState, useContext } from 'react';
import { ToDoListContext } from "../Context/ToDoListContext";
import { v4 as uuidv4 } from 'uuid';

export default function Navigation() {
    const [name, setName] = useState("")
    const [deadline, setDeadline] = useState("")
    const [notes, setNotes] = useState("")
    const [label, setLabel] = useState("")
    const [labels, setLabels] = useState([])
    const [subtask, setSubtask] = useState("")
    const [subtasks, setSubtasks] = useState([])
    const [tasks, setTasks] = useContext(ToDoListContext)

    const [showAdd, setShowAdd] = useState(false);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;

    const handleAdd = (e) => {
        e.preventDefault();
        var item = {
            id: uuidv4(),
            name: name,
            status: "active",
            deadline: deadline,
            notes: notes,
            labels: labels,
            subtasks: subtasks
        }

        if (name.length > 0) {
            setTasks(tasks => [...tasks, item])
            setName("")
            setDeadline("")
            setNotes("")
            setLabels([])
            setSubtasks([])

            setShowAdd(false)
        }

    }

    const handleLabelAdd = (e) => {
        e.preventDefault();
        if (label.length > 0) {
            setLabels(labels => [...labels, label])
            setLabel("")
        }
    }

    const handleLabelRemove = (id) => {
        setLabels(labels.filter((e) => (e !== labels[id])))
    }
    const handleSubtaskRemove = (id) => {
        setSubtasks(subtasks.filter((e) => (e !== subtasks[id])))
    }

    const handleSubtaskAdd = (e) => {
        e.preventDefault();
        var item = {
            name: subtask,
            status: "active"
        }
        if (subtask.length > 0) {
            setSubtasks(subtasks => [...subtasks, item])
            setSubtask("")
        }
    }
    const handleModalHide = (e) => {
        e.preventDefault();
        setName("")
        setDeadline("")
        setNotes("")
        setSubtask("")
        setLabel("")

        setLabels([])
        setSubtasks([])

        setShowAdd(false)
    }
    return (
        <>
            <button onClick={() => setShowAdd(true)} className="addTask">Add Task</button>
            {showAdd ? (
                <div className="overlay">
                    <form onSubmit={handleAdd}>
                        <div className="row jc-sb">
                            <h3>Add Task</h3>
                            <button onClick={(e) => handleModalHide(e)} className='close'></button>
                        </div>
                        <label className="mt-20 block">Task Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <label className="mt-20 block">Notes</label>
                        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
                        <div className="row jc-sb mt-20">
                            <div className=" col-6">
                                <label>Duedate</label>
                                <input type="date" min={today} value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                            </div>
                            <div className="col-6 block">
                                <label>Labels</label>
                                <div className="labels">
                                    {labels.length > 0 ?
                                        labels.map((item, index) => (
                                            <p key={"label" + index}>{item} <span className="close" onClick={() => handleLabelRemove(index)}></span></p>
                                        )) : null
                                    }
                                </div>
                                <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} />
                                <button onClick={(e) => handleLabelAdd(e)} className="primary-button mt-10">Add Label</button>
                            </div>
                        </div>


                        <label className="mt-20">Subtasks</label>
                        <div className="subtasks">
                            {subtasks.length > 0 ?
                                subtasks.map((item, index) => (
                                    <p key={"subtask" + index}>{item.name} <span className="close" onClick={() => handleSubtaskRemove(index)}></span></p>
                                )) : null
                            }
                        </div>
                        <input type="text" value={subtask} onChange={(e) => setSubtask(e.target.value)} />
                        <button onClick={(e) => handleSubtaskAdd(e)} className="primary-button mt-10">Add Subtask</button>
                        <div className="block mt-20">
                            <input type="submit" className="primary-button" value="Add task " />

                        </div>
                    </form>
                </div>) : null}
        </>
    )
}
