// @flow
import type { Repository } from '../commons/repository/repository';
import type { Mentor } from './mentor';
import React, { FunctionComponent } from 'react';

const renderRepositories = (repositoriesList: Repository[]) => {
    return repositoriesList.map(repository => (
        <li key={repository.nameWithOwner}>{repository.nameWithOwner}</li>
    ));
};

const MentorCard: FunctionComponent<MentorProps> = ({
    name,
    imgUrl,
    repositoriesList,
}) => {
    return (
        <div>
            <img src={imgUrl} />
            <figcaption>{name}</figcaption>
            <ul>{renderRepositories(repositoriesList)}</ul>
        </div>
    );
};

export default MentorCard;
