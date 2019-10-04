import React, { FunctionComponent } from 'react';
import type { Mentor } from './Mentor';

import MentorCard from './MentorCard';

type MentorGridProps = {
    mentorsList: Mentor[],
};

const renderMentors = (mentorsList: Repository[]) => {
    return mentorsList.map(mentor => (
        <MentorCard
            name={mentor.name}
            imgUrl={mentor.imgUrl}
            repositoriesList={mentor.repositoriesList}
        />
    ));
};

const MentorGrid = ({ mentorsList }: MentorGridProps) => {
    return <ul>{renderMentors(mentorsList)}</ul>;
};

export default MentorGrid;
