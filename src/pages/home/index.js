import React, { useEffect, useState } from 'react'

import getRepositories from '../../lib/github'
import { SortField } from '../../lib/constants'
import { RepositoryGrid, OptionBar } from '../../components'

import './homePage.css'

const HomePage = () => {
  const [loading, setLoading] = useState(false)
  const [repositories, setRepositories] = useState([])
  const [cursor, setCursor] = useState(null)
  const [sort, setSort] = useState(SortField.STARS_DESC)
  const [hasNextPage, setHasNextPage] = useState(false)

  useEffect(() => {
    updateRepositories()
  }, [sort])

  const updateRepositories = () => {
    setLoading(true)
    getRepositories(cursor, { sort }).then(
      ({ repos, lastCursor, hasNextPage }) => {
        setRepositories(repos)
        setCursor(lastCursor)
        setHasNextPage(hasNextPage)
        setLoading(false)
      }
    )
  }

  return (
    <div className="projects-container">
      <OptionBar
        sort={sort}
        onChange={sort => {
          setSort(sort)
        }}
      />
      <RepositoryGrid repositories={repositories} />
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
