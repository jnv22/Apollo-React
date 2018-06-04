import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

export default class listItem extends Component {
  render() {
    return (
      <li className="listItem__container">
        <span className="listItem__commitMessage">{this.props.message}</span>
        <span className="listItem__commitUser"><b>{this.props.user}</b> commited</span>
      </li>
    );
  }
}

listItem.propTypes = {
  message: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

