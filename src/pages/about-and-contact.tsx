import React from "react"
// import PageLink from "../components/PageLink"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Layout from "../components/Layout"
import ContactForm from "../components/ContactForm"
import Container, { Col } from "../components/Container"
import MD from "../utils/MD"
import Img from "gatsby-image"
import withLocation from "../utils/withLocation"
import queryString from "query-string"
import siteContent from "../staticQueries/siteContent"
import PageLink from "../components/PageLink"

type Props = {
  location: {
    search: string
  }
}

const Thanks = () => {
  return (
    <>
      <strong>Thank you for getting in touch with me.</strong>
      <br />
      <p>I&apos;ll respond as quickly as I can.</p>
      <br />
      <PageLink tw="text-hippie-blue underline" to="/about-and-contact">
        Submit another contact request
      </PageLink>
    </>
  )
}

const IndexPage: React.FC<Props> = ({ location }) => {
  const content = siteContent()
  const isThanks = queryString.parse(location.search).thanks
  return (
    <StyledLayout page="about-and-contact">
      <Container>
        <Col tw="flex flex-wrap pt-6 md:pt-24">
          <div tw="w-full md:w-1/3">
            <Img fluid={content.aboutImage} />
          </div>
          <div tw="w-full md:w-2/3 pt-12 md:pt-0 md:pl-24">
            <MD content={content.aboutBody} />
            <iframe
              src="https://hello.dubsado.com:443/public/form/view/5e261ec3aaf30e10a43fc372"
              frameBorder="0"
            ></iframe>
            <div tw="mt-12 pt-12 border-0 border-solid border-t border-gray-200">
              {isThanks ? <Thanks /> : <ContactForm />}
            </div>
          </div>
        </Col>
      </Container>
    </StyledLayout>
  )
}

const StyledLayout = styled(Layout)`
  ${tw``}
  iframe {
    width: 100%;
    height: 500px;
  }
  h3 {
    ${tw`text-lg`}
  }
  p {
    ${tw`mb-8`}
  }
`
export default withLocation(IndexPage)
