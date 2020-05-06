import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component{
  render(){
    return (
      <div id="app" className="container">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
        </header>
        <div className="todo-container">
          <input type="text" className="todo-input" placeholder="What needs to be done" />
        </div>
        <div class="extra-container">
          <label>
            <input type="checkbox" />Check All
          </label>
          <div>2 items left</div>
        </div>
        <div class="extra-container">
          <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
          </div>
          <div>
            <button>Clear completed</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
