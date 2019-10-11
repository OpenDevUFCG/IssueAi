// @flow

import React from 'react';
import Member from './Member';
import members from '../../../data/equipe.json';
import './teamPage.css';

const renderMembers = () =>
    members.map(member => (
        <li>
            <Member {...member} />
        </li>
    ));

const TeamPage = () => <ul className="team">{renderMembers()}</ul>;

export default TeamPage;
