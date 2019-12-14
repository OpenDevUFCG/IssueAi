import React, { useState } from 'react'

import { getRepositoriesSearchQuery } from '../../utils/githubSearch'
import { useQuery } from '@apollo/react-hooks'
import repositoriesQuery from '../../graphql/repositories.graphql'
import { SortField } from '../../utils/constants'
import { RepositoryGrid, OptionBar } from '../../components'

import './homePage.css'

const HomePage = () => {
  const [sort, setSort] = useState(SortField.STARS_DESC)
  const { data, loading, error, fetchMore } = useQuery(repositoriesQuery, {
    variables: {
      repositories: getRepositoriesSearchQuery(sort),
    },
  })

  const { search } = data || {}
  const { nodes: repositories, pageInfo } = search || {}
  const { hasNextPage, endCursor } = pageInfo || {}

  const onFetchMore = () => {
    fetchMore({
      query: repositoriesQuery,
      variables: {
        repositories: getRepositoriesSearchQuery(sort),
        cursor: endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const { search: newSearch } = fetchMoreResult || {}
        const { nodes: newRepositories, pageInfo, repositoryCount } =
          newSearch || {}

        return {
          search: {
            __typename: previousResult.search.__typename,
            pageInfo,
            nodes: [...previousResult.search.nodes, ...newRepositories],
            repositoryCount,
          },
        }
      },
    })
  }

  return (
    <div className="projects-container">
      <OptionBar
        sort={sort}
        onChange={sort => {
          setSort(sort)
        }}
      />
      <RepositoryGrid repositories={repositories || []} />
      <div className="footer">
        {hasNextPage && (
          <button type="button" className="show-more-btn" onClick={onFetchMore}>
            {loading ? (
              <div className="loader" role="img" aria-label="loading" />
            ) : (
              <h2 className="show-more-btn-text">Ver mais</h2>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default HomePage
