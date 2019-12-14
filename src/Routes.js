import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { HomePage, JoinUsPage, HacktoberfestPage, MentorsPage } from './pages'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/junte-se" component={JoinUsPage} />
    <Route path="/hacktoberfest" component={HacktoberfestPage} />
    <Route path="/mentores" component={MentorsPage} />
  </Switch>
)

export default Routes
