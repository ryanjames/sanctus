import React from "react"
import ActiveTrackProvider from "../contexts/ActiveTrackContext"
import Container, { Col } from "./Container"
import LibraryCategories from "./LibraryCategories"
import Layout, { LayoutProps } from "./Layout"
import PageLink from "../components/PageLink"
import { mQw, sizes, gutters } from "../utils/mediaQueries"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { Helmet } from "react-helmet"

interface Props extends LayoutProps {
  id?: string
}

const LibraryPageLayout: React.FC<Props> = ({ title, id, description, children }) => {
  return (
    <StyledLayout maxWidths={sizes} title={title} description={description} page="library">
      <Helmet>
        <script src="https://unpkg.com/wavesurfer.js"></script>
      </Helmet>
      <Container tw="pt-12">
        <Col tw="w-1/4" className="library-categories">
          <h3>
            <PageLink to="/library">Music Library</PageLink>
          </h3>
          <LibraryCategories id={id} />
        </Col>
        <Col tw="flex-1 overflow-visible">
          <div className="table-size">
            <ActiveTrackProvider>{children}</ActiveTrackProvider>
          </div>
        </Col>
      </Container>
    </StyledLayout>
  )
}

let mediaQueries = ""
let i = 0
mQw.forEach((value: string, key: string) => {
  const outerSpace = `(100vw - ${sizes.get(key)}) / 2`
  const gutterKey = Object.keys(gutters)[i]
  const gutterValue = parseInt((gutters as any)[gutterKey].replace("px", "")) + "px"
  mediaQueries = mediaQueries.concat(
    `
    @media (${value}) { 
      width: calc((${sizes.get(key)} * 0.75) + ${outerSpace} - ${gutterValue});
    }`
  )
  i += 1
})

const StyledLayout = styled(Layout)<{ maxWidths: Map<string, string> }>`
  ${tw``}
  .library-categories {
    padding-right: 0 !important;
  }
  .table-size {
    position: absolute;
    ${mediaQueries}
  }
`
export default LibraryPageLayout
