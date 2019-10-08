// @flow
import React from 'react';
import Contributor from './Contributor';
import type { ContributorProps } from './contributor';

type RankingProps = {
    contributors: ContributorProps[],
};

const renderBody = (contributors: RankingProps) =>
    contributors.map(contributor => <Contributor {...contributor} />);

const RankingPage = ({ contributors }: RankingProps) => {
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
