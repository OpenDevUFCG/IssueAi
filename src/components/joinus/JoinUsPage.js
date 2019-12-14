import React, { useState, useEffect } from 'react'
import MarkDownRenderer from '../commons/renderer/MarkDownRenderer'
import joinUsFile from './JoinUs.md'

const JoinUsPage = () => {
  const [markDownText, setMarkDownText] = useState('')

  useEffect(() => {
    async function fetchFileAndSetState() {
      const response = await fetch(joinUsFile)
      const text = await response.text()
      setMarkDownText(text)
    }

    fetchFileAndSetState()
  }, [])

  return (
    <section>
      <MarkDownRenderer markDownText={markDownText} />
      <br />
    </section>
  )
}

export default JoinUsPage
