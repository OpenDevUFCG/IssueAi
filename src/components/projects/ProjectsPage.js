// @flow
import * as React from 'react';

import type { Repository } from '../commons/repository/repository';
import getRepositories from '../../lib/github';
import RepositoryGrid from '../commons/repository/RepositoryGrid';

import './ProjectsPage.css';

let cursor = null;

type AppState = {
    repositoryList: Repository[],
};

function updateListState(data: Repository[]) {
    return (state: AppState) => ({
        repositoryList: [...state.repositoryList, ...data],
    });
}

export default class ProjectsPage extends React.Component<void, AppState> {
    state = {
        repositoryList: [],
    };

    componentDidMount() {
        this.updateRepositoryList();
    }

    updateRepositoryList = () => {
        getRepositories(cursor).then(({ repos, lastCursor }) => {
            this.setState(updateListState(repos));
            cursor = lastCursor;
        });
    };

    render() {
        const { repositoryList } = this.state;
        return (
            <div>
                <RepositoryGrid repositories={repositoryList} />
                <div bp="grid 4 vertical-center" className="footer">
                    <button
                        type="button"
                        bp="1 offset-2"
                        className="show-more"
                        onClick={this.updateRepositoryList}>
                        <h2>Ver mais</h2>
                    </button>
                </div>
            </div>
        );
    }
}
