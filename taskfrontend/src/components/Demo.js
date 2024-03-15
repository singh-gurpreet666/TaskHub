import React from 'react'
import { useState } from 'react';
import {Link} from "react-router-dom"
import Taskitem from './Taskitem';
const Demo = (props) => {
    const [tasks,]=useState([{
    "_id": "61",
  "title": "MY First Task",
  "description": "I am adding my first task",
  "tag":'Important'
},
{
    "_id": "62",
  "title": "MY Second Task",
  "description": "Happy to see This is working fine",
    "tag":'Personal'

},
{
    "_id": "63",
  "title": "Update Website UI",
  "description": "Enhance the user interface of the website by improving layout",
    "tag":'Work'

  
},
{
  "_id": "64",
  "title": "Fix Login",
  "description": "Resolve authentication issues in the login system to ensure secure access for users",
    "tag":'Office'

},
{
    "_id": "65",
  "title": "Optimize Database Queries",
  "description": "Review and optimize database queries to improve performance and reduce load times for web pages.",
    "tag":'Important'

},
{
    "_id": "66",
  "title": "Conduct User Testing",
  "description": "Gather feedback from users through testing sessions to identify usability issues and areas for improvement.",
    "tag":'Work'

}])
    const onChange = (e) => {
  }

    function updateTask(){
                props.showAlert("Please Sign Up to Add your custom Tasks","warning")

    }


  return (
    <>
        <div className="add-task-container">
            <div className='add-task-box'>
                <h1 className='add-task-title'>Add New Task</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                    </div>
                                <Link className="btn btn-primary mx-1" to="/login" role="button">Add Task</Link>

                </form>
            </div>
            </div>
            <h2 className='my-3'>Your Tasks(demo tasks cant be modified or deleted)</h2>
      <div className='container'>
        {tasks.length===0 && 'No tasks to display'}
      </div>
       <div className='row my-3 caring'>
  {tasks && tasks.map((task, index) => {
    const backgroundColor = index % 3 === 0 ? '#f2b787' : index % 3 === 1 ? '#de8c8c' : '#9eeab6';
    return (
        <Taskitem key={task._id} task={task} updateTask={updateTask} showAlert={props.showAlert} backgroundColor={backgroundColor} data="demo"/>
    );
  })}
</div>

        </>
    );
}

export default Demo
