import React, { useState, useContext } from 'react';
import { FilteredTaskContext } from "../Context/FilteredTaskContext";


export default function Filter() {
    const [filter, setFilter] = useContext(FilteredTaskContext);

    const handleCheck = () => {
        setFilter(!filter)
    }
    return (
        <div className="row jc-sb">
            <div>
                Hide completed tasks
            <div className="container">
                    <label className="switch" htmlFor="checkbox" >
                        <input type="checkbox" id="checkbox" onChange={() => handleCheck()} />
                        <div className="slider round"></div>
                    </label>
                </div>
            </div>
        </div>
    )
}
