import axios from 'axios'
import projects from '../../data/repositories.json'

const getAxiosInstance = () => {
  const token = process.env.GITHUB_TOKEN || ''
  const config = {
    baseURL: 'https://api.github.com',
    headers: { Authorization: `Bearer ${token}` },
  }
  return axios.create(config)
}

export const requestGithub = async (query, variables) => {
  const params = { query, variables }
  const response = await getAxiosInstance().post('/graphql', params)
  return response.data
}

const transformRepository = githubJson => ({
  nameWithOwner: githubJson.nameWithOwner,
  description: githubJson.description,
  url: githubJson.url,
  forkCount: githubJson.forkCount,
  commitsCount: githubJson.object.history.totalCount,
  issuesCount: githubJson.issues.totalCount,
  pullRequestsCount: githubJson.pullRequests.totalCount,
  stargazersCount: githubJson.stargazers.totalCount,
})

const getSortQuery = sort => `sort:${sort}`

// const getRepositories = async (after, options, quantity = 12) => {
//   const { repositories } = projects

//   let query = repositories.reduce(
//     (accum, current) => ` ${accum} repo:${current.name}`,
//     ''
//   )
//   query = `org:${projects.org}${query} `

//   query += getSortQuery(options.sort)

//   const response = await requestGithub(repositoriesQuery(query, quantity, after))

//   const {
//     nodes: repos,
//     pageInfo: { endCursor, hasNextPage },
//   } = response.data.search

//   let lastCursor = endCursor
//   if (lastCursor) lastCursor = lastCursor.replace('=', '')
//   if (!lastCursor) lastCursor = after

//   return { repos: repos.map(transformRepository), lastCursor, hasNextPage }
// }

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

// export default getRepositories
