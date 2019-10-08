// @flow

import React from 'react';
import type { MemberProps } from './member';
import Member from './Member';
import members from '../../../data/equipe.json';

const renderMembers = () =>
    members.map(member => (
        <li>
            <Member {...member} />
        </li>
    ));

const TeamPage = () => {
    return <ul>{renderMembers()}</ul>;
};

export default TeamPage;
