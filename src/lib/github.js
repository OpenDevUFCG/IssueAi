// @flow
import axios from 'axios';

const ORG_NAME = 'OpenDevUFCG';
const queryGetRepos = `    
    Organization(login: ${ORG_NAME}) {
        repositories(first: 30) {
            edges {
                node {
                nameWithOwner
                }
            }
        }
    }
`;

const queryGetInfo = `
    {
      organization(login: ${ORG_NAME}) {
        ...getMembers,
      }
    }
    ${getMembersFragment}
`;

const getMembersFragment = `
    fragment getMembers on Organization {
      members(first: 30) {
        edges {
          node {
            name
          }
        }
      }
    }
`;

const getRepositoriesQuery = (cursor = 'MQ') => {
    return `
        {
          organization(login: ${ORG_NAME}) {
            repositories(first: 30, after: ${cursor}) {
              nodes {
                nameWithOwner
                forkCount
                stargazers {
                  totalCount
                }
                issues {
                  totalCount
                }
                pullRequests {
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
};

const getOrgRepositories = async () => {
    let data = await requestGithub(getRepositoriesQuery());
    let { organization: repositories } = data;
    let { pageInfo: hasNextPage, endCursor } = repositories;

    while (hasNextPage) {
        data = await requestGithub(getRepositoriesQuery(endCursor));
        let { organization: paginatedRepositories } = data;
        repositories.nodes = [
            ...repositories.nodes,
            ...paginatedRepositories.nodes,
        ];
        let { pageInfo: hasNextPage } = paginatedRepositories;
    }

    return data;
};

export const getAxiosInstance = () => {
    const token = process.env.GITHUB_TOKEN || '';
    const config = {
        baseUrl: 'https://api.github.com/graphql',
        headers: { Authorization: `Bearer ${token}` },
    };

    return axios.create(config);
};

const requestGithub = async (query: string) => {
    const params = {
        params: { q: query, type: 'repository' },
    };

    const response = await getAxiosInstance().post('/', params);

    return response.data;
};

export const getReposOrg = async () => requestGithub(queryGetRepos);
