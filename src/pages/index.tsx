import React from "react"
// import PageLink from "../components/PageLink"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Layout from "../components/Layout"
import Container, { Col } from "../components/Container"
import FeatureCards from "../components/FeatureCards"
import features from "../staticQueries/features"
import siteContent from "../staticQueries/siteContent"

const IndexPage: React.FC = () => {
  console.log(siteContent())
  return (
    <StyledLayout>
      <Container>
        <Col>Dan Koch</Col>
      </Container>
      <FeatureCards features={features()} />
    </StyledLayout>
  )
}

const StyledLayout = styled(Layout)`
  ${tw``}
`
export default IndexPage
