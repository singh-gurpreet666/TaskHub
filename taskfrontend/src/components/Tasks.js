import React, { useContext, useEffect, useRef, useState } from 'react'
import TaskContext from '../context/tasks/TaskContext'
import Taskitem from './Taskitem.js'
import AddTasks from './AddTasks';
import { useNavigate } from 'react-router-dom';

function Tasks(props) {
  let navigate = useNavigate();
  const context = useContext(TaskContext);
  const { tasks, getAllTasks ,editTask} = context;
  const ref = useRef('');
  const refClose=useRef('');
  const [task, setTask] = useState({ id:"",etitle: "", edescription: "", etag: "default" });
  useEffect(() => {
      if(localStorage.getItem('token')){
        getAllTasks();
      }
      else{
        navigate('/login');
      } 
  }, [])
  const updateTask = (currentTask) => {
    ref.current.click();
    setTask({id:currentTask._id ,etitle: currentTask.title, edescription: currentTask.desription, etag: currentTask.tag })
  }
  const handleClick = (e) => {
    editTask(task.id,task.etitle,task.edescription,task.etag);
    refClose.current.click();
  }
  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value })
  }
  return (
    <>
      <AddTasks showAlert={props.showAlert}/>
      <button type="button" className="btn btn-primary my-3 d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
        Edit Task
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Task</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={task.etitle} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={task.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={task.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button  ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Task</button>
            </div>
          </div>
        </div>
      </div>
      <h2 className='my-3'>Your Tasks</h2>
      <div className='container'>
        {tasks.length===0 && 'No tasks to display'}
      </div>
       <div className='row my-3 caring'>
  {tasks && tasks.map((task, index) => {
    const backgroundColor = index % 3 === 0 ? '#f2b787' : index % 3 === 1 ? '#de8c8c' : '#9eeab6';
    return (
        <Taskitem key={task._id} task={task} updateTask={updateTask} showAlert={props.showAlert} backgroundColor={backgroundColor} />
    );
  })}
</div>

    </>
  )
}

export default Tasks