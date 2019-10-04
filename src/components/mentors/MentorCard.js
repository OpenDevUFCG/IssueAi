// @flow
import type { Repository } from '../commons/repository/repository';
import type { Mentor as MentorCardProps } from './mentor';
import React from 'react';

const renderRepositories = (repositoriesList: Repository[]) => {
    return repositoriesList.map(repository => (
        <li key={repository.nameWithOwner}>{repository.nameWithOwner}</li>
    ));
};

const MentorCard = ({ name, imgUrl, repositoriesList }: MentorCardProps) => {
    return (
        <div>
            <img src={imgUrl} />
            <figcaption>{name}</figcaption>
            <ul>{renderRepositories(repositoriesList)}</ul>
        </div>
    );
};

export default MentorCard;
