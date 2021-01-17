import React from "react"
import { graphql } from "gatsby"
import TracksTable from "../components/TracksTable"
import LibraryPageLayout from "../components/LibraryPageLayout"
import { getTracks, QueryShape, PlaylistQueryShape } from "../models/tracks"

type Props = {
  data: {
    tracks: QueryShape
    playlist: {
      edges: {
        node: PlaylistQueryShape
      }[]
    }
  }
}

const LibraryGenrePage: React.FC<Props> = ({ data }) => {
  const tracksData = getTracks(data.tracks)
  const playlist = data.playlist.edges[0].node.data.Playlist_Name
  const id = data.playlist.edges[0].node.id
  const description = `${playlist} music from the library of Dan Koch`

  return (
    <LibraryPageLayout title={playlist} id={id} description={description}>
      <TracksTable data={tracksData} title={playlist} />
    </LibraryPageLayout>
  )
}

export default LibraryGenrePage

export const pageQuery = graphql`
  query PlaylistTracksQuery($id: String!) {
    tracks: allAirtable(
      filter: {
        table: { eq: "Tracks" }
        data: { Has_Parent: { eq: 0 }, Playlists: { elemMatch: { id: { eq: $id } } } }
      }
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
    playlist: allAirtable(filter: { table: { eq: "Playlists" }, id: { eq: $id } }) {
      edges {
        node {
          id
          data {
            Playlist_Name
          }
        }
      }
    }
  }
`
