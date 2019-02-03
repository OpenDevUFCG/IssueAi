// @flow
import axios from 'axios';
import projects from './data';

const getAxiosInstance = () => {
    const token = process.env.API_TOKEN || '';
    const config = {
        baseURL: 'https://api.github.com',
        headers: { Authorization: `Bearer ${token}` },
    };
    return axios.create(config);
};

const requestGithub = async (query: string, variables = {}) => {
    const params = { query, variables };
    const response = await getAxiosInstance().post('/graphql', params);

    return response.data;
};

const getRepoStats = () =>
    `
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
  }
`;

const searchRepoQuery = (
    query: string,
    owner: string,
    first: number,
    after: string
) => {
    const searchQuery = `
    {
      search(
      first: ${first},
      after:${after},
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
  }
    ${getRepoStats()}  
    `;
    return searchQuery;
};

const getRepositories = async (after: string | any) => {
    let query = `org:${projects.org}`;

    Object.keys(projects.repositories).forEach(key => {
        query += ` repo:${projects.repositories[key]}`;
    });

    const response = await requestGithub(
        searchRepoQuery(query, 'repositories', 9, after)
    );
    const {
        nodes: repos,
        pageInfo: { endCursor },
    } = response.data.search;

    let lastCursor = endCursor;

    if (lastCursor) lastCursor = lastCursor.replace('=', '');
    if (!lastCursor) lastCursor = after;

    return { repos, lastCursor };
};

export default getRepositories;
