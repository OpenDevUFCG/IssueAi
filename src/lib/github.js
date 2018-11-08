// @flow
import axios from 'axios';
import projects from './data';

const ORG_NAME = 'OpenDevUFCG';
let lastCursorOrgRepositories = null;

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

const joinSearchNodes = data => {
    let nodes = [];
    for (let org in data) {
        nodes = nodes.concat(data[org].nodes);
    }
    return nodes;
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
        pullRequests {
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
    ${owner}: search(
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
    `;
    return searchQuery;
};

const getOrgReposQuery = cursor =>
    searchRepoQuery(`org:${ORG_NAME}`, ORG_NAME, 10, cursor);

const getOthersRepoQuery = (repo, owner) =>
    searchRepoQuery(`repo:${repo}`, owner, 2, null);

const AllReposQuery = () => {
    let searchQuery = getOrgReposQuery(lastCursorOrgRepositories);
    Object.keys(projects).forEach(key => {
        searchQuery += getOthersRepoQuery(key, projects[key]);
    });
    const query = `{
        ${searchQuery}
      }
      ${getRepoStats()}
    `;
    return query;
};

const getRepositories = async () => {
    const response = await requestGithub(AllReposQuery());

    return joinSearchNodes(response.data);
};

export default getRepositories;
