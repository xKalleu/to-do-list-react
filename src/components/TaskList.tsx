import { useState,useEffect } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import { VscClearAll } from "react-icons/vsc";
import { MdLayersClear } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  const newTask = {
    id: Math.random(),
    title: newTaskTitle,
    isComplete: false,
  };

  function handleCreateNewTask() {
    if (!newTaskTitle) return;

    setTasks((oldState) => [...oldState, newTask]);
    setNewTaskTitle("");
  }

  function handleToggleTaskCompletion(id: number) {
    const newtask = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            isComplete: !task.isComplete,
          }
        : task
    );

    setTasks(newtask);
  }

  function handleRemoveTask(id: number) {
    const tasksFiltered = tasks.filter((task) => task.id !== id);
    setTasks(tasksFiltered);
  }

  function handleCompletedAll() {
    const newtask = tasks.map((task) =>
    task.isComplete !== true
        ? {
            ...task,
            isComplete: !task.isComplete,
          }
        : task
    );

    setTasks(newtask);
  }

  function handleResetAllComplete() {
    const filteredNotCompleted = tasks.filter(task => task.isComplete !== true)
    setTasks(filteredNotCompleted)
  }

  function handleResetAll() {
    setTasks([])
  }

  return (
    <section className="task-list container">
      <header>
        <h2>My Tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
          <div className="options-task">
            <div>
              <button type="button" onClick={() => handleCompletedAll()}>
                <FaCheckDouble size={16} /> 
              </button>
              <span>Completed All</span>              
            </div>

            <div>
              <button type="button" onClick={() => handleResetAllComplete()}>
                <MdLayersClear size={16} /> 
              </button>
              <span>Clear done</span>              
            </div>

            <div>
              <button type="button" onClick={() => handleResetAll()}>
                <VscClearAll size={16} /> 
              </button>
              <span>Clear All</span>              
            </div>
          </div>
      </main>
    </section>
  )
}