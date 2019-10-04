// @flow
import * as React from 'react';
import RepositoryCard from './RepositoryCard';
import MentorCard from '../../mentors/MentorCard';
import type { Repository } from './repository';

type RepositoryListProps = {
    repositories: Repository[],
};

const listRepos = (list: Repository[]) =>
    list.map(repository => (
        <RepositoryCard
            key={repository.nameWithOwner}
            repository={repository}
        />
    ));

const RepositoryGrid = ({ repositories }: RepositoryListProps) => (
    <div className="repository-grid">
        {listRepos(repositories)}
        <MentorCard
            name="Fanny"
            imgUrl="https://avatars3.githubusercontent.com/u/14113480?s=460&v=4"
            repositoriesList={repositories.slice(0, 4)}
        />
    </div>
);

export default RepositoryGrid;
