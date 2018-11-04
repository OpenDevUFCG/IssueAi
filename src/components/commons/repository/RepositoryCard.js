// @flow
import * as React from 'react';
import type { Repository } from './repository';

type RepositoryProps = {
    repository: Repository,
};

const RepositoryNumbers = ({ repository }: RepositoryProps) => (
    <div bp="grid">
        <span>{repository.issuesCount}</span>
        <span>{repository.pullRequestsCount}</span>
        <span>{repository.starsCount}</span>
        <span>{repository.commitsCount}</span>
    </div>
);

const RepositoryCard = ({ repository }: RepositoryProps) => (
    <div>
        <a href={repository.url}>
            <h3>{`${repository.owner}/${repository.name}`}</h3>
        </a>
        <RepositoryNumbers repository={repository} />
        <p>{repository.description}</p>
    </div>
);

export default RepositoryCard;
