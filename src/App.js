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
          <input type="text" className="todo-input" placeholder="What needs to be done" ref={this.todoInput} onKeyUp={this.addTodo}/>
            {this.state.todos.map((todo,index)=>
            <div key={todo.id} className="todo-item">
                <div className="todo-item-left">
                    <input type="checkbox" />
                    <div className="todo-item-label">{todo.title}</div>
                </div>
                <div className="remove-item">&times;</div>
            </div>
            )}
        </div>
        <div className="extra-container">
          <label>
            <input type="checkbox" />Check All
          </label>
          <div>2 items left</div>
        </div>
        <div className="extra-container">
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

  todoInput = React.createRef();
  state = {
      todos: [
          {
              'id': 1,
              'title': 'Finish React Screencast',
              'completed': false,
              'editing': false,
          },
          {
              'id': 2,
              'title': 'Take over world',
              'completed': false,
              'editing': false,
          }
      ]
  }

  addTodo = event =>{
      if (event.key === 'Enter'){
          const todoInput = this.todoInput.current.value;

          if (todoInput.trim().length === 0){
              return;
          }
          
          this.setState((state, props) => {
              let todos = state.todos;
              let idForTodo = state.idForTodo + 1;

              todos.push({
                  id: idForTodo,
                  title: todoInput,
                  completed: false,
                  editing: false,
              });

              return {
                todos: todos,
              };
          });
          this.todoInput.current.value = "";
      }
  }
}

export default App;
