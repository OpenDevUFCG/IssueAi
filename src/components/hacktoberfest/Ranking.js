import React from 'react';
import { pluck } from 'ramda';
import { useQuery } from '@apollo/react-hooks';
import RankingQuery from '../../graphql/ranking.graphql';
import projects from '../../../data/repositories.json';
import participants from '../../../data/contributors.json';
import './Ranking.css';
import Loading from '../commons/loading/Loading';

const repositories = pluck('name', projects.repositories);
const filterByOurProjects = node =>
    repositories.includes(node.repository.nameWithOwner) ||
    node.repository.nameWithOwner.includes('OpenDevUFCG');

const filterByDate = pullRequests =>
    pullRequests.filter(pr => {
        const today = new Date();
        const prDate = new Date(pr.createdAt);
        return (
            prDate.getDate() === today.getDate() &&
            prDate.getMonth() === today.getMonth() &&
            prDate.getFullYear() === today.getFullYear()
        );
    });

const filterPrsByState = (pullRequests, state) =>
    pullRequests.filter(pr => pr.state == state);

const prStatistics = contributions =>
    contributions.map(contribution => {
        let prs = contribution.pullRequests.nodes.filter(filterByOurProjects);
        prs = filterByDate(prs);
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
        <>
            <table className="table">
                <tr>
                    <th></th>
                    <th>Usuário</th>
                    <th>PRs Abertos</th>
                    <th>PRs mergeados</th>
                </tr>
                {!loading &&
                    data.search.nodes.map((el, i) => {
                        const profileUrl = `https://github.com/${el.login}`;
                        return (
                            <tr>
                                <td>
                                    <a href={profileUrl}>
                                        <img
                                            className="avatar"
                                            alt={el.login}
                                            src={el.avatarUrl}
                                        />
                                    </a>
                                </td>
                                <td>
                                    <a
                                        className="contributor-name"
                                        href={profileUrl}>
                                        {el.login}
                                    </a>
                                </td>
                                <td>{contributions[i].openPrs}</td>
                                <td>{contributions[i].mergedPrs}</td>
                            </tr>
                        );
                    })}
            </table>
            {loading && (
                <div className="loading">
                    <Loading />
                </div>
            )}
        </>
    );
};

export default Ranking;
