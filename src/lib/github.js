// @flow
import axios from 'axios';

const getAxiosInstance = () => {
    const token = process.env.GITHUB_TOKEN || '';
    const config = {
        baseUrl: 'https://api.github.com/graphql',
        headers: { Authorization: `Bearer ${token}` },
    };

    return axios.create(config);
};
