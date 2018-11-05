// @flow
import * as React from 'react';
import type { Repository } from './repository';

type RepositoryProps = {
    repository: Repository,
};

const RepositoryNumbers = ({ repository }: RepositoryProps) => (
    <div bp="grid">
        <span>{repository.issues.totalCount}</span>
        <span>{repository.pullRequests.totalCount}</span>
        <span>{repository.stargazers.totalCount}</span>
        <span>{repository.forkCount}</span>
    </div>
);

const RepositoryCard = ({ repository }: RepositoryProps) => (
    <div>
        <a href={repository.url}>
            <h3>{repository.nameWithOwner}</h3>
        </a>
        <RepositoryNumbers repository={repository} />
        <p>{repository.description}</p>
    </div>
);

export default RepositoryCard;
