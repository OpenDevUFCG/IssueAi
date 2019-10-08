import React from 'react';
import Contributor from './Contributor';
import type { ContributorProps } from './contributor';

const renderBody = (contributors: ContributorProps[]) =>
    contributors.map(contributor => <Contributor {...contributor} />);

const RankingPage = ({ contributors }: ContributorProps[]) => {
    return (
        <table>
            <thead>
                <th></th>
                <th>Username</th>
                <th>Merged PRs</th>
            </thead>
            <tbody>{renderBody(contributors)}</tbody>
        </table>
    );
};

export default RankingPage;
