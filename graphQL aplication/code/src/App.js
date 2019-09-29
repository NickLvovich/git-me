import React from 'react';
import 'styled-components/macro';
import Login from './Login';
import Sidebar from './components/Sidebar';

import {createGlobalStyle } from 'styled-components';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Column from './components/Column';

// get the authentication token from local storage if it exists
const accessToken = localStorage.getItem('token');


const httpLink = new HttpLink ({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const Global = createGlobalStyle({
  body: {
    backgroundColor: '#fff',
    color: '#444',
    fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI"',
    padding: 0,
    margin: 0,
    borderTop: '4px solid rgb(210, 54, 105)',
  },
  '*':{
    boxSizing: 'border-box',
  },
})

function App() {
  return (
    <>
    <Global/>
    { accessToken ? (
      <ApolloProvider client={client}>
        <div css={{
								display: 'grid',
								gridTemplateColumns: '80px repeat(auto-fit, 300px)',
								alignItems: 'start',
								height: 'calc(100vh - 4px)',
								overflow: 'hidden',
							}}>
          <Sidebar/>
          <Column user="Nicklvovich"/>
          <Column user="NeXTs"/>
        </div>
      </ApolloProvider>
      ) : (<Login/>
      )}
    </>
  );
}

export default App;
