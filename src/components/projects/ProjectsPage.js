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
    emptyRequest: boolean,
};

function updateListState(data: Repository[], cursor) {
    return (state: AppState) => ({
        repositoryList: [...state.repositoryList, ...data],
        cursor,
        emptyRequest: !data.length,
    });
}

export default class ProjectsPage extends React.Component<void, AppState> {
    state = {
        repositoryList: [],
        cursor: null,
        loading: true,
        emptyRequest: false,
    };

    componentDidMount() {
        this.updateRepositoryList();
    }

    updateRepositoryList = () => {
        const { cursor } = this.state;
        this.setState({ loading: true });
        getRepositories(cursor).then(({ repos, lastCursor }) => {
            this.setState(updateListState(repos, lastCursor));
            this.setState({ loading: false });
        });
    };

    render() {
        const { emptyRequest, repositoryList, loading } = this.state;
        return (
            <div>
                <RepositoryGrid repositories={repositoryList} />
                <div className="footer">
                    {!emptyRequest && (
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
                    )}
                </div>
            </div>
        );
    }
}
