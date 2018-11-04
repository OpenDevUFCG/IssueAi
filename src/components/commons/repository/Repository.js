// @flow
import * as React from 'react';

type Repository = {
    name: string,
    owner: string,
    description: string,
    issuesCount: number,
    pullRequestsCount: number,
};

type RepositoryListProps = {
    repositories: Repository[],
};

type RepositoryProps = {
    repository: Repository,
};

export const RepositoryCard = ({ repository }: RepositoryProps) => (
    <div>
        <p>{repository.name}</p>
    </div>
);

const listTracks = list =>
    list.map(repository => <RepositoryCard repository={repository} />);

export const RepositoryList = ({ repositories }: RepositoryListProps) => (
    <div>{listTracks(repositories)}</div>
);
