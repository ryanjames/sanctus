import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/Layout"
import SEO from "../../components/SEO"
import Container, { Col } from "../../components/Container"
import PageHeading from "../../components/PageHeading"
import TracksTable from "../../components/TracksTable"

import { getTracks, QueryShape } from "../../models/tracks"

type Props = { data: { tracks: QueryShape } }

const Library: React.FC<Props> = ({ data }) => {
  const tracksData = getTracks(data.tracks)

  return (
    <Layout>
      <Container>
        <Col>
          <SEO title="Music Library" />
          <PageHeading tw="hidden lg:block" title="Music Library" />
          <TracksTable data={tracksData} />
        </Col>
      </Container>
    </Layout>
  )
}

export default Library

export const pageQuery = graphql`
  query AllTracksQuery {
    tracks: allAirtable(filter: { table: { eq: "Tracks" } }) {
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
