import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Home from './components/Home.js';
import About from './components/About.js';
import TaskState from './context/tasks/TaskState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import Demo from './components/Demo.js';
import { useState } from 'react';

function App() {
  const [alert,setAlert] = useState(null);
  const showAlert = (message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null)
    },2000)
  }
  return (
    <>
      <TaskState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert}/>}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route path="/login" element={<Login showAlert={showAlert}/>}></Route>
              <Route path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
              <Route path="/demo" element={<Demo showAlert={showAlert}/>}></Route>
            </Routes>
          </div>
        </Router>
      </TaskState>
    </>
  );
}

export default App;