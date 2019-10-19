import React from 'react';
import { pluck } from 'ramda';
import { useQuery } from '@apollo/react-hooks';
import RankingQuery from '../../graphql/ranking.graphql';
import projects from '../../../data/repositories.json';
import participants from '../../../data/contributors.json';
import './Ranking.css';

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
    const contributors = participants.reduce(
        (accum, current) => `${accum} user:${current.github_user}`,
        ''
    );
    const { loading, error, data } = useQuery(RankingQuery, {
        variables: { contributors },
        pollInterval: 1000,
        fetchPolicy: 'network-only',
    });
    const contributions = !loading && prStatistics(data.search.nodes);
    console.log(data);
    return (
        <table className="table">
            <tr>
                <th></th>
                <th>Usuário</th>
                <th>PRs Abertos</th>
                <th>PRs mergeados</th>
            </tr>
            {!loading &&
                data.search.nodes.map((el, i) => (
                    <tr>
                        <td>
                            <img
                                className="avatar"
                                alt={el.login}
                                src={el.avatarUrl}
                            />
                        </td>
                        <td>{el.login}</td>
                        <td>{contributions[i].openPrs}</td>
                        <td>{contributions[i].mergedPrs}</td>
                    </tr>
                ))}
        </table>
    );
};

export default Ranking;
