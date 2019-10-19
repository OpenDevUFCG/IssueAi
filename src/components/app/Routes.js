// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProjectsPage from '../projects/ProjectsPage';
import JoinUsPage from '../joinus/JoinUsPage';
import TeamPage from '../team/TeamPage';
import Ranking from '../ranking/Ranking';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={ProjectsPage} />
        <Route path="/quem-somos" render={TeamPage} />
        <Route path="/junte-se" component={JoinUsPage} />
        <Route path="/ranking" component={Ranking} />
    </Switch>
);

export default Routes;
