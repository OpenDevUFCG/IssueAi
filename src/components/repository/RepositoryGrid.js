import * as React from 'react'
import RepositoryCard from './RepositoryCard'

const listRepos = list =>
  list.map(repository => (
    <RepositoryCard key={repository.nameWithOwner} repository={repository} />
  ))

const RepositoryGrid = ({ repositories }) => (
  <div className="repository-grid">{listRepos(repositories)}</div>
)

export default RepositoryGrid
