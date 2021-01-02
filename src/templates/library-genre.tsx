import React from "react"
import { Helmet } from "react-helmet"
import styled from "@emotion/styled"
import withLocation from "../utils/withLocation"
import { lastUrlSegment, toTitle } from "../utils/strings"
import tw from "twin.macro"

import Layout from "../components/Layout"
import Container, { Col } from "../components/Container"
import PageHeading from "../components/PageHeading"
import TracksTable from "../components/TracksTable"

import queryAirtableTracks, { ParentTrackShape } from "../staticQueries/queryAirtableTracks"

const LibraryGenrePage: React.FC = () => {
  const genreSlug = lastUrlSegment(location.pathname)
  const genreName = toTitle(genreSlug)

  const tracks = queryAirtableTracks().filter((track: ParentTrackShape) => {
    return track.genres.some(genre => genre.slug === genreSlug)
  })

  return (
    <StyledLibraryGenrePage>
      <Helmet titleTemplate="%s - Techna NDT">
        <title>{genreName}</title>
        <meta name="description" content="{category.description}" />
      </Helmet>
      <PageHeading tw="hidden lg:block" title="Music Library" to="/library" />
      <Container>
        <div tw="flex flex-nowrap w-full">
          <Col tw="flex-1 pt-10 overflow-auto">
            <div tw="lg:pl-4">
              <TracksTable data={tracks} genre={genreName} />
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

export default withLocation(LibraryGenrePage)
