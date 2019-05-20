// @flow
import * as React from 'react';

import Routes from './Routes';
import './App.css';
import { Header, HeaderBrand, HeaderNavLink } from '../commons/header/Header';

const AppHeader = () => (
    <Header>
        <HeaderBrand to="/">
            <img src="https://i.imgur.com/DZaKNqP.png" alt="issueai-logo" />
        </HeaderBrand>
        <HeaderNavLink to="/quem-somos">Quem Somos?</HeaderNavLink>
        <HeaderNavLink to="/contribuir">Contribuir</HeaderNavLink>
    </Header>
);

const App = () => (
    <div>
        <div className="header">
            <AppHeader />
        </div>
        <div className="content">
            <Routes />
        </div>
    </div>
);

export default App;
