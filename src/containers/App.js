import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import moment from 'moment';
import './styles.css';
import List from '../components/List';
import Search from '../components/Search';

class App extends Component {
  constructor(props) {
    super(props);
    this.timeFormat = 'MMMM DD, YYYY';
  }

  getAllDates = items => [...new Set(items.map(item => moment(item.node.committedDate).format(this.timeFormat)))];

  query = () => null;

  render() {
    return (
      <div className="App">
        <Query query={HELLO_QUERY}>
          {((props) => {
            const { data, loading, error } = props;
            if (loading) {
              return <div>Loading</div>;
            }

            if (error) {
              return <div>An unexpected error occurred</div>;
            }
            return (
              <div>
                <Search onChange={this.query} />
                {
                  data.repository ?
                    <List
                      historyItems={data.repository.ref.target.history.edges}
                      timeFormat={this.timeFormat}
                      dates={this.getAllDates(data.repository.ref.target.history.edges)}
                    /> : null
                }
              </div>
            );
          })}
        </Query>
      </div>
    );
  }
}

const HELLO_QUERY = gql`
{
  repository(owner: "facebook", name: "create-react-app") {
    ref(qualifiedName: "next") {
      target {
        ... on Commit {
          id
          history(first: 10) {
            edges {
              node {
                messageHeadline
                oid
                message
                committedDate
                author {
                  user {
                    login
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export default App;
