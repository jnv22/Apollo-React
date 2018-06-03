import React from 'react'
import ReactDOM from 'react-dom'
import '../src/styles/index.css'
import App from '../src/containers/App'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  request: async (operation) => {
    const token = ''
    operation.setContext({
      headers: {
        Authorization: `bearer ${token}`
      }
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log(graphQLErrors);
    }
    if (networkError) {
      console.log(networkError);
    }
  },
  // clientState: {
  //   defaults: {
  //     isConnected: true
  //   },
  //   resolvers: {
  //     Mutation: {
  //       updateNetworkStatus: (_, { isConnected }, { cache }) => {
  //         cache.writeData({ data: { isConnected }});
  //         return null;
  //       }
  //     }
  //   }
  // },
  cacheRedirects: {
    Query: {
      getDates: (_, args, { getCacheKey }) => {
        console.log(args);
        args.repository.ref.target.history.map(item => 
          getCacheKey({ '__typename': 'GitTimestamp', date: item.id }))
      }
    },
  }
});

//Apollo Client
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
)
