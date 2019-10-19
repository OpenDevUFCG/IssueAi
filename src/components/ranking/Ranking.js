import React from 'react';
import { pluck } from 'ramda';
import { useQuery } from '@apollo/react-hooks';
import RankingQuery from '../../graphql/ranking.graphql';
import projects from '../../../data/repositories.json';

const repositories = pluck('name', projects.repositories);
const filterByOurProjects = node =>
    repositories.includes(node.repository.nameWithOwner) ||
    node.repository.nameWithOwner.includes('OpenDevUFCG');

const getPRs = contributions =>
    contributions.map(contribution =>
        contribution.pullRequests.nodes.filter(filterByOurProjects)
    );

const Ranking = () => {
    const contributors = 'user:thayannevls user:ArthurFerrao user:fanny';
    const { loading, error, data } = useQuery(RankingQuery, {
        variables: { contributors },
        pollInterval: 1000,
        fetchPolicy: 'network-only',
    });
    const prStats = !loading && getPRs(data.search.nodes);
    return <ul>{!loading && data.search.nodes.map(el => el.login)}</ul>;
};

export default Ranking;
