// @flow
import * as React from 'react';

import { ApolloClient, ApolloLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import Routes from './Routes';
import './App.css';
import {
    Header,
    HeaderBrand,
    HeaderNavLink,
    HeaderWrapperNavLinks,
} from '../commons/header/Header';

const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
});

const authLink = new ApolloLink((operation, forward) => {
    // Retrieve the authorization token from env variable
    const token = process.env.GITHUB_TOKEN || '';

    // Use the setContext method to set the HTTP headers.
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : '',
        },
    });

    // Call the next link in the middleware chain.
    return forward(operation);
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const AppHeader = () => (
    <Header>
        <HeaderBrand to="/">
            <img src="https://i.imgur.com/DZaKNqP.png" alt="issueai-logo" />
        </HeaderBrand>

        <HeaderWrapperNavLinks>
            <HeaderNavLink to="/quem-somos">Quem Somos?</HeaderNavLink>
            <HeaderNavLink to="/junte-se">Junte-se!</HeaderNavLink>
            <HeaderNavLink to="/hacktoberfest">Hacktoberfest</HeaderNavLink>
            <HeaderNavLink to="/mentores">Mentores</HeaderNavLink>
        </HeaderWrapperNavLinks>
    </Header>
);

const App = () => (
    <ApolloProvider client={client}>
        <div className="header">
            <AppHeader />
        </div>
        <div className="content">
            <Routes />
        </div>
    </ApolloProvider>
);

export default App;
