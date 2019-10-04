// @flow
import type { Repository } from '../commons/repository/repository';
import type { Mentor } from './mentor';
import React, { FunctionComponent } from 'react';

import './MentorCard.css';

const renderRepositories = (repositoriesList: Repository[]) => {
    return repositoriesList.map(repository => (
        <li className="repository-mentor" key={repository.nameWithOwner}>
            {repository.nameWithOwner}
        </li>
    ));
};

const MentorCard: FunctionComponent<MentorProps> = ({
    name,
    imgUrl,
    repositoriesList,
}) => {
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
