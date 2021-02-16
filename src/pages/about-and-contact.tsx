import React from "react"
// import PageLink from "../components/PageLink"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Layout from "../components/Layout"
import Container, { Col } from "../components/Container"
import MD from "../utils/MD"
import withLocation from "../utils/withLocation"
import siteContent from "../staticQueries/siteContent"

type Props = {
  location: {
    search: string
  }
}

const IndexPage: React.FC<Props> = () => {
  const content = siteContent()
  return (
    <StyledLayout page="about-and-contact">
      <Container>
        <Col tw="w-1/3 pt-16">
          <h2 tw="text-5xl text-hippie-blue leading-tight">{content.about.heading}</h2>
        </Col>
        <Col tw="w-2/3 flex flex-wrap pt-6 md:pt-16">
          <div tw="w-full md:w-2/3 pt-12 md:pt-0 md:pl-24">
            <MD content={content.about.body} />
            <iframe
              src="https://hello.dubsado.com:443/public/form/view/5e261ec3aaf30e10a43fc372"
              frameBorder="0"
            ></iframe>
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
