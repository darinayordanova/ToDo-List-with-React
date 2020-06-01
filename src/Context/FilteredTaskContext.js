import React, { useEffect, useState, createContext } from "react";

export const FilteredTaskContext = createContext();

export function FilteredTaskProvider(props) {
    const [filter, setFilter] = useState(false);
    
    return (
        <FilteredTaskContext.Provider value={[filter, setFilter]}>
            {props.children}
        </FilteredTaskContext.Provider>);
}

