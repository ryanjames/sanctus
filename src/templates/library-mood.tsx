import React from "react"
import { graphql } from "gatsby"
import TracksTable from "../components/TracksTable"
import LibraryPageLayout from "../components/LibraryPageLayout"
import { getTracks, QueryShape, MoodQueryShape } from "../models/tracks"

type Props = {
  data: {
    tracks: QueryShape
    mood: {
      edges: {
        node: MoodQueryShape
      }[]
    }
  }
}

const LibraryMoodPage: React.FC<Props> = ({ data }) => {
  const tracksData = getTracks(data.tracks)
  const mood = data.mood.edges[0].node.data.Mood_Name
  const id = data.mood.edges[0].node.id
  const description = `${mood} music from the library of Sono Sanctus`

  return (
    <LibraryPageLayout title={mood} id={id} description={description}>
      <TracksTable data={tracksData} title={mood} />
    </LibraryPageLayout>
  )
}

export default LibraryMoodPage

export const pageQuery = graphql`
  query MoodTracksQuery($id: String!) {
    tracks: allAirtable(
      filter: { table: { eq: "Tracks" }, data: { Published: { eq: true }, Moods: { elemMatch: { id: { eq: $id } } } } }
    ) {
      edges {
        node {
          data {
            Track_Title
            Moods {
              data {
                Mood_Name
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
    mood: allAirtable(filter: { table: { eq: "Moods" }, id: { eq: $id } }) {
      edges {
        node {
          id
          data {
            Mood_Name
          }
        }
      }
    }
  }
`
