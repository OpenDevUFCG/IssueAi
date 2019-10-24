// @flow
import * as React from 'react';

import type { Repository } from '../commons/repository/repository';
import getRepositories from '../../lib/github';
import { SortField } from '../../lib/constants';
import type { SortFieldOption } from '../../lib/constants';
import RepositoryGrid from '../commons/repository/RepositoryGrid';

import './ProjectsPage.css';
import OptionBar from './OptionBar';

type AppState = {
    repositoryList: Repository[],
    cursor: string | null,
    loading: boolean,
    emptyRequest: boolean,
    sort: SortFieldOption,
};

function updateListState(data: Repository[], cursor, hasNextPage) {
    return (state: AppState) => ({
        repositoryList: [...state.repositoryList, ...data],
        cursor,
        hasNextPage,
    });
}

const initialState = {
    repositoryList: [],
    cursor: null,
    loading: true,
    hasNextPage: false,
    sort: SortField.STARS_DESC,
};

export default class ProjectsPage extends React.Component<void, AppState> {
    state = initialState;

    componentDidMount() {
        this.updateRepositoryList();
    }

    updateRepositoryList = () => {
        const { cursor, sort } = this.state;
        this.setState({ loading: true });
        getRepositories(cursor, { sort }).then(
            ({ repos, lastCursor, hasNextPage }) => {
                this.setState(updateListState(repos, lastCursor, hasNextPage));
                this.setState({ loading: false });
            }
        );
    };

    handleSortChange = (sort: SortFieldOption) => {
        this.setState(
            {
                ...initialState,
                sort,
            },
            () => this.updateRepositoryList()
        );
    };

    render() {
        const { hasNextPage, repositoryList, loading, sort } = this.state;
        return (
            <div className="projects-container">
                <OptionBar sort={sort} onChange={this.handleSortChange} />
                <RepositoryGrid repositories={repositoryList} />
                <div className="footer">
                    {hasNextPage && (
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
