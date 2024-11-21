// src/App.js
import React from 'react';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
    return (
        <div>
            <h1>Gestor de Tareas</h1>
            <TaskList />
        </div>
    );
};

export default App;
