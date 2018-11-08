// @flow
import axios from 'axios';
import projects from './data';

const ORG_NAME = 'OpenDevUFCG';

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

const getRepos = (
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

const getRepositoriesQuery = cursor =>
    getRepos(`org:${ORG_NAME}`, ORG_NAME, 4, cursor);

const getOthersRepo = (repo, owner) => getRepos(`repo:${repo}`, owner, 2, null);

let lastCursorOrgRepositories = null;

const getAll = () => {
    let searchQuery = getRepositoriesQuery(lastCursorOrgRepositories);
    Object.keys(projects).forEach(key => {
        searchQuery += getOthersRepo(key, projects[key]);
    });
    const query = `{
        ${searchQuery}
      }
      ${getRepoStats()}
    `;
    return query;
};

const getOrgRepositories = async () => {
    // const response = await requestGithub(
    //     getRepositoriesQuery(lastCursorOrgRepositories)
    // );
    // const { repositories: repositories } = response.data;
    // const { pageInfo } = repositories;
    // lastCursorOrgRepositories = pageInfo.endCursor;
    // return repositories.nodes;
    const response = await requestGithub(getAll());
    const { repositories: repositories } = response.data;
    // const { pageInfo } = repositories;
    // lastCursorOrgRepositories = pageInfo.endCursor;
    console.log(joinSearchNodes(response.data));
    return joinSearchNodes(response.data);
};

export default getOrgRepositories;
