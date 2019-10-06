// @flow
import React from 'react';
import type { Mentor } from './mentor';

import MentorCard from './MentorCard';

type MentorGridProps = {
    mentorsList: Mentor[],
};

const renderMentors = (mentorsList: Mentor[]) =>
    mentorsList.map(mentor => (
        <MentorCard
            name={mentor.name}
            imgUrl={mentor.imgUrl}
            repositoriesList={mentor.repositoriesList}
        />
    ));

const MentorGrid = ({ mentorsList }: MentorGridProps) => (
    <ul>{renderMentors(mentorsList)}</ul>
);

export default MentorGrid;
