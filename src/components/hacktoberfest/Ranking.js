import React from 'react';
import { pluck, sortWith, descend, prop } from 'ramda';
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
            prDate.getDate() === 19 &&
            prDate.getMonth() === 9 &&
            prDate.getFullYear() === 2019
        );
    });

const filterPrsByState = (pullRequests, state) =>
    pullRequests.filter(pr => pr.state == state);

const prStatistics = contributions =>
    contributions.map(contribution => {
        let prs = contribution.pullRequests.nodes.filter(filterByOurProjects);
        prs = filterByDate(prs);
        return {
            login: contribution.login,
            avatarUrl: contribution.avatarUrl,
            openPrs: filterPrsByState(prs, 'OPEN').length,
            mergedPrs: filterPrsByState(prs, 'MERGED').length,
        };
    });

const sortByPrs = sortWith([descend(prop('mergedPrs'))]);
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
    const sortedContributions = sortByPrs(contributions);
    console.log(contributions);

    return (
        <>
            <table className="table">
                <tr>
                    <th></th>
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
                                <td>{`#${i + 1}`}</td>
                                <td>
                                    <a href={profileUrl}>
                                        <img
                                            className="avatar"
                                            alt={sortedContributions[i].login}
                                            src={
                                                sortedContributions[i].avatarUrl
                                            }
                                        />
                                    </a>
                                </td>
                                <td>
                                    <a
                                        className="contributor-name"
                                        href={profileUrl}>
                                        {sortedContributions[i].login}
                                    </a>
                                </td>
                                <td>{sortedContributions[i].openPrs}</td>
                                <td>{sortedContributions[i].mergedPrs}</td>
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
