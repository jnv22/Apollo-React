import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export default class SearchBar extends Component {
  render() {
    return (
      <input className="searchBar" onChange={this.props.onChange} />
    );
  }
}


SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
};
