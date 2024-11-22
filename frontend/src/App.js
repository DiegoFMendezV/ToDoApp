// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import EditTask from './components/EditTask';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <TaskList/> }/>
                    <Route path='/create' element={ <CreateTask/> }/>
                    <Route path='/edit/:id' element={ <EditTask/> }/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
