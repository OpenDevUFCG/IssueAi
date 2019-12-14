import { pluck, flatten, uniqWith, eqProps } from 'ramda'
import projects from './repositories.json'

const getMentors = () => {
  const mentors = flatten(pluck('mentors', projects.repositories))
  const uniqueMentors = uniqWith(eqProps('name'))(mentors)

  return uniqueMentors
}

export default getMentors
