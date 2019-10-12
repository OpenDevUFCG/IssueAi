import projects from './repositories.json';

const mentors = projects.repositories.map(obj => obj.mentors);

export default mentors;
