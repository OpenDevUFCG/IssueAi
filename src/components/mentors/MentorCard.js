// @flow
import type { Repository } from '../commons/repository/repository';
import type { Mentor as MentorCardProps } from './mentor';
import React from 'react';

import './MentorCard.css';

const renderRepositories = (repositoriesList: Repository[]) => {
    return repositoriesList.map(repository => (
        <li className="repository-mentor" key={repository.nameWithOwner}>
            {repository.nameWithOwner}
        </li>
    ));
};

const MentorCard = ({ name, imgUrl, repositoriesList }: MentorCardProps) => {
    return (
        <div className="card-mentor">
            <img className="img-mentor" src={imgUrl} />
            <figcaption className="name-mentor">{name}</figcaption>
            <ul className="repository-list-mentor">
                {renderRepositories(repositoriesList)}
            </ul>
        </div>
    );
};

export default MentorCard;
