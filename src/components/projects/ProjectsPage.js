// @flow
import * as React from 'react';

import type { Repository } from '../commons/repository/repository';
import getRepositories from '../../lib/github';
import RepositoryGrid from '../commons/repository/RepositoryGrid';

import './ProjectsPage.css';

let cursor;

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
        cursor = null;
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
                <div bp="grid vertical-center" className="footer">
                    <button
                        type="button"
                        bp="4 offset-5"
                        className="see-more"
                        onClick={this.updateRepositoryList}>
                        Ver mais
                    </button>
                </div>
            </div>
        );
    }
}
