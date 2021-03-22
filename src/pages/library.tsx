import React from "react"
import { graphql } from "gatsby"
import TracksTable from "../components/TracksTable"
import TrackSheet from "../components/TrackSheet"
import withLocation from "../utils/withLocation"
import LibraryPageLayout from "../components/LibraryPageLayout"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { getTracks, QueryShape } from "../models/tracks"
import queryString from "query-string"
import PlaylistCards from "../components/PlaylistCards"

type Props = {
  data: { tracks: QueryShape }
  location: {
    search: string
  }
}

const Library: React.FC<Props> = ({ data, location, className }) => {
  const tracksData = getTracks(data.tracks)
  const description = `Music from the library of Sono Sanctus`

  let sharedTrack
  if (location.search) {
    const queriedTrackId = queryString.parse(location.search).track
    console.log(queriedTrackId)
    sharedTrack = tracksData.filter(obj => {
      return obj.id == queriedTrackId
    })[0]
  }

  return (
    <>
      {sharedTrack && <TrackSheet track={sharedTrack} />}
      <StyledLibraryPageLayout
        className={className}
        tracksData={tracksData}
        title="Music Library"
        description={description}
      >
        <TracksTable data={tracksData} />
      </StyledLibraryPageLayout>
    </>
  )
}

export default withLocation(Library)

const StyledLibraryPageLayout = styled(LibraryPageLayout)`
  height: calc(100vh - 200px);
`

export const pageQuery = graphql`
  query TracksQuery {
    tracks: allAirtable(filter: { table: { eq: "Tracks" }, data: { Published: { eq: true } } }) {
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
  }
`
