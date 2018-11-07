// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import type { Repository } from '../commons/repository/repository';
import RepositoryGrid from '../commons/repository/RepositoryGrid';

type Props = {
    repositoryList: Repository[],
};

const Routes = ({ repositoryList }: Props) => (
    <Switch>
        <Route
            exact
            path="/"
            render={() => <RepositoryGrid repositories={repositoryList} />}
        />
        <Route path="/quem-somos" render={() => <div />} />
        <Route path="/contribuir" render={() => <div />} />
    </Switch>
);

export default Routes;
