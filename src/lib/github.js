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

const requestGithub = async (query: string, variables = {}) => {
    const params = { query, variables };
    const response = await getAxiosInstance().post('/graphql', params);

    return response.data;
};

const getRepositoriesQuery = cursor =>
    `
        {
          organization(login: ${ORG_NAME}) {
            repositories(first: 2, after: ${cursor}) {
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

const getOthersRepo = async (owner: string, name: string) => {
    const query = `
    {
      repository(owner: ${owner}, name: ${name}) {
        nameWithOwner, 
        url,
        description,
        forkCount,
        issues (states: OPEN) {
          totalCount
        }
        pullRequests(states: OPEN) {
          totalCount
        }
        stargazers {
          totalCount
        }
    }
  }`;
    const response = await requestGithub(query);
    return response;
};

let lastCursorOrgRepositories = '';

const getOrgRepositories = async () => {
    const response = await requestGithub(
        getRepositoriesQuery(lastCursorOrgRepositories)
    );
    const { organization: repositories } = response.data;
    const { pageInfo } = repositories.repositories;
    lastCursorOrgRepositories = pageInfo.endCursor;
    return response.data.organization.repositories.nodes;
};

export default getOrgRepositories;
