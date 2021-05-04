import React from "react"
// import PageLink from "../components/PageLink"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Layout from "../components/Layout"
import Container, { Col } from "../components/Container"
import withLocation from "../utils/withLocation"
import siteContent from "../staticQueries/siteContent"
import formattingOptions from "../utils/formattingOptions"
import assets from "../staticQueries/assets"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import ActiveTrackProvider from "../contexts/ActiveTrackContext"

type Props = {
  location: {
    search: string
  }
}

const IndexPage: React.FC<Props> = () => {
  const content = siteContent()
  const aboutBody = JSON.parse(content.about.body)
  const aboutAssets = assets()
  return (
    <StyledLayout page="about-and-contact">
      <Container>
        <Col tw="w-1/3 pt-16">
          <h2 tw="text-5xl text-hippie-blue leading-tight">{content.about.heading}</h2>
        </Col>
        <Col tw="w-2/3 flex flex-wrap pt-6 md:pt-16">
          <div tw="w-full md:w-2/3 pt-12 md:pt-0 md:pl-24">
            <ActiveTrackProvider>
              {documentToReactComponents(aboutBody, formattingOptions(aboutAssets))}
            </ActiveTrackProvider>
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
    height: 800px;
  }
  p {
    ${tw`text-base leading-relaxed`}
  }
  h3 {
    ${tw`text-xl py-8 font-normal`}
  }
`
export default withLocation(IndexPage)
