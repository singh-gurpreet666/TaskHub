// import React, { useContext, useState } from 'react'
// import TaskContext from '../context/tasks/TaskContext'

// function AddTasks(props) {
//     const context = useContext(TaskContext);
//     const {addTask } = context;
//     const [task,setTask] = useState({title:"",description:"",tag:"default"});
//     const handleClick = (e) =>{
//         e.preventDefault();
//         if(task.title.length<=5||task.description.length<=10){
//         props.showAlert("Enter a valid task","warning")
//         return ;}
//         addTask(task.title,task.description,task.tag);
//         props.showAlert("Task added Successfully","success");
//             setTask({ title: "", description: "", tag: "default" });

//     }

//     const onChange = (e)=>{
//         setTask({...task,[e.target.name]:e.target.value})
//     }

// return (
//         <div className="add-task-container">
//             <div className='add-task-box'>
//                 <h1 className='add-task-title'>Add New Task</h1>
//                 <form>
//                     <div className="form-group">
//                         <label htmlFor="title" className="form-label">Title</label>
//                         <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="description" className="form-label">Description</label>
//                         <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="tag" className="form-label">Tag</label>
//                         <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
//                     </div>
//                     <button type="submit" className="btn btn-primary btn-block" onClick={handleClick}>Add Task</button>
//                 </form>
//             </div>
//         </div>
//     );
// };


// export default AddTasks


import React, { useContext, useState } from 'react';
import TaskContext from '../context/tasks/TaskContext';

function AddTasks(props) {
    const context = useContext(TaskContext);
    const { addTask } = context;
    const [task, setTask] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        if (task.title.length <= 5 || task.description.length <= 10) {
            props.showAlert("Enter a valid task", "warning");
            return;
        }
        addTask(task.title, task.description, task.tag);
        props.showAlert("Task added Successfully", "success");
        // Reset the input fields
        setTask({ title: "", description: "", tag: "" });
    };

    const onChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    return (
        <div className="add-task-container">
            <div className='add-task-box'>
                <h1 className='add-task-title'>Add New Task</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={task.title} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={task.description} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={task.tag} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" onClick={handleClick}>Add Task</button>
                </form>
            </div>
        </div>
    );
}

export default AddTasks;
