// @flow
import React from 'react';
import type { Mentor as MentorCardProps } from './mentor';

import './Mentor.css';

const MentorCard = ({ name, imgUrl }: MentorCardProps) => (
    <div className="card-mentor">
        <img className="img-mentor" src={imgUrl} alt={name} />
        <figcaption className="name-mentor">{name}</figcaption>
    </div>
);

export default MentorCard;
