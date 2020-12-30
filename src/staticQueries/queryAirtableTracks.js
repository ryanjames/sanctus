import { graphql, useStaticQuery } from "gatsby"

const queryAirtableTracks = () => {
  const query = useStaticQuery(
    graphql`
      query TracksQuery {
        query: allAirtable(filter: { table: { eq: "Tracks" } }) {
          edges {
            node {
              data {
                Track_Title
              }
            }
          }
        }
      }
    `
  )
  const {
    query: { edges: tracksData },
  } = query

  const tracks = tracksData.map(track => ({
    id: track.node.id,
    title: track.node.data.Track_Title,
  }))

  return tracks
}

export default queryAirtableTracks
