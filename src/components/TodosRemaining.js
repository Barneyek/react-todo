import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

const TodosRemaining = inject('TodoStore')(observer(props => {
    return (
        <div>{props.TodoStore.remaining} items left</div>
    );
}));

export default TodosRemaining;

TodosRemaining.wrappedComponent.propTypes = {
    remaining : PropTypes.number.isRequired,
}
