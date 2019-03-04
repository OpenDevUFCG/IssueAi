// @flow
import axios from 'axios';

const getAxiosInstance = () => {
    const config = {
        baseURL: 'https://laguinho.opendevufcg.org/v1',
    };

    return axios.create(config);
};

const requestGithub = async () => {
    const response = await getAxiosInstance().get('/repositories');
    return response;
};

const getRepositories = async (after: string | any) => {
    const response = await requestGithub();
    const { repos, endCursor } = response.data;

    let lastCursor = endCursor;

    if (lastCursor) lastCursor = lastCursor.replace('=', '');
    if (!lastCursor) lastCursor = after;

    return { repos, lastCursor };
};

export default getRepositories;
