import React, { useState, useEffect } from 'react'

import { getRepositoriesSearchQuery } from '../../lib/github'
import { useQuery } from '@apollo/react-hooks'
import repositoriesQuery from '../../graphql/repositories.graphql'
import { SortField } from '../../lib/constants'
import { RepositoryGrid, OptionBar } from '../../components'

import './homePage.css'

const HomePage = () => {
  const [sort, setSort] = useState(SortField.STARS_DESC)
  const [cursor, setCursor] = useState(null)
  const { data, loading, error, fetchMore } = useQuery(repositoriesQuery, {
    variables: {
      first: 12,
      repositories: getRepositoriesSearchQuery(sort),
      cursor,
    },
  })

  const { search } = data || {}
  const { nodes: repositories, pageInfo } = search || {}
  const { hasNextPage, endCursor } = pageInfo || {}

  useEffect(() => {
    if (endCursor) {
      setCursor(endCursor.replace('=', ''))
    }
  })

  const updateRepositories = () => {
    fetchMore({
      query: repositoriesQuery,
      variables: {
        first: 12,
        repositories: getRepositoriesSearchQuery(sort),
        cursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const previousEntry = previousResult.entry
        console.log(previousEntry)
        const { search: newSearch } = fetchMoreResult || {}
        const { nodes: newRepositories, pageInfo } = newSearch || {}
        const { hasNextPage, endCursor: newCursor } = pageInfo || {}
        if (endCursor) {
          setCursor(endCursor.replace('=', ''))
        }
        return {
          endCursor: newCursor,
          hasNextPage,
          entry: {
            repositories: [
              ...newRepositories,
              ...previousEntry.data.repositories,
            ],
          },
          __typename: previousEntry.__typename,
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
          <button
            type="button"
            className="show-more-btn"
            onClick={updateRepositories}>
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
