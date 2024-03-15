import React, { useState } from "react";
import TaskContext from "./TaskContext";

const TaskState = (props) => {
    const host = "https://taskhub-uvor.onrender.com"
    const tasksInitial = []
    const [tasks, setTasks] = useState(tasksInitial);

    // get all tasks 
    const getAllTasks = async () => {
        const response = await fetch(`${host}/api/tasks.js/fetchalltasks`, { 
            method: 'GET', 
            headers: new Headers({
                "Content-type": "application/json",
                "auth-token": localStorage.getItem('token')
            })
          });
        const json = await response.json();
        setTasks(json)
    }

    //add a task
    const addTask = async (title, description, tag) => {
        // TODO API call
        const response = await fetch(`${host}/api/tasks.js/addtask`, {
            method: 'POST',
            headers: new Headers({
                "Content-type": "application/json",
                "auth-token": localStorage.getItem('token')
            }),
            body: JSON.stringify({ title, description, tag })
        });
        // console.log("adding a new task")
        let task = await response.json();
        setTasks(tasks.concat(task))
    }

    //delete a task
    const deleteTask = async(id) => {
        //TODO:API Call
        const url = `${host}/api/tasks.js/deletetask/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: new Headers({
                "Content-type": "application/json",
                "auth-token": localStorage.getItem('token')
            })
        });
        const json = await response.json();
        const newTask = tasks.filter((task) => task._id!== id );
        setTasks(newTask);
    }

    //edit a task
    const editTask = async (id, title, description, tag) => {
        //API call
        const url = `${host}/api/tasks.js/updatetask/${id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: new Headers({
                "Content-type": "application/json",
                "auth-token": localStorage.getItem('token')
            }),
            body: JSON.stringify({ title, description, tag })
        });
        //Logic to edit in client
        let newTasks=JSON.parse(JSON.stringify(tasks));
        for (let index = 0; index < tasks.length; index++) {
            const element = tasks[index];
            if (element._id === id) {
                newTasks[index].description = description;
                newTasks[index].tag = tag;
                newTasks[index].title = title;
                break;
            }
        }
        setTasks(newTasks)
    }

    return (
        <TaskContext.Provider value={{ tasks, addTask, deleteTask, editTask, getAllTasks }}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;