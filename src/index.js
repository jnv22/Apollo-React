import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import App from '../src/containers/App';
import { TOKEN } from './config';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  request: async (operation) => {
    operation.setContext({
      headers: {
        Authorization: `bearer ${TOKEN}`,
      },
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.error(graphQLErrors); // eslint-disable-line no-console
    }
    if (networkError) {
      console.error(networkError); // eslint-disable-line no-console
    }
  },
});

// Apollo Client
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
