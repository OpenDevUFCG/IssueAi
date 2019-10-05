// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProjectsPage from '../projects/ProjectsPage';
import JoinUsPage from '../joinus/JoinUsPage';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={ProjectsPage} />
        <Route path="/quem-somos" render={() => <div />} />
        <Route path="/junte-se" component={JoinUsPage} />
        <Route path="/contribuir" render={() => <div />} />
    </Switch>
);

export default Routes;
