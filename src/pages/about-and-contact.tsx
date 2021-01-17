import React from "react"
// import PageLink from "../components/PageLink"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Layout from "../components/Layout"
import ContactForm from "../components/ContactForm"
import Container, { Col } from "../components/Container"
import MD from "../utils/MD"
import Img from "gatsby-image"
import siteContent from "../staticQueries/siteContent"

const IndexPage: React.FC = () => {
  const content = siteContent()
  return (
    <StyledLayout page="about-and-contact">
      <Container>
        <Col tw="flex flex-wrap pt-24">
          <div tw="w-1/3">
            <Img fluid={content.aboutImage} />
          </div>
          <div tw="w-2/3 pl-24">
            <MD content={content.aboutBody} />
            <div tw="mt-12 pt-12 border-0 border-solid border-t border-gray-200">
              <ContactForm />
            </div>
          </div>
        </Col>
      </Container>
    </StyledLayout>
  )
}

const StyledLayout = styled(Layout)`
  ${tw``}
  h3 {
    ${tw`text-lg`}
  }
  p {
    ${tw`mb-8`}
  }
`
export default IndexPage
