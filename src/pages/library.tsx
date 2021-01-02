import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Container, { Col } from "../components/Container"
import PageHeading from "../components/PageHeading"
import TracksTable from "../components/TracksTable"
import GenreCards from "../components/GenreCards"

import { shapeTracks, QueryShape } from "../staticQueries/queryAirtableTracks"

const Library: React.FC = ({ data }) => {
  const tracksData = shapeTracks(data)

  return (
    <Layout>
      <Container>
        <Col>
          <SEO title="Music Library" />
          <PageHeading tw="hidden lg:block" title="Music Library" />
          <TracksTable placeholder={<GenreCards />} data={tracksData} />
        </Col>
      </Container>
    </Layout>
  )
}

export default Library

export const pageQuery = graphql`
  query TracksQuery {
    query: allAirtable(filter: { table: { eq: "Tracks" } }) {
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
            Length
            Priority
            Energy
          }
          id
        }
      }
    }
  }
`
