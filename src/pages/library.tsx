import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Container, { Col } from "../components/Container"
import PageHeading from "../components/PageHeading"
import TracksTable from "../components/TracksTable"
import GenreCards from "../components/GenreCards"

import queryAirtableTracks from "../staticQueries/queryAirtableTracks"

const Library: React.FC = () => {
  const tracksData = queryAirtableTracks()
  console.log(tracksData)

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
