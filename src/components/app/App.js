// @flow
import * as React from 'react';

import Routes from './Routes';
import './App.css';
import { Header, HeaderBrand, HeaderNavLink } from '../commons/header/Header';

const AppHeader = () => (
    <Header>
        <HeaderBrand to="/">IssueAi</HeaderBrand>
        <HeaderNavLink to="/quem-somos">Quem Somos?</HeaderNavLink>
        <HeaderNavLink to="/contribuir">Contribuir</HeaderNavLink>
    </Header>
);

const App = () => (
    <div>
        <AppHeader />
        <div className="content">
            alloo - {process.env.API_TOKEN}
            <Routes />
        </div>
    </div>
);

export default App;
