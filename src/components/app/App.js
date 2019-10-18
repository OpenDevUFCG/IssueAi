// @flow
import * as React from 'react';

import Routes from './Routes';
import './App.css';
import {
    Header,
    HeaderBrand,
    HeaderNavLink,
    HeaderWrapperNavLinks,
} from '../commons/header/Header';

const AppHeader = () => (
    <Header>
        <HeaderBrand to="/">
            <img src="https://i.imgur.com/DZaKNqP.png" alt="issueai-logo" />
        </HeaderBrand>

        <HeaderWrapperNavLinks>
            <HeaderNavLink to="/quem-somos">Quem Somos?</HeaderNavLink>
            <HeaderNavLink to="/junte-se">Junte-se!</HeaderNavLink>
            <HeaderNavLink to="/mentores">Mentores</HeaderNavLink>
        </HeaderWrapperNavLinks>
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
