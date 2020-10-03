import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodosRemaining extends Component {
    render() {
        return (
            <div>{this.props.remaining} items left</div>
        );
    }
}

export default TodosRemaining;


TodosRemaining.propTypes = {
    remaining : PropTypes.number.isRequired,
}