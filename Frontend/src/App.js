import { Routes, Route } from "react-router-dom";
import Task from "./Page/Task";
import ToDo from "./Page/ToDo";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div>
 <Navbar></Navbar>
      <Routes>
        <Route path="" element={<Task/>} />
        <Route path="task" element={<Task/>} />
        <Route path="to-do-list" element={<ToDo/>} />
      </Routes>
      <ToastContainer></ToastContainer> 
    </div>
  );
}

export default App;
