import React from 'react'

import './Mentor.css'

const MentorCard = ({ name, imgUrl }) => (
  <div className="card-mentor">
    <img className="img-mentor" src={imgUrl} alt={name} />
    <figcaption className="name-mentor">{name}</figcaption>
  </div>
)

export default MentorCard
