// @flow

import React from 'react';
import TeamMember from './TeamMember';
import members from '../../../data/equipe.json';
import './teamPage.css';

const renderMembers = () =>
    members.map(member => (
        <li>
            <TeamMember {...member} />
        </li>
    ));

const TeamPage = () => <ul className="team">{renderMembers()}</ul>;

export default TeamPage;
