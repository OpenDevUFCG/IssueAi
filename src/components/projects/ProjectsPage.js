// @flow
import * as React from 'react';

import type { Repository } from '../commons/repository/repository';
import getRepositories from '../../lib/github';
import RepositoryGrid from '../commons/repository/RepositoryGrid';

import './ProjectsPage.css';

type AppState = {
    repositoryList: Repository[],
    cursor: string | null,
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
        load: 'false',
    };

    componentDidMount() {
        this.updateRepositoryList();
    }

    updateRepositoryList = () => {
        const { cursor, load } = this.state;
        this.setState({ load: 'true' });
        getRepositories(cursor).then(({ repos, lastCursor }) => {
            this.setState(updateListState(repos, lastCursor));
            this.setState({ load: 'false' });
            console.log(load);
        });
    };

    render() {
        const { repositoryList, load } = this.state;
        return (
            <div>
                <RepositoryGrid repositories={repositoryList} />
                <div className="footer">
                    <button
                        type="button"
                        className="show-more-btn"
                        onClick={this.updateRepositoryList}>
                        {load ? (
                            <h2 className="show-more-btn-text">{load}</h2>
                        ) : (
                            <h1 className="show-more-btn-text">{load}</h1>
                        )}
                        <h2
                            className="show-more-btn-text"
                            className={load ? vsdgf : fsdfsd}>
                            {load}
                        </h2>
                    </button>
                </div>
            </div>
        );
    }
}
