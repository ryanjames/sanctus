import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Layout from "../components/Layout"
import CaseStudiesWaveform from "../components/CaseStudiesWaveform"
import CaseStudiesWaveformMobile from "../components/CaseStudiesWaveformMobile"

const IndexPage: React.FC = () => {
  return (
    <StyledLayout page="home">
      <span tw="hidden md:inline">
        <CaseStudiesWaveform />
      </span>
      <span tw="md:hidden">
        <CaseStudiesWaveformMobile />
      </span>
    </StyledLayout>
  )
}

const StyledLayout = styled(Layout)`
  ${tw`flex items-center justify-center h-full w-full`}
  min-height: 100vh;
`
export default IndexPage
