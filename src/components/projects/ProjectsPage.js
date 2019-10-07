// @flow
import * as React from 'react';

import type { Repository } from '../commons/repository/repository';
import getRepositories from '../../lib/github';
import RepositoryGrid from '../commons/repository/RepositoryGrid';

import './ProjectsPage.css';

type AppState = {
    repositoryList: Repository[],
    cursor: string | null,
    loading: boolean,
};

function updateListState(data: Repository[], cursor) {
    return (state: AppState) => ({
        repositoryList: [...state.repositoryList, ...data],
        cursor,
    });
}

export default class ProjectsPage extends React.Component<void, AppState> {
    state = {
        repositoryList: [],
        cursor: null,
        loading: true,
    };

    componentDidMount() {
        this.updateRepositoryList();
    }

    updateRepositoryList = () => {
        const { cursor, loading } = this.state;
        this.setState({ loading: true });
        getRepositories(cursor).then(({ repos, lastCursor }) => {
            this.setState(updateListState(repos, lastCursor));
            this.setState({ loading: false });
        });
    };

    render() {
        const { repositoryList, loading } = this.state;
        return (
            <div>
                <RepositoryGrid repositories={repositoryList} />
                <div className="footer">
                    <button
                        type="button"
                        className="show-more-btn"
                        onClick={this.updateRepositoryList}>
                        {loading ? (
                            <img className="loader" alt="loader" />
                        ) : (
                            <h2 className="show-more-btn-text">Ver mais</h2>
                        )}
                    </button>
                </div>
            </div>
        );
    }
}
