import React from 'react';
import PropTypes from 'prop-types';

const TodosCheckAll = props => {
    return (
        <div>
            <label>
            <input
              type="checkbox"
              onChange={props.checkAllTodos}
              checked={!props.anyRemaining()}
            />
            Check All
            </label>
        </div>
    );
};

TodosCheckAll.propTypes = {
    anyRemaining: PropTypes.func.isRequired,
    checkAllTodos: PropTypes.func.isRequired
};

export default TodosCheckAll;