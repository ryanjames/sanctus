import React, { useState } from "react"
import ActiveTrackProvider from "../contexts/ActiveTrackContext"
import SharedTrackProvider from "../contexts/SharedTrackContext"
import Container, { Col } from "./Container"
import withLocation from "../utils/withLocation"
import LibraryCategories from "./LibraryCategories"
import TrackShare from "../components/TrackShare"
import { TrackShape } from "../models/tracks"
import Layout, { LayoutProps } from "./Layout"
import PageLink from "../components/PageLink"
import Filter from "../graphics/filter.svg"
import { mQw, sizes, gutters } from "../utils/mediaQueries"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { Helmet } from "react-helmet"

interface Props extends LayoutProps {
  search: {
    track: string
  }
  tracksData: TrackShape[]
  selectedData: []
  setTracksData: Function
}

const LibraryPageLayout: React.FC<Props> = ({ title, tracksData, description, children }) => {
  const [open, setOpen] = useState(false)

  const openMenu = () => {
    setOpen(true)
  }

  const closeMenu = () => {
    setOpen(false)
  }

  return (
    <StyledLayout maxWidths={sizes} title={title} description={description} page="library">
      <SharedTrackProvider>
        <Helmet>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/wavesurfer.js/3.3.1/wavesurfer.js"></script>
        </Helmet>
        <TrackShare />
        <Container tw="pt-6 sm:pt-12">
          <Col>
            <div tw="sm:hidden flex justify-between pb-6">
              <h3 tw="mb-0">
                <PageLink to="/library">Music Library</PageLink>
              </h3>
              <Filter onClick={openMenu} tw="cursor-pointer mt-1" />
            </div>
          </Col>
          <Col tw="flex-1 md:overflow-y-visible overflow-x-hidden relative" className="inner-container">
            <ActiveTrackProvider>
              <div className="table-size">{children}</div>
            </ActiveTrackProvider>
          </Col>
          <Col
            className={`library-categories ${open ? "-open" : ""}`}
            tw="absolute inset-0 bg-near-black z-50 sm:relative sm:block sm:w-1/3 md:w-1/4"
          >
            <Container>
              <LibraryCategories tracksData={tracksData} closeMenu={closeMenu} />
            </Container>
          </Col>
        </Container>
      </SharedTrackProvider>
    </StyledLayout>
  )
}

let tableWidthQueries = `margin-right: ${gutters["base"]};`
let i = 0
mQw.forEach((value: string, key: string) => {
  const gutterKey = Object.keys(gutters)[i]
  const gutterValue = (gutters as any)[gutterKey]
  if (i < 3) {
    tableWidthQueries = tableWidthQueries.concat(
      `
      @media (${value}) { 
        margin-right: ${gutterValue};
      };`
    )
  } else {
    const outerSpace = `(100vw - ${sizes.get(key)}) / 2`
    tableWidthQueries = tableWidthQueries.concat(
      `
      @media (${value}) { 
        margin-left: 0;
        width: calc((${sizes.get(key)} * 0.75) + ${outerSpace} - ${gutterValue});
      };`
    )
  }
  i += 1
})

const StyledLicensingBar = styled.div`
  margin-bottom: 32px;
  gap: 24px;
  align-items: center;
  p { flex: 1; }
  a {
    height: 40px;
    transition: all 0.2s ease-in-out;
    ${tw`rounded bg-gray-700 py-2 px-3 mr-3 border-0 text-white`}
    &:hover {
      cursor: pointer;
      ${tw`bg-gray-500`}
    }
  }
  @media (min-width: 480px) {
    display: flex;
    p { margin-bottom: 0; }
    a { display: flex; }
  }
`

const StyledLayout = styled(Layout)<{ maxWidths: Map<string, string> }>`
  ${tw``}
  .inner-container {
    height: calc(100vh - 160px);
  }
  .library-categories {
    ${tw`pt-24 sm:pt-12`}
    padding-left: 0 !important;
    overflow: hidden;
    .close {
      position: fixed;
    }
    .close path {
      fill: #ffffff !important;
    }
    @media (max-width: 640px) {
      transition: transform 0.4s ease-in-out;
      transform: translateY(-140%);
      &.-open {
        transform: translateY(0);
      }
    }
    > div {
      padding-right: 0 !important;
      margin: 0 auto;
      max-width: 312px;
      width: 100%;
      padding-top: 4%;
      @media (min-width: 480px) {
        max-width: 424px;
      }
      @media (min-width: 640px) {
        padding-top: 0;
      }
    }
  }
  .table-size {
    margin-right: 0px !important;
    overflow: hidden;
    @media (min-width: 640px) {
      position: absolute;
      margin-right: 24px;
    }
    @media (min-width: 640px) and (max-width: 1024px) {
      width: 88%;
    }
    ${tableWidthQueries}
  }
`
export default withLocation(LibraryPageLayout)
