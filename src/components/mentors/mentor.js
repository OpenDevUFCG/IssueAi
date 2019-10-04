// @flow
import type { Repository } from './repository';

export type Mentor = {
    name: string,
    imgUrl: string,
    repositoriesList: Repository[],
};
