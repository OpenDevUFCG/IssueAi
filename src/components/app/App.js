// @flow
import * as React from 'react';
import type { Repository } from '../commons/repository/repository';
import RepositoryGrid from '../commons/repository/RepositoryGrid';
import getOrgRepositories from '../../lib/github';

import './App.css';

type AppState = {
    repositoryList: Repository[],
};

export default class App extends React.Component<void, AppState> {
    state = {
        repositoryList: [],
    };

    componentDidMount() {
        getOrgRepositories().then(data => {
            this.setState({ repositoryList: data });
        });
    }

    render() {
        const { repositoryList } = this.state;
        return (
            <div>
                <div bp="flex vertical-center" className="header">
                    <h1 bp="fill">IssueAi</h1>
                    <a href="#!" className="header-link">
                        <h3 bp="fit">Quem Somos?</h3>
                    </a>
                    <a href="#!" className="header-link">
                        <h3 bp="fit">Contribuir</h3>
                    </a>
                </div>
                <div className="content">
                    <RepositoryGrid repositories={repositoryList} />
                </div>
            </div>
        );
    }
}
