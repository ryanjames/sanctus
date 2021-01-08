import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import tw from "twin.macro"

import Layout from "../components/Layout"
import Container, { Col } from "../components/Container"
import PageHeading from "../components/PageHeading"
import TracksTable from "../components/TracksTable"

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

  return (
    <StyledLibraryVibePage>
      <Helmet titleTemplate="%s - Dan Koch">
        <title>{vibe}</title>
        <meta name="description" content="{category.description}" />
      </Helmet>
      <PageHeading tw="hidden lg:block" title="Music Library" to="/library" />
      <Container>
        <div tw="flex flex-nowrap w-full">
          <Col tw="flex-1 pt-10 overflow-auto">
            <div tw="lg:pl-4">
              <TracksTable data={tracksData} title={`Vibe: ${vibe}`} />
            </div>
          </Col>
        </div>
      </Container>
    </StyledLibraryVibePage>
  )
}

const StyledLibraryVibePage = styled(Layout)`
  ${tw``}
`

export default LibraryVibePage

export const pageQuery = graphql`
  query VibeTracksQuery($id: String!) {
    tracks: allAirtable(filter: { table: { eq: "Tracks" }, data: { Vibes: { elemMatch: { id: { eq: $id } } } } }) {
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
