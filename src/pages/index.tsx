import React from "react"
// import PageLink from "../components/PageLink"
//import siteContent from "../staticQueries/siteContent"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Layout from "../components/Layout"

const IndexPage: React.FC = () => {
  return (
    <StyledLayout page="home">
      <></>
    </StyledLayout>
  )
}

const StyledLayout = styled(Layout)`
  ${tw``}
`
export default IndexPage
