// @flow
import React from 'react';
import type { Mentor } from './mentor';

import MentorCard from './MentorCard';
import getMentors from '../../../data';
import './Mentor.css';

const renderMentors = (mentorsList: Mentor[]) => {
    return mentorsList.map((mentor, i) => (
        <MentorCard
            name={mentor.name}
            imgUrl={mentor.imgUrl}
            key={`${mentor.name}--${i}`}
        />
    ));
};

const MentorGrid = () => (
    <div className="mentor-grid">{renderMentors(getMentors())}</div>
);

export default MentorGrid;
