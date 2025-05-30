import React from "react"
// import PageLink from "../components/PageLink"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Layout from "../components/Layout"
import Container, { Col } from "../components/Container"

const NotFoundPage: React.FC = () => {
  return (
    <StyledLayout>
      <Container>
        <Col>404 Not Found</Col>
      </Container>
    </StyledLayout>
  )
}

const StyledLayout = styled(Layout)`
  ${tw``}
`
export default NotFoundPage
