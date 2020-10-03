import React from 'react';
import PropTypes from 'prop-types';

const TodosClearCompleted = props => {
    return (
        <div>
            <button onClick={props.clearCompleted}>Clear completed</button>
        </div>
    );
};

TodosClearCompleted.propTypes = {
    clearCompleted: PropTypes.func.isRequired
};

export default TodosClearCompleted;