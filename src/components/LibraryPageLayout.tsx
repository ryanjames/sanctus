import React from "react"
import PageHeading from "./PageHeading"
import ActiveTrackProvider from "../contexts/ActiveTrackContext"
import Container, { Col } from "./Container"
import LibraryCategories from "./LibraryCategories"
import Layout, { LayoutProps } from "./Layout"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { Helmet } from "react-helmet"

interface Props extends LayoutProps {
  id?: string
}

const LibraryPageLayout: React.FC<Props> = ({ title, id, description, children }) => {
  return (
    <StyledLayout title={title} description={description} page="library">
      <PageHeading tw="hidden lg:block" title="Music Library" to="/library" />
      <Helmet>
        <script src="https://unpkg.com/wavesurfer.js"></script>
      </Helmet>
      <Container>
        <div tw="flex flex-nowrap w-full">
          <div tw="w-1/4">
            <LibraryCategories id={id} />
          </div>
          <Col tw="flex-1 pt-10 overflow-auto">
            <div tw="lg:pl-4">
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
`
export default LibraryPageLayout
