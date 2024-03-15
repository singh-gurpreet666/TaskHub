import React, { useContext } from 'react'
import TaskContext from '../context/tasks/TaskContext'
import Alert from './Alert';

function Taskitem(props) {
    const context = useContext(TaskContext)
    const { deleteTask } = context;
    const { task,updateTask,backgroundColor,data } = props;
    // if(data)
    // console.log(data)
const deletdemo = ()=>{
    // console.log("Demo data cant be modified ")
}

return (
        <div className='col-md-3'>
            <div className="card my-2 task-card" style={{ backgroundColor }}>
                <div className="card-body">
                    <button className="tag-btn" >
                        {task.tag}
                    </button>
                    <div className='d-flex align-items-center'>
                        <h5 className="card-title">{task.title}</h5>
                        <i className="fas fa-trash-alt mx-2 delete-icon" onClick={() => { data==="demo"?deletdemo():deleteTask(task._id) }}></i>
                        <i className="fas fa-edit mx-2 edit-icon" onClick={() => { updateTask(task) }}></i>
                    </div>
                    <p className="card-text">{task.description}</p>
                </div>
            </div>
        </div>
    );


}

export default Taskitem