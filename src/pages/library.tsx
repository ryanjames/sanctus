import React from "react"
import { graphql } from "gatsby"
import TracksTable from "../components/TracksTable"
import LibraryPageLayout from "../components/LibraryPageLayout"
import styled from "@emotion/styled"
import { getTracks, QueryShape } from "../models/tracks"
import queryString from "query-string"
import withLocation from "../utils/withLocation"
import FilteredTracksProvider from "../contexts/FilteredTracksContext"

type Props = {
  data: { tracks: QueryShape }
  className?: string
  location: {
    search: string
  }
}

const Library: React.FC<Props> = ({ data, location, className }) => {
  const tracksData = getTracks(data.tracks)
  const description = `Music from the library of Sono Sanctus`

  return (
    <>
      <FilteredTracksProvider>
        <StyledLibraryPageLayout
          tracksData={tracksData}
          className={className}
          title="Music Library"
          description={description}
        >
          <TracksTable data={tracksData} urlQuery={queryString.parse(location.search)} />
        </StyledLibraryPageLayout>
      </FilteredTracksProvider>
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
            Playlists {
              data {
                Playlist_Name
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
