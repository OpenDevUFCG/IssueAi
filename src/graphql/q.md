fragment SearchResultFields on SearchResultItemConnection {
nodes {
... on User {
avatarUrl
pullRequests(
first: 100,
states: [OPEN, MERGED],
orderBy: { field: CREATED_AT, direction: DESC }
) {
nodes {
title
createdAt
closed
merged
mergedAt
state
repository {
name
owner {
login
}
}
}
}
}
}
}

query {

search(
first: 100,
query: "user:thayannevls user:ArthurFerrao"
type:USER) {
...SearchResultFields
  
 }
}
