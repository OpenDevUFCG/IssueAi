import React from 'react'
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'
import './MarkDownRenderer.css'

const MarkDownRenderer = ({ markDownText }) => (
  <ReactMarkdown source={markDownText} className="markdown" />
)

MarkDownRenderer.propTypes = {
  markDownText: PropTypes.string.isRequired,
}

export default MarkDownRenderer
