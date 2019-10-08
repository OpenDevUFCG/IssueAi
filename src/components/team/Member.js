// @flow

import React from 'react';
import type { MemberProps } from './member';
import './teamPage.css';

const Member = ({ nome, urlGithub }: MemberProps) => (
    <div className="member">
        <a href={urlGithub}>
            <img
                className="member-image"
                src={`${urlGithub}.png`}
                alt={urlGithub}
            />
        </a>
        <figcaption className="member-name">{nome}</figcaption>
    </div>
);

export default Member;
