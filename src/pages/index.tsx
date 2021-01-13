import React from "react"
// import PageLink from "../components/PageLink"
import { Helmet } from "react-helmet"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Container, { Col } from "../components/Container"

import features from "../staticQueries/features"

const IndexPage: React.FC = () => {
  console.log(features)
  return (
    <StyledIndexPage>
      <Helmet titleTemplate="%s - Dan Koch">
        <title>Dan Koch</title>
        <meta name="description" content="Website description" />
      </Helmet>
      <SEO title="Dan Koch" description="Website description" />
      <Container>
        <Col tw="flex-1 pt-10 overflow-auto">FEATURES GRID</Col>
      </Container>
    </StyledIndexPage>
  )
}

const StyledIndexPage = styled(Layout)`
  ${tw``}
`
export default IndexPage
