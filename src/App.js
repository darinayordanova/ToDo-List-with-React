import React from 'react';
import ToDoList from './ToDoList/ToDoList';
import Navigation from './Navigation/Navigation';
import Filter from './Filter/Filter';
import { ToDoListProvider } from "./Context/ToDoListContext";
import { FilteredTaskProvider } from "./Context/FilteredTaskContext";
import './App.css';
function App() {
  return (
    <FilteredTaskProvider>
      <ToDoListProvider>
        <div className="App">
          <h1 className='logo'>My React ToDo List</h1>
          <Navigation />
          <Filter />
          <ToDoList />

        </div>
        <div className="footer">To Do List - 2020</div>
      </ToDoListProvider>
    </FilteredTaskProvider>
  );
}

export default App;
