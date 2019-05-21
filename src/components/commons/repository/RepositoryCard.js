// @flow
import * as React from 'react';
import type { Repository } from './repository';

import './Repository.css';

type RepositoryProps = {
    repository: Repository,
};

const Stat = ({ iconClass, statCount }) => (
    <div className="stat">
        <i className={`fas ${iconClass}`} />
        <span className="stat-count">{statCount}</span>
    </div>
);

const RepositoryStats = ({ repository }: RepositoryProps) => (
    <div className="repository-stats">
        <Stat iconClass="fa-star" statCount={repository.stargazersCount} />
        <Stat
            iconClass="fa-exclamation-circle"
            statCount={repository.issuesCount}
        />
        <Stat
            iconClass="fa-code-branch"
            statCount={repository.pullRequestsCount}
        />
        <Stat iconClass="fa-utensils" statCount={repository.forkCount} />
    </div>
);

const RepositoryCard = ({ repository }: RepositoryProps) => (
    <a href={repository.url}>
        <div className="repository-card">
            <h3 className="repository-name">{repository.nameWithOwner}</h3>
            <p className="repository-description">{repository.description}</p>
            <RepositoryStats
                className="repository-stats"
                repository={repository}
            />
        </div>
    </a>
);

export default RepositoryCard;
