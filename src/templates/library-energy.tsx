import React from "react"
import { graphql } from "gatsby"
import TracksTable from "../components/TracksTable"
import LibraryPageLayout from "../components/LibraryPageLayout"
import { getTracks, QueryShape } from "../models/tracks"

type Props = { data: { tracks: QueryShape } }

const LibraryEnergyPage: React.FC<Props> = ({ data }) => {
  const tracksData = getTracks(data.tracks)
  const energy = tracksData[0].energy.name
  const id = tracksData[0].energy.id
  const description = `${energy} energy music from the library of Dan Koch`

  return (
    <LibraryPageLayout title={`${energy} Energy`} id={id} description={description}>
      <TracksTable data={tracksData} title={`${energy} Energy`} />
    </LibraryPageLayout>
  )
}

export default LibraryEnergyPage

export const pageQuery = graphql`
  query EnergyTracksQuery($id: String!) {
    tracks: allAirtable(
      filter: {
        table: { eq: "Tracks" }
        data: { Published: { eq: true }, Has_Parent: { eq: 0 }, Energy: { elemMatch: { id: { eq: $id } } } }
      }
    ) {
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
  }
`
