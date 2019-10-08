// @flow
import React from 'react';
import type { Contributor } from './contributor';

const Contributor = ({ username, imgUrl, mergedPrs }: Contributor) => {
    return (
        <tr>
            <img src={imgUrl} alt={username} />
            <span>{username}</span>
            <span>{mergedPrs}</span>
        </tr>
    );
};

export default Contributor;
