// @flow

import React from 'react';
import type { MemberProps } from './member';
import './teamPage.css';

const Member = ({ nome, urlGithub }: MemberProps) => (
    <div className="membro">
        <a href={urlGithub}>
            <img
                className="membro-imagem"
                src={`${urlGithub}.png`}
                alt={urlGithub}
            />
        </a>
        <figcaption>{nome}</figcaption>
    </div>
);

export default Member;
