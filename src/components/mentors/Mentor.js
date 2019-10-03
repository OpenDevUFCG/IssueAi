// @flow
import type { Repository } from '../commons/repository/repository';
import React, { FunctionComponent } from 'react';

type MentorProps = {
    name: string,
    imgUrl: string,
    repositoriesList: Repository[],
};

const renderRepositories = (repositoriesList: Repository[]) => {
    return repositoriesList.map(repository => <li>{repository.name}</li>);
};

const Mentor: FunctionComponent<MentorProps> = ({
    name,
    imgUrl,
    repositoriesList,
}) => {
    return (
        <div>
            <img src={imgUrl} />
            <figcaption>{name}</figcaption>
            <ul>{renderRepositories(repositoriesList)}</ul>
        </div>
    );
};

export default Mentor;
