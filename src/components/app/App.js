// @flow
import * as React from 'react';
import type { Repository } from '../commons/repository/repository';
import RepositoryGrid from '../commons/repository/RepositoryGrid';

const repo = {
    name: 'IssueAi',
    url: 'https://github.com/OpenDevUFCG/IssueAi',
    owner: 'OpenDevUFCG',
    description: `O Issue Ai cria um espaço de visibilidade para os
        projetos open source criado por alunos de Computação@UFCG.`,
    issuesCount: 21,
    pullRequestsCount: 10,
    starsCount: 30,
    commitsCount: 40,
};

type AppState = {
    repositoryList: Repository[],
};

export default class App extends React.Component<void, AppState> {
    state = {
        repositoryList: [],
    };

    componentDidMount() {
        // TODO: Make the request for repos here
        this.setState({ repositoryList: [repo, repo, repo, repo, repo, repo] });
    }

    render() {
        const { repositoryList } = this.state;
        return (
            <div>
                <h1>IssueAi</h1>
                <RepositoryGrid repositories={repositoryList} />
            </div>
        );
    }
}
