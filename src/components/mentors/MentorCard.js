// @flow
import React from 'react';
import type { Mentor as MentorCardProps } from './mentor';

import './MentorCard.css';

const MentorCard = ({ name, imgUrl }: MentorCardProps) => (
    <div className="card-mentor">
        {name}
        <img className="img-mentor" src={imgUrl} alt={name} />
        <figcaption className="name-mentor">{name}</figcaption>
    </div>
);

export default MentorCard;
