import React from "react"
import { graphql } from "gatsby"
import TracksTable from "../components/TracksTable"
import LibraryPageLayout from "../components/LibraryPageLayout"
import { getTracks, QueryShape } from "../models/tracks"
import GenreCards from "../components/GenreCards"

type Props = { data: { tracks: QueryShape } }

const Library: React.FC<Props> = ({ data }) => {
  const tracksData = getTracks(data.tracks)
  const description = `Music from the library of Dan Koch`

  return (
    <LibraryPageLayout title="Music Library" description={description}>
      <TracksTable placeholder={<GenreCards />} data={tracksData} />
    </LibraryPageLayout>
  )
}

export default Library

export const pageQuery = graphql`
  query TracksQuery {
    tracks: allAirtable(filter: { table: { eq: "Tracks" }, data: { Has_Parent: { eq: 0 } } }) {
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
            URL
            Length
            Priority
          }
          id
        }
      }
    }
  }
`
