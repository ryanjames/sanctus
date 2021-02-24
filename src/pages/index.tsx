import React from "react"
// import PageLink from "../components/PageLink"
//import siteContent from "../staticQueries/siteContent"
import { TransitionState } from "gatsby-plugin-transition-link"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Layout from "../components/Layout"
import CaseStudiesWaveform from "../components/CaseStudiesWaveform"

const IndexPage: React.FC = () => {
  return (
    <StyledLayout page="home">
      <CaseStudiesWaveform />
    </StyledLayout>
  )
}

const StyledLayout = styled(Layout)`
  ${tw``}
`
export default IndexPage
