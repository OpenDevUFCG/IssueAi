import React from 'react'

import MentorCard from './MentorCard'
import getMentors from '../../../data'
import './Mentor.css'

const renderMentors = mentorsList => {
  return mentorsList.map((mentor, i) => (
    <MentorCard
      name={mentor.name}
      imgUrl={mentor.imgUrl}
      key={`${mentor.name}--${i}`}
    />
  ))
}

const MentorsList = () => (
  <div className="mentor-grid">{renderMentors(getMentors())}</div>
)

export default MentorsList
