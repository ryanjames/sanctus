import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import tw from "twin.macro"

import Layout from "../components/Layout"
import Container, { Col } from "../components/Container"
import PageHeading from "../components/PageHeading"
import TracksTable from "../components/TracksTable"

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

  return (
    <StyledLibraryGenrePage>
      <Helmet titleTemplate="%s - Dan Koch">
        <title>{playlist}</title>
        <meta name="description" content="{category.description}" />
      </Helmet>
      <PageHeading tw="hidden lg:block" title="Music Library" to="/library" />
      <Container>
        <div tw="flex flex-nowrap w-full">
          <Col tw="flex-1 pt-10 overflow-auto">
            <div tw="lg:pl-4">
              <TracksTable data={tracksData} title={playlist} />
            </div>
          </Col>
        </div>
      </Container>
    </StyledLibraryGenrePage>
  )
}

const StyledLibraryGenrePage = styled(Layout)`
  ${tw``}
`

export default LibraryGenrePage

export const pageQuery = graphql`
  query PlaylistTracksQuery($id: String!) {
    tracks: allAirtable(filter: { table: { eq: "Tracks" }, data: { Playlists: { elemMatch: { id: { eq: $id } } } } }) {
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
            Length
            Priority
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
