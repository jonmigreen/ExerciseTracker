import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const navbar= () =>{
  return (
    <div id="NavContainer">
      <nav id="navbar">
        <ul> 
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">Add</Link>
          </li>
        </ul>
        </nav>
      </div>
  );
}
export default navbar;