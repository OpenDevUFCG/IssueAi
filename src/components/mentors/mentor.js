// @flow
import type { Repository } from '../commons/repository/repository';

export type Mentor = {
    name: string,
    imgUrl: string,
    repositoriesList: Repository[],
};
