// @flow
import React from 'react';
import type { Repository } from '../commons/repository/repository';
import type { Mentor as MentorCardProps } from './mentor';

import './MentorCard.css';

const renderRepositories = (repositoriesList: Repository[]) =>
    repositoriesList.map(repository => (
        <li className="repository-mentor" key={repository.nameWithOwner}>
            {repository.nameWithOwner}
        </li>
    ));

const MentorCard = ({ name, imgUrl, repositoriesList }: MentorCardProps) => (
    <div className="card-mentor">
        <img className="img-mentor" src={imgUrl} alt={name} />
        <figcaption className="name-mentor">{name}</figcaption>
        <ul className="repository-list-mentor">
            {renderRepositories(repositoriesList)}
        </ul>
    </div>
);

export default MentorCard;
