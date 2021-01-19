import React, { useState } from "react"
import ActiveTrackProvider from "../contexts/ActiveTrackContext"
import Container, { Col } from "./Container"
import LibraryCategories from "./LibraryCategories"
import Layout, { LayoutProps } from "./Layout"
import PageLink from "../components/PageLink"
import Filter from "../graphics/filter.svg"
import { mQw, sizes, gutters } from "../utils/mediaQueries"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { Helmet } from "react-helmet"

interface Props extends LayoutProps {
  id?: string
}

const LibraryPageLayout: React.FC<Props> = ({ title, id, description, children }) => {
  const [open, setOpen] = useState(false)

  const openMenu = () => {
    setOpen(true)
  }

  const closeMenu = () => {
    setOpen(false)
  }

  return (
    <StyledLayout maxWidths={sizes} title={title} description={description} page="library">
      <Helmet>
        <script src="https://unpkg.com/wavesurfer.js"></script>
      </Helmet>
      <Container tw="pt-6 sm:pt-12">
        <Col
          className={`library-categories ${open ? "-open" : ""}`}
          tw="absolute inset-0 z-30 bg-white sm:relative sm:block sm:w-1/3 md:w-1/4"
        >
          <Container>
            <h3 tw="hidden sm:inline mb-0">
              <PageLink to="/library">Music Library</PageLink>
            </h3>
            <LibraryCategories id={id} closeMenu={closeMenu} />
          </Container>
        </Col>
        <Col tw="flex-1 overflow-visible relative">
          <div tw="sm:hidden flex justify-between pb-6">
            <h3 tw="mb-0">
              <PageLink to="/library">Music Library</PageLink>
            </h3>
            <Filter onClick={openMenu} tw="cursor-pointer mt-1" />
          </div>
          <div className="table-size">
            <ActiveTrackProvider>{children}</ActiveTrackProvider>
          </div>
        </Col>
      </Container>
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
console.log(tableWidthQueries)

const StyledLayout = styled(Layout)<{ maxWidths: Map<string, string> }>`
  ${tw``}
  .library-categories {
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
    position: absolute;
    @media (max-width: 480px) {
      width: 86%;
    }
    @media (max-width: 1024px) {
      width: 88%;
    }
    ${tableWidthQueries}
  }
`
export default LibraryPageLayout
