// @flow
import * as React from 'react';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Routes from './Routes';
import './App.css';
import {
    Header,
    HeaderBrand,
    HeaderNavLink,
    HeaderWrapperNavLinks,
} from '../commons/header/Header';

const client = new ApolloClient({
    uri: 'https://api.github.com',
});

const AppHeader = () => (
    <Header>
        <HeaderBrand to="/">
            <img src="https://i.imgur.com/DZaKNqP.png" alt="issueai-logo" />
        </HeaderBrand>

        <HeaderWrapperNavLinks>
            <HeaderNavLink to="/quem-somos">Quem Somos?</HeaderNavLink>
            <HeaderNavLink to="/junte-se">Junte-se!</HeaderNavLink>
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
