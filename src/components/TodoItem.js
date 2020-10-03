import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = props => {
    return (
        <div key={props.id}className="todo-item">
            <div className="todo-item-left">
                <input type="checkbox" onChange={(event) => props.checkTodo(props.index)} checked={props.todo.completed}/>
                {!props.todo.editing &&
                    <div
                        className={"todo-item-label " + (props.todo.completed ? 'completed' : '')}
                        onDoubleClick={(event) => props.editTodo(props.todo, props.index, event)}
                    >
                        {props.todo.title}
                    </div>
                }
                {props.todo.editing &&
                    <input
                        className="todo-item-edit"
                        type="text"
                        autoFocus
                        defaultValue={props.todo.title}
                        onBlur={(event) => props.doneEdit(props.todo,props.index,event)}
                        onKeyUp={ (event )=>{
                            if (event.key === 'Enter' ) {
                                props.doneEdit(props.todo,props.index,event);
                            }   else if (event.key === 'Escape'){
                                props.cancleEdit(props.todo,props.index,event);
                            }
                        }}
                    />
                }
            </div>
            <div className="remove-item" onClick={(event) => props.deleteTodo(props.todo.id)}>&times;</div>
        </div>
    );
};

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    checkTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    doneEdit: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;