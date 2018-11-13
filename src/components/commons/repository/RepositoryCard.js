// @flow
import * as React from 'react';
import type { Repository } from './repository';

import './Repository.css';

type RepositoryProps = {
    repository: Repository,
};

const RepositoryStats = ({ repository }: RepositoryProps) => (
    <div bp="grid" className="repository-stats">
        <i className="fas fa-star" />
        <span>{repository.stargazers.totalCount}</span>
        <i className="fas fa-exclamation-circle" />
        {repository.issues.totalCount}
        <i className="fas fa-code-branch" />
        <span>{repository.pullRequests.totalCount}</span>
        <i className="fas fa-utensils" />
        <span>{repository.forkCount}</span>
    </div>
);

const RepositoryCard = ({ repository }: RepositoryProps) => (
    <div className="repository-card">
        <a className="repository-card-title" href={repository.url}>
            <h3>{repository.nameWithOwner}</h3>
        </a>
        <p>{repository.description}</p>
        <RepositoryStats repository={repository} />
    </div>
);

export default RepositoryCard;
