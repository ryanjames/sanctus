import React from "react"
import ActiveTrackProvider from "../contexts/ActiveTrackContext"
import Container, { Col } from "./Container"
import LibraryCategories from "./LibraryCategories"
import Layout, { LayoutProps } from "./Layout"
import PageLink from "../components/PageLink"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { Helmet } from "react-helmet"

interface Props extends LayoutProps {
  id?: string
}

const LibraryPageLayout: React.FC<Props> = ({ title, id, description, children }) => {
  return (
    <StyledLayout title={title} description={description} page="library">
      <Helmet>
        <script src="https://unpkg.com/wavesurfer.js"></script>
      </Helmet>
      <Container>
        <div tw="flex flex-nowrap w-full pt-8">
          <Col tw="w-1/5" className="library-categories">
            <h3>
              <PageLink to="/library">Music Library</PageLink>
            </h3>
            <LibraryCategories id={id} />
          </Col>
          <Col tw="flex-1 overflow-auto">
            <div>
              <ActiveTrackProvider>{children}</ActiveTrackProvider>
            </div>
          </Col>
        </div>
      </Container>
    </StyledLayout>
  )
}

const StyledLayout = styled(Layout)`
  ${tw``}
  .library-categories {
    padding-right: 0 !important;
  }
`
export default LibraryPageLayout
