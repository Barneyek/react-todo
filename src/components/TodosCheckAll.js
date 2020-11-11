import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';


const TodosCheckAll = inject('TodoStore')(observer(props => {
    return (
        <div>
          <label>
              <input
                type="checkbox"
                onChange={props.TodoStore.checkAllTodos}
                checked={!props.TodoStore.anyRemaining } 
              />
              Check All
          </label>
        </div>
    );
}));


TodosCheckAll.wrappedComponent.propTypes = {
  TodoStore: PropTypes.object.isRequired,
};

export default TodosCheckAll;
