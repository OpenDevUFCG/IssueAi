// @flow
import * as React from 'react';
import {
    RepositoryCard,
    RepositoryList,
} from '../commons/repository/Repository';

const repo = {
    name: 'string',
    owner: 'string',
    description: 'string',
    issuesCount: 21,
    pullRequestsCount: 10,
};

const repos = [repo, repo, repo];

const App = () => (
    <div>
        <p>Hello World</p>
        <RepositoryCard repository={repo} />
        <RepositoryList repositories={repos} />
    </div>
);

export default App;
