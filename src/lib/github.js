// @flow
import axios from 'axios';

const queryGetRepos = `    
    Organization(login: "OpenDevUFCG") {
        repositories(first: 30) {
            edges {
                node {
                nameWithOwner
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
