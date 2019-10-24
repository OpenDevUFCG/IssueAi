// @flow
import axios from 'axios';
import projects from '../../data/repositories.json';
import contributors from '../../data/contributors.json';
import searchRepoQuery from '../graphql/queries';
import { SortField } from './constants';
import type { GetRepositoryOptions } from './options';

const getAxiosInstance = () => {
    const token = process.env.GITHUB_TOKEN || '';
    const config = {
        baseURL: 'https://api.github.com',
        headers: { Authorization: `Bearer ${token}` },
    };
    return axios.create(config);
};

export const requestGithub = async (query: string, variables: any = {}) => {
    const params = { query, variables };
    const response = await getAxiosInstance().post('/graphql', params);
    return response.data;
};

const transformRepository = (githubJson: any) => ({
    nameWithOwner: githubJson.nameWithOwner,
    description: githubJson.description,
    url: githubJson.url,
    forkCount: githubJson.forkCount,
    commitsCount: githubJson.object.history.totalCount,
    issuesCount: githubJson.issues.totalCount,
    pullRequestsCount: githubJson.pullRequests.totalCount,
    stargazersCount: githubJson.stargazers.totalCount,
});

const getSortQuery = (sort: SortField) => `sort:${sort}`;

const getRepositories = async (
    after: string | any,
    options: GetRepositoryOptions,
    quantity: number = 12
) => {
    const { repositories } = projects;

    let query = repositories.reduce(
        (accum, current) => ` ${accum} repo:${current.name}`,
        ''
    );
    query = `org:${projects.org}${query} `;

    query += getSortQuery(options.sort);

    const response = await requestGithub(
        searchRepoQuery(query, quantity, after)
    );

    const {
        nodes: repos,
        pageInfo: { endCursor },
    } = response.data.search;

    let lastCursor = endCursor;
    if (lastCursor) lastCursor = lastCursor.replace('=', '');
    if (!lastCursor) lastCursor = after;

    return { repos: repos.map(transformRepository), lastCursor };
};

export default getRepositories;
