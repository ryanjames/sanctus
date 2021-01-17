import React from "react"
import { graphql } from "gatsby"
import TracksTable from "../components/TracksTable"
import LibraryPageLayout from "../components/LibraryPageLayout"
import { getTracks, QueryShape, VibeQueryShape } from "../models/tracks"

type Props = {
  data: {
    tracks: QueryShape
    vibe: {
      edges: {
        node: VibeQueryShape
      }[]
    }
  }
}

const LibraryVibePage: React.FC<Props> = ({ data }) => {
  const tracksData = getTracks(data.tracks)
  const vibe = data.vibe.edges[0].node.data.Vibe_Name
  const id = data.vibe.edges[0].node.id
  const description = `${vibe} music from the library of Dan Koch`

  return (
    <LibraryPageLayout title={vibe} id={id} description={description}>
      <TracksTable data={tracksData} title={vibe} />
    </LibraryPageLayout>
  )
}

export default LibraryVibePage

export const pageQuery = graphql`
  query VibeTracksQuery($id: String!) {
    tracks: allAirtable(
      filter: { table: { eq: "Tracks" }, data: { Has_Parent: { eq: 0 }, Vibes: { elemMatch: { id: { eq: $id } } } } }
    ) {
      edges {
        node {
          data {
            Track_Title
            Parent {
              id
            }
            Has_Parent
            Genres {
              data {
                Genre_Name
              }
              id
            }
            Vibes {
              data {
                Vibe_Name
              }
              id
            }
            Energy {
              data {
                Energy_Name
              }
              id
            }
            Length
            Priority
            URL
          }
          id
        }
      }
    }
    vibe: allAirtable(filter: { table: { eq: "Vibes" }, id: { eq: $id } }) {
      edges {
        node {
          id
          data {
            Vibe_Name
          }
        }
      }
    }
  }
`
