import React, { useState, useContext, useEffect } from 'react';
import { ToDoListContext } from "../../Context/ToDoListContext";

function Task({ task, id }) {
    const [tasks, setTasks] = useContext(ToDoListContext);
    const [showOptions, setShowOptions] = useState(false);
    const [edit, setEdit] = useState(false);
    const [taskId, setTaskId] = useState(task.id)
    const [showPopUp, setShowPopUp] = useState(false);
    const [name, setName] = useState(task.name)
    const [status, setStatus] = useState(task.status)
    const [deadline, setDeadline] = useState(task.deadline)
    const [notes, setNotes] = useState(task.notes)
    const [label, setLabel] = useState("")
    const [labels, setLabels] = useState(task.labels)
    const [nLabels, setNLabels] = useState(task.labels)
    const [subtask, setSubtask] = useState("")
    const [subtasks, setSubtasks] = useState(task.subtasks)
    const [nSubtasks, setNSubtasks] = useState(task.subtasks)
    var arr = tasks;
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

    useEffect(() => {
    }, [tasks])
    const handleDelete = (id) => {
        arr.splice(id, 1)
        setTasks(tasks.filter((e) => (e.id !== taskId)))
        setShowOptions(false)
        setShowPopUp(false)

    }

    const handleEdit = (id) => {
        setShowPopUp(true)
        setEdit(true)
    }
    const handleCheck = (id) => {
        var localTasks = [...tasks]
        var thisTask = localTasks[id]

        if (thisTask.status === "active") {
            thisTask.status = ""
            setStatus("")
        }
        else {
            thisTask.status = "active"
            setStatus("active")
        }
        localTasks[id] = thisTask
        setTasks(localTasks)
    }
    const handleCheckInner = (id, index) => {
        var localTasks = [...tasks]
        var thisTask = localTasks[id].subtasks[index]
        if (thisTask.status === "active") {
            thisTask.status = ""
        }
        else {
            thisTask.status = "active"
        }
        localTasks[id].subtasks[index] = thisTask
        setTasks(localTasks)
    }
    const handleModalHide = (e) => {
        e.preventDefault();
        setShowOptions(false)
        setEdit(false)

        setNLabels(labels)
        setNSubtasks(subtasks)
        setShowPopUp(false)
    }
    const handleEditSubmit = (e) => {
        e.preventDefault();
        var localstate = [...tasks];

        var item = {
            id: taskId,
            name: name,
            status: status,
            deadline: deadline,
            notes: notes,
            labels: nLabels,
            subtasks: nSubtasks
        }
        if (name.length > 0) {
            localstate[id] = item
            setTasks(localstate)
            setShowOptions(false)
            setEdit(false)

            setShowPopUp(false)
        }

    }

    const handleLabelAdd = (e) => {
        e.preventDefault();
        if (label.length > 0) {
            setNLabels(nLabels => [...nLabels, label])
            setLabel("")
        }
    }

    const handleLabelRemove = (id) => {
        setNLabels(nLabels.filter((e) => (e !== nLabels[id])))
    }

    const handleSubtaskRemove = (id) => {
        setNSubtasks(nSubtasks.filter((e) => (e !== nSubtasks[id])))
    }

    const handleSubtaskAdd = (e) => {
        e.preventDefault();
        var item = {
            name: subtask,
            status: "active"
        }
        if (subtask.length > 0) {
            setNSubtasks(nSubtasks => [...nSubtasks, item])
            setSubtask("")
        }
    }

    const showTask = (e) => {
        e.preventDefault();

        setName(task.name)
        setStatus(task.status)
        setDeadline(task.deadline)
        setNotes(task.notes)
        setLabels(task.labels)
        setSubtasks(task.subtasks)

        setShowPopUp(true)
    }
    return (
        <div className={task.status === "active" ? 'row unchecked' : "row checked"}>
            <div className="checkbox" onClick={() => handleCheck(id)}></div>
            <div className="name" onClick={(e) => showTask(e)}>{task.name} <span className="date">{task.deadline !== "" ? <p>{task.deadline}</p> : null}</span></div>

            <button onClick={() => showOptions ? setShowOptions(false) : setShowOptions(true)}></button>
            {showOptions ?
                (<div className="options"><button onClick={() => handleEdit(id)}>Edit</button><button onClick={() => handleDelete(id)}>Delete</button></div>)
                : null}
            {showPopUp ?
                (<div className="overlay">
                    {edit ?
                        (
                            <form onSubmit={handleEditSubmit}>
                                <div className="row jc-sb">
                                    <h3>Edit Task</h3>
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
                                            {nLabels.length > 0 ?
                                                nLabels.map((item, index) => (
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
                                    {nSubtasks.length > 0 ?
                                        nSubtasks.map((item, index) => (
                                            <p key={"subtask" + index}>{item.name} <span className="close" onClick={() => handleSubtaskRemove(index)}></span></p>
                                        )) : null
                                    }
                                </div>
                                <input type="text" value={subtask} onChange={(e) => setSubtask(e.target.value)} />
                                <button onClick={(e) => handleSubtaskAdd(e)} className="primary-button mt-10">Add Subtask</button>
                                <div className="block mt-20">
                                    <input type="submit" className="primary-button" value="Edit task" />

                                </div>
                            </form>
                        )
                        : (<div className="white-box">
                            <div className="row jc-sb">
                                <h3>{name}</h3>
                                <button onClick={(e) => handleModalHide(e)} className='close'></button>
                            </div>
                            {task.deadline.length > 0 ?
                                (
                                    <span className="date">
                                        <p>{task.deadline}</p>
                                    </span>
                                ) : null
                            }
                            {labels.length > 0 || notes.length > 0 ?
                                (
                                    <div className="row jc-sb">
                                        {notes.length > 0 ? (
                                            <p className="notes">{notes}</p>
                                        ) : null}

                                        {labels.length > 0 ?
                                            (<div className="col-3 right">
                                                {
                                                    labels.map((item, index) => (
                                                        <p key={"label" + index}>{item} </p>
                                                    ))}
                                            </div>
                                            ) : null
                                        }

                                    </div>
                                ) : null
                            }
                            {subtasks.length > 0 ?
                                (
                                    <div className="subtasks">
                                        <h3 className="blue-text">Subtasks</h3>
                                        {subtasks.map((item, index) => (
                                            <div key={"subtask" + index} className={item.status === "active" ? 'row unchecked' : "row checked"}>
                                                <div className="checkbox" onClick={() => handleCheckInner(id, index)}></div>

                                                <p>{item.name} </p>
                                            </div>
                                        ))}
                                    </div>

                                )
                                : null
                            }
                            <div className="col-3 row jc-sb right">
                                <button onClick={() => handleEdit(id)}>Edit</button><button onClick={() => handleDelete(id)}>Delete</button>
                            </div>
                        </div>)
                    }

                </div>)
                : null}
        </div>
    )
}
export default Task;