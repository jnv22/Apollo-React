import React, { Component } from 'react'
import moment from 'moment'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

export default class listContainer extends Component {
  constructor(props) {
    super(props)
    this.dates = [];
    this.state = {
      currentDate: '',
    }
  }

  render() {
    console.log(this.props.dates)
    return (
      <div>
        {
        this.props.dates.map(date => {
          return (
            <div>
            <h1>{date}</h1>
            {
              this.props.historyItems.map(item => {
                if (moment(item.node.committedDate).format("MMMM Do YYYY") === date) {
                  return <h1>{item.node.messageHeadline}</h1> 
                }
              })
            }
            </div>
          )
        })
        }
      </div>
    //   <Query query={date}>
    //   {props => {
    //     console.log(props)
    //     const { data, loading, error, refetch } = props
    //     if (loading) {
    //       return <div>Loading</div>
    //     }

    //     if (error) {
    //       return <div>An unexpected error occurred</div>
    //     }

    //     return (
    //       <div>
    //         <p>What's your name?</p>
    //         <listContainer
    //         />
    //         <h3>{data.hello}</h3>
    //       </div>
    //     )
    //   }}
    // </Query>
    )
  }
}


let date = gql`
{
query getDates(date: 223233) {
  name
  email
  date
}
}
`