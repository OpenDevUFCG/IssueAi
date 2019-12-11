import projects from '../../data/repositories.json'

export const getRepositoriesSearchQuery = sort => {
  const { repositories } = projects
  let query = repositories.reduce(
    (accum, current) => ` ${accum} repo:${current.name}`,
    ''
  )
  query = `org:${projects.org}${query} `

  query += `sort:${sort}`

  return query
}
