// @flow
import * as React from 'react';
import type { Repository } from '../commons/repository/repository';
import getRepositories from '../../lib/github';
import { Link } from 'react-router-dom';

import Routes from './Routes';
import './App.css';

type AppState = {
    repositoryList: Repository[],
};

export default class App extends React.Component<void, AppState> {
    state = {
        repositoryList: [],
    };

    componentDidMount() {
        getRepositories().then(data => {
            this.setState({ repositoryList: data });
        });
    }

    render() {
        const { repositoryList } = this.state;
        return (
            <div>
                <div bp="flex vertical-center" className="header">
                    <h1 bp="fill">
                        <Link to="/" className="main-link">
                            <span>IssueAi</span>
                        </Link>
                    </h1>
                    <Link to="/quem-somos" className="header-link">
                        <h3 bp="fit">Quem Somos?</h3>
                    </Link>
                    <Link to="/contribuir" className="header-link">
                        <h3 bp="fit">Contribuir</h3>
                    </Link>
                </div>
                <div className="content">
                    <Routes repositoryList={repositoryList} />
                </div>
            </div>
        );
    }
}
