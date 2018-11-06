// @flow
import axios from 'axios';

const ORG_NAME = 'OpenDevUFCG';

const getAxiosInstance = () => {
    const token = process.env.GITHUB_TOKEN || '';
    const config = {
        baseURL: 'https://api.github.com',
        headers: { Authorization: `Bearer ${token}` },
    };

    return axios.create(config);
};

const requestGithub = async (query: string) => {
    const params = { query };
    const response = await getAxiosInstance().post('/graphql', params);

    return response.data;
};

const getRepositoriesQuery = (cursor = 'MQ') =>
    `
        {
          organization(login: ${ORG_NAME}) {
            repositories(first: 30, after: ${cursor}) {
              nodes {
                nameWithOwner
                url
                description
                forkCount
                stargazers {
                  totalCount
                }
                issues(states: OPEN) {
                  totalCount
                }
                pullRequests(states: OPEN) {
                  totalCount
                }
              }
              pageInfo {
                endCursor
                hasNextPage
              }
            }
          }
        }
    `;

const getRepoStats = async (owner, name) => {
    const query = `
    query RepositoryStats($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
      object(expression: "master") {
        ... on Commit {
          history {
            totalCount
          }
        }
      }
      issues (states: OPEN) {
        totalCount
      }
      pullRequests {
        totalCount
      }
      stargazers {
        totalCount
      }
    }
  }`;
    const response = await requestGithub(query, { owner, name });
    return response;
};

const getOrgRepositories = async () => {
    let response = await requestGithub(getRepositoriesQuery());
    const { organization: repositories } = response.data;
    const { pageInfo: hasNextPage, endCursor } = repositories;

    while (hasNextPage) {
        response = await requestGithub(getRepositoriesQuery(endCursor));
        let { organization: paginatedRepositories } = response.data;
        repositories.nodes = [
            ...repositories.nodes,
            ...paginatedRepositories.nodes,
        ];
        let { pageInfo: hasNextPage } = paginatedRepositories;
    }

    return response.data.organization.repositories.nodes;
};

export default getOrgRepositories;
