// @flow
import axios from 'axios';

const ORG_NAME = 'OpenDevUFCG'
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

/* Tem essa forma de fazer, com fragment, como vamos precisar 
pegar mais infos, acho que fica melhor*/

const queryGetInfo = `
    {
      organization(login: ${ORG_NAME}) {
        ...getMembers,
        ...getRepositories
      }
    }
    ${getMembersFragment}
    ${getRepositoriesFragment}
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

const getRepositoriesFragment = `
    fragment getRepositories on Organization {
      repositories(first: 7) {
        edges {
          node {
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
        }
      }
    }
`;


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
