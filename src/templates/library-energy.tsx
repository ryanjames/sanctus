import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import tw from "twin.macro"

import Layout from "../components/Layout"
import Container, { Col } from "../components/Container"
import PageHeading from "../components/PageHeading"
import TracksTable from "../components/TracksTable"

import { getTracks, QueryShape } from "../models/tracks"

type Props = { data: { tracks: QueryShape } }

const LibraryEnergyPage: React.FC<Props> = ({ data }) => {
  const tracksData = getTracks(data.tracks)
  const energy = tracksData[0].energy.name

  return (
    <StyledLibraryEnergyPage>
      <Helmet titleTemplate="%s - Dan Koch">
        <title>{energy}</title>
        <meta name="description" content="{category.description}" />
      </Helmet>
      <PageHeading tw="hidden lg:block" title="Music Library" to="/library" />
      <Container>
        <div tw="flex flex-nowrap w-full">
          <Col tw="flex-1 pt-10 overflow-auto">
            <div tw="lg:pl-4">
              <TracksTable data={tracksData} title={`Energy: ${energy}`} />
            </div>
          </Col>
        </div>
      </Container>
    </StyledLibraryEnergyPage>
  )
}

const StyledLibraryEnergyPage = styled(Layout)`
  ${tw``}
`

export default LibraryEnergyPage

export const pageQuery = graphql`
  query EnergyTracksQuery($id: String!) {
    tracks: allAirtable(filter: { table: { eq: "Tracks" }, data: { Energy: { elemMatch: { id: { eq: $id } } } } }) {
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
  }
`
