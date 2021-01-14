import React from "react"
// import PageLink from "../components/PageLink"
//import siteContent from "../staticQueries/siteContent"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Layout from "../components/Layout"
import FeatureCards from "../components/FeatureCards"
import Hero from "../components/Hero"
import features from "../staticQueries/features"
import siteContent from "../staticQueries/siteContent"

const IndexPage: React.FC = () => {
  const content = siteContent()
  return (
    <StyledLayout page="home">
      <Hero content={content.homeIntro} />
      <FeatureCards features={features()} />
    </StyledLayout>
  )
}

const StyledLayout = styled(Layout)`
  ${tw``}
`
export default IndexPage
