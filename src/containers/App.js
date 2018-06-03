import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import moment from 'moment'
import logo from '../logo.svg'
import '../styles/App.css'
import List from '../components/List'

class App extends Component {

  getAllDates = (items) => {
    return [...new Set(items.map(item => {
      return moment(item.node.committedDate).format("MMMM Do YYYY");
    }))]
  }
  render() {
    return (
      <div className="App">
          <img src={logo} className="App-logo" alt="logo" />
          <Query query={HELLO_QUERY}>
            {props => {
              console.log(props)
              const { data, loading, error, refetch } = props
              return (
                <div>
                  {
                    props.data.repository ? 
                    <List 
                    historyItems={props.data.repository.ref.target.history.edges}
                    dates={this.getAllDates(props.data.repository.ref.target.history.edges)}
                    />: null
                  }
                  </div>
              )
            }}
          </Query>
      </div>
    )
  }
}

const HELLO_QUERY = gql`
{
  repository(owner: "facebook", name: "create-react-app") {
    ref(qualifiedName: "master") {
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
                  name
                  email
                }
              }
            }
          }
        }
      }
    }
  }
}
`
export default App