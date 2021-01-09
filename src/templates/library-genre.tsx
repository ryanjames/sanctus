import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import tw from "twin.macro"

import Layout from "../components/Layout"
import Container, { Col } from "../components/Container"
import PageHeading from "../components/PageHeading"
import TracksTable from "../components/TracksTable"
import ActiveTrackProvider from "../contexts/ActiveTrackContext"

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

  return (
    <StyledLibraryGenrePage>
      <Helmet titleTemplate="%s - Dan Koch">
        <title>{genre}</title>
        <meta name="description" content="{category.description}" />
      </Helmet>
      <PageHeading tw="hidden lg:block" title="Music Library" to="/library" />
      <Container>
        <div tw="flex flex-nowrap w-full">
          <Col tw="flex-1 pt-10 overflow-auto">
            <div tw="lg:pl-4">
              <ActiveTrackProvider>
                <TracksTable data={tracksData} title={`Genre: ${genre}`} />
              </ActiveTrackProvider>
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
