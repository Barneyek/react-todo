import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TodosRemaining from './TodosRemaining';
import TodoItem from './TodoItem';
import TodosCheckAll from './TodosCheckAll';
import TodosFiltered from './TodosFiltered';
import TodosClearCompleted from './TodosClearCompleted';
import { inject, observer } from 'mobx-react';

@inject('TodoStore')
@observer
class App extends Component {
  render() {
    const TodoStore = this.props.TodoStore;
    return (
      <div id="app" className="container">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
        </header>
        <div className="todo-container">
          <input type="text" className="todo-input" placeholder="What needs to be done" ref={TodoStore.todoInput} onKeyUp={TodoStore.addTodo} />
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
          {TodoStore.todosFiltered.map(todo =>
            <TodoItem key={todo.id} todo={todo} />
          )}
          </ReactCSSTransitionGroup>
        </div>
        <div className="extra-container">
          <TodosCheckAll />
          <TodosRemaining />
        </div>
        <div className="extra-container">
          <TodosFiltered />
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
          {TodoStore.todosCompletedCount > 0 &&
            <TodosClearCompleted />
          }
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default App;
