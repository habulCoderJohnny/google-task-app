import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar bg-green-500 text-white">
        <div className="flex-2">
          <Link to='/' className="btn btn-ghost text-xl mt-[-20px]">
          <img className='w-16' src="https://play-lh.googleusercontent.com/pjUulZ-Vdo7qPKxk3IRhnk8SORPlgSydSyYEjm7fGcoXO8wDyYisWXwQqEjMryZ_sqK2=w240-h480-rw" alt="" />My Daily Task</Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0 ">

          <li><Link to='to-do-list'>TO DO</Link></li>
          <li><Link to='task'>TASK</Link></li>
          </ul>
        </div>
      </div>
    );
};

export default Navbar;