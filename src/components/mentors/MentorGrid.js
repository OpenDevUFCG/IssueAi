import React, { FunctionComponent } from 'react';

type MentorGridProps = {
    name: string,
    imgUrl: string,
    repositoriesList: Repository[],
};

const renderRepositories = (repositoriesList: Repository[]) => {
    return repositoriesList.map(repository => (
        <li key={repository.nameWithOwner}>{repository.nameWithOwner}</li>
    ));
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
