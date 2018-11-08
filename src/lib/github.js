// @flow
import axios from 'axios';
import projects from './data';

const ORG_NAME = 'OpenDevUFCG';
let lastCursorRepos = null; //cursor to paginate repositories

const getAxiosInstance = () => {
    const token = process.env.GITHUB_TOKEN || '';
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
    cursor: string
) => {
    const searchQuery = `
    {
      search(
      first: ${first},
      after:${cursor},
      query: "${query}",
      type: REPOSITORY
    ) {
      ...SearchResultFields
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

const getRepositories = async () => {
    let query = `org:${projects['org']}`;

    Object.keys(projects['repositories']).forEach(key => {
        query += ` repo:${projects['repositories'][key]}`;
    });

    const response = await requestGithub(
        searchRepoQuery(query, 'repositories', 4, lastCursorRepos)
    );
    lastCursorRepos = response.data.search.pageInfo.endCursor.replace('=', '');
    return response.data.search.nodes;
};

export default getRepositories;
