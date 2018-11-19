// @flow

export type Stats = {
    totalCount: number,
};

export type Repository = {
    nameWithOwner: string,
    url: string,
    description: string,
    issues: Stats,
    pullRequests: Stats,
    stargazers: Stats,
    forkCount: number,
};
