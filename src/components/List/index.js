import React, { Component, Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import ListItem from './Item';
import './styles.css';

export default class List extends Component {
  render() {
    return (
      <div>
        {
        this.props.dates.map(date => (
          <Fragment>
            <span className="list__header">{date}</span>
            <ul className="list__container">
              {
              this.props.historyItems.map((item) => {
                if (moment(item.node.committedDate).format(this.props.timeFormat) === date) {
                  return (
                    <ListItem
                      message={item.node.messageHeadline}
                      user={item.node.author.user.login}
                    />
                  );
                }
                return null;
              })
            }
            </ul>
          </Fragment>
          ))
        }
      </div>
    );
  }
}

List.propTypes = {
  dates: PropTypes.string.isRequired,
  historyItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  timeFormat: PropTypes.string.isRequired,
};
