import React from 'react'
import './teamPage.css'

const TeamMember = ({ name, urlGithub }) => (
  <div className="member">
    <a href={urlGithub}>
      <img className="member-image" src={`${urlGithub}.png`} alt={urlGithub} />
    </a>
    <figcaption className="member-name">{name}</figcaption>
  </div>
)

export default TeamMember
