// @flow

import React from 'react';
import type { MemberProps } from './member';

const Member = ({ nome, urlGithub }: MemberProps) => {
    return (
        <div>
            <a href={urlGithub}>
                <img src={`${urlGithub}.png`} alt={urlGithub} />
            </a>
            <figcaption>{nome}</figcaption>
        </div>
    );
};

export default Member;
