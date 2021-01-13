import React from "react"
import PageHeading from "./PageHeading"
import ActiveTrackProvider from "../contexts/ActiveTrackContext"
import Container, { Col } from "./Container"
import LibraryCategories from "./LibraryCategories"
import Layout from "./Layout"
import styled from "@emotion/styled"
import tw from "twin.macro"

interface Props {
  title: string
  id?: string
  description: string
}

const LibraryPageLayout: React.FC<Props> = ({ title, id, description, children }) => {
  return (
    <StyledLayout>
      <PageHeading tw="hidden lg:block" title="Music Library" to="/library" />
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
