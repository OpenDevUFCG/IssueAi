// @flow
import React from 'react';
import type { ContributorProps } from './contributor';

const Contributor = ({ username, imgUrl, mergedPrs }: ContributorProps) => {
    return (
        <tr>
            <img src={imgUrl} alt={username} />
            <span>{username}</span>
            <span>{mergedPrs}</span>
        </tr>
    );
};

export default Contributor;
