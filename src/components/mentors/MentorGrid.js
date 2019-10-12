// @flow
import React from 'react';
import type { Mentor } from './mentor';

import MentorCard from './MentorCard';
import mentors from '../../../data/getMentors';

const renderMentors = (mentorsList: Mentor[]) => {
    console.log(mentorsList.flat());
    return mentorsList
        .flat()
        .map((mentor, i) => (
            <MentorCard
                name={mentor.name}
                imgUrl={mentor.imgUrl}
                key={`${mentor.name}--${i}`}
            />
        ));
};

const MentorGrid = () => <ul>{renderMentors(mentors)}</ul>;

export default MentorGrid;
