import React from 'react';
import { pluck } from 'ramda';
import { useQuery } from '@apollo/react-hooks';
import RankingQuery from '../../graphql/ranking.graphql';
import projects from '../../../data/repositories.json';

const repositories = pluck('name', projects.repositories);
const filterByOurProjects = node =>
    repositories.includes(node.repository.nameWithOwner) ||
    node.repository.nameWithOwner.includes('OpenDevUFCG');
const filterPrsByState = (pullRequests, state) =>
    pullRequests.filter(pr => pr.state == state);

const prStatistics = contributions =>
    contributions.map(contribution => {
        const prs = contribution.pullRequests.nodes.filter(filterByOurProjects);
        return {
            openPrs: filterPrsByState(prs, 'OPEN').length,
            mergedPrs: filterPrsByState(prs, 'MERGED').length,
        };
    });

const Ranking = () => {
    const contributors = 'user:thayannevls user:ArthurFerrao user:fanny';
    const { loading, error, data } = useQuery(RankingQuery, {
        variables: { contributors },
        pollInterval: 1000,
        fetchPolicy: 'network-only',
    });
    const contributions = !loading && prStatistics(data.search.nodes);

    return (
        <ul>
            {!loading &&
                data.search.nodes.map((el, i) => (
                    <div>
                        <li>{el.login}</li>
                        <span>{contributions[i].openPrs}</span>{' '}
                        <span>{contributions[i].mergedPrs}</span>
                    </div>
                ))}
        </ul>
    );
};

export default Ranking;
