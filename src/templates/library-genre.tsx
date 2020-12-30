import React from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import tw from "twin.macro"

import Layout from "../components/Layout"
import Container, { Col } from "../components/Container"
import PageHeading from "../components/PageHeading"
import TracksTable from "../components/TracksTable"
import PageLink from "../components/PageLink"
import pluralize from "pluralize"

const LibraryGenrePageComponent = ({ data, location }) => {
  const tracksData = data.tracks.edges.map(track => ({
    id: track.node.id,
    title: track.node.data.TrackTitle,
  }))
  const genre = data.genre.edges.map(genre => ({
    name: pluralize(genre.node.data.Genre_Name),
  }))[0]

  return (
    <Layout>
      <Helmet titleTemplate="%s - Techna NDT">
        <title>{genre.name}</title>
        <meta name="description" content="{category.description}" />
      </Helmet>
      <PageHeading tw="hidden lg:block" title="Music Library" />
      <Container>
        <div tw="flex flex-nowrap w-full">
          <Col tw="flex-1 pt-10 overflow-auto">
            <div tw="lg:pl-4">
              <TracksTable data={tracksData} genre={genre} />
            </div>
          </Col>
        </div>
      </Container>
    </Layout>
  )
}

LibraryGenrePageComponent.propTypes = {
  helmet: PropTypes.object,
  data: PropTypes.object.isRequired,
  location: PropTypes.object,
}

const LibraryGenrePage = styled(LibraryGenrePageComponent)`
  ${tw``}
`

export default LibraryGenrePage

export const pageQuery = graphql`
  query PageQuery($id: String!) {
    tracks: allAirtable(filter: { table: { eq: "Tracks" }, data: { Genres: { elemMatch: { id: { eq: $id } } } } }) {
      edges {
        node {
          data {
            Track_Title
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
