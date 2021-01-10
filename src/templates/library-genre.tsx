import React from "react"
import { graphql } from "gatsby"
import TracksTable from "../components/TracksTable"
import LibraryPageLayout from "../components/LibraryPageLayout"
import { getTracks, QueryShape, GenreQueryShape } from "../models/tracks"

type Props = {
  data: {
    tracks: QueryShape
    genre: {
      edges: {
        node: GenreQueryShape
      }[]
    }
  }
}

const LibraryGenrePage: React.FC<Props> = ({ data }) => {
  const tracksData = getTracks(data.tracks)
  const genre = data.genre.edges[0].node.data.Genre_Name
  const id = data.genre.edges[0].node.id
  const description = `${genre} music from the library of Dan Koch`

  return (
    <LibraryPageLayout title={genre} id={id} description={description}>
      <TracksTable data={tracksData} title={genre} />
    </LibraryPageLayout>
  )
}

export default LibraryGenrePage

export const pageQuery = graphql`
  query GenreTracksQuery($id: String!) {
    tracks: allAirtable(filter: { table: { eq: "Tracks" }, data: { Genres: { elemMatch: { id: { eq: $id } } } } }) {
      edges {
        node {
          data {
            Track_Title
            Parent {
              id
            }
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
            URL
            Length
            Priority
          }
          id
        }
      }
    }
    genre: allAirtable(filter: { table: { eq: "Genres" }, id: { eq: $id } }) {
      edges {
        node {
          id
          data {
            Genre_Name
          }
        }
      }
    }
  }
`
