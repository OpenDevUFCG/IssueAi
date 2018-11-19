// @flow
import * as React from 'react';
import RepositoryCard from './RepositoryCard';
import type { Repository } from './repository';

type RepositoryListProps = {
    repositories: Repository[],
};

const listRepos = (list: Repository[]) =>
    list.map(repository => <RepositoryCard repository={repository} />);

const RepositoryGrid = ({ repositories }: RepositoryListProps) => (
    <div bp="grid 6@md 4@lg">{listRepos(repositories)}</div>
);

export default RepositoryGrid;
