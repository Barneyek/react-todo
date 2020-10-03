import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as classnames from 'classnames';

class App extends Component{
  render(){
    return (
      <div id="app" className="container">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
        </header>
        <div className="todo-container">
          <input type="text" className="todo-input" placeholder="What needs to be done" ref={this.todoInput} onKeyUp={this.addTodo}/>
            {this.todosFiltered().map((todo,index)=>
            <div key={todo.id} className="todo-item">
                <div className="todo-item-left">
                    <input type="checkbox" onChange={(event) => this.checkTodo(index)} checked={todo.completed}/>
                    {!todo.editing &&
                        <div
                            className={"todo-item-label " + (todo.completed ? 'completed' : '')}
                            onDoubleClick={(event) => this.editTodo(index,event,todo)}>
                            {todo.title}
                        </div>
                    }
                    {todo.editing &&
                        <input
                            className="todo-item-edit"
                            type="text"
                            autoFocus
                            defaultValue={todo.title}
                            onBlur={(event) => this.doneEdit(todo,index,event)}
                            onKeyUp={ (event )=>{
                                if (event.key === 'Enter' ) {
                                    this.doneEdit(todo,index,event);
                                }   else if (event.key === 'Escape'){
                                    this.cancleEdit(todo,index,event);
                                }
                            }}
                        />
                    }
                </div>
                <div className="remove-item" onClick={(event) => this.deleteTodo(todo.id)}>&times;</div>
            </div>
            )}
        </div>
        <div className="extra-container">
          <label>
            <input type="checkbox" onChange={this.checkAllTodos}/>Check All
          </label>
          <div>{this.remaining()} items left</div>
        </div>
        <div className="extra-container">
          <div>
            <button
              onClick={() => this.updateFilter('all')} 
              className={classnames({'active': this.state.filter === 'all'})}
            >
              All
            </button>
            <button 
              onClick={() => this.updateFilter('active')}
              className={classnames({'active': this.state.filter === 'active'})}
            >
              Active
            </button>
            <button 
              onClick={() => this.updateFilter('completed')}
              className={classnames({'active': this.state.filter === 'completed'})}
            >
              Completed
            </button>
          </div>
          { this.todosCompletedCount() > 0  && 
            <div>
              <button onClick={this.clearCompleted}>Clear completed</button>
            </div>
          }
        </div>
      </div>
    );
  }

  todoInput = React.createRef();
  state = {
      idForTodo: 3,
      beforeEditCache: '',
      filter: 'all',
      todos: [
          {
              'id': 0,
              'title': 'Finish React Screencast',
              'completed': false,
              'editing': false,
          },
          {
              'id': 1,
              'title': 'Take over world',
              'completed': false,
              'editing': false,
          },
          {
              'id': 2,
              'title': 'Eldo',
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
              let todos = [...state.todos];
              let idForTodo = state.idForTodo + 1;

              todos.push({
                  id: idForTodo,
                  title: todoInput,
                  completed: false,
                  editing: false,
              });

              return {
                todos: todos,idForTodo
              };
          });
          this.todoInput.current.value = "";
      }
  }

  deleteTodo = (id) => {
      this.setState(prevstate => ({
         todos : prevstate.todos.filter(item => item.id !== id )
      }));
  }

    checkTodo = (index,event) => {
        this.setState((state, props) => {
            let todos = [...state.todos];
            const newTodo = {...todos[index], completed: !todos[index].completed}
            todos[index] = newTodo;
            return { todos };
        });
    }

    editTodo = (index,event,todo) => {
        this.setState((state, props) => {
            let todos = [...state.todos];
            const newTodo = {...todos[index], editing: !todos[index].completed}
            todos[index] = newTodo;
            return { todos , beforeEditCache: todo.title};
        });
    }

    doneEdit = (todo,index,event) => {
      event.persist();
        this.setState((prevstate, props) => {
            let todos = [...prevstate.todos];
            const newTodo = {...todos[index], editing: todos[index].completed}
            if (event.target.value.trim().length === 0){
                console.log("tak")
                todo.title = prevstate.beforeEditCache;
            }else{
             todo.title = event.target.value;
            }
            todos[index] = newTodo;
            return { todos };
        });
    }

    cancleEdit = (todo,index,event) => {
        event.persist();
        this.setState((prevstate, props) => {
            let todos = [...prevstate.todos];
            const newTodo = {...todos[index], editing: todos[index].completed}
            todo.title = prevstate.beforeEditCache;
            todos[index] = newTodo;
            return { todos };
        });
    }

    remaining = () => {
      return this.state.todos.filter(todo => !todo.completed).length;
    }

    todosCompletedCount = () => {
      return this.state.todos.filter(todo => todo.completed).length;
    }

    
    clearCompleted = () => {
      this.setState((prevstate, props) => {
        return { todos: prevstate.todos.filter(todo => !todo.completed) };
      });
    }

    updateFilter = filter => {
      this.setState({
        filter
      })
    }

    todosFiltered = () => {
      if (this.state.filter === 'all') {
        return this.state.todos;
      } else if (this.state.filter === 'active') {
        return this.state.todos.filter(todo => !todo.completed);
      } else if (this.state.filter === 'completed') {
        return this.state.todos.filter(todo => todo.completed);
      }

      return this.state.todos;
    }

    checkAllTodos = (event) => {
      event.persist();

      this.setState((prevstate, props) => {
          let todos = prevstate.todos;
          todos.forEach((todo) => todo.completed = event.target.checked);
          return { todos };
      });
  }

}

export default App;
