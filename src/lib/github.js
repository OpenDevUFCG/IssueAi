// @flow
import axios from 'axios';
import projects from './repositories-data';

const getAxiosInstance = () => {
    const token = process.env.GITHUB_TOKEN || '';
    console.log(token);
    const config = {
        baseURL: 'https://api.github.com',
        headers: { Authorization: `Bearer ${token}` },
    };
    return axios.create(config);
};

export const requestGithub = async (query, variables = {}) => {
    const params = { query, variables };
    const response = await getAxiosInstance().post('/graphql', params);
    return response.data;
};

const repoStatsQuery = `
fragment SearchResultFields on SearchResultItemConnection {
    nodes {
        ... on Repository {
            nameWithOwner
            description
            url
            forkCount
            object(expression: "master") {
                ... on Commit {
                    history {
                        totalCount
                    }
                }
            }
            issues(states: OPEN) {
                totalCount
            }
            pullRequests(states: OPEN) {
                totalCount
            }
            stargazers {
                totalCount
            }
        }
    }
}`;

const searchRepoQuery = (query, quantity, after = null) => {
    if (after) after = `"${after}"`;
    return `{
        search(
            first: ${quantity},
            after: ${after},
            query: "${query}",
            type: REPOSITORY
        ) {
            ...SearchResultFields
            repositoryCount
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    } ${repoStatsQuery}`;
};

const transformRepository = githubJson => ({
    nameWithOwner: githubJson.nameWithOwner,
    description: githubJson.description,
    url: githubJson.url,
    forkCount: githubJson.forkCount,
    commitsCount: githubJson.object.history.totalCount,
    issuesCount: githubJson.issues.totalCount,
    pullRequestsCount: githubJson.pullRequests.totalCount,
    stargazersCount: githubJson.stargazers.totalCount,
});

const getRepositories = async (after: string | any, quantity = 6) => {
    const repositories = projects.repositories;

    let query = repositories.reduce(
        (accum, current) => ` ${accum} repo:${current.name}`,
        ''
    );
    query = `org:${projects.org}${query}`;

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
