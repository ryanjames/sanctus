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
  const content = siteContent().pages["About"]
  const body = JSON.parse(content.body)
  return (
    <StyledLayout title="About" page="about" description={content.description}>
      <Container>
        <Col tw="md:w-1/3 pt-16">
          <h2 tw="text-5xl text-hippie-blue leading-tight">{content.heading}</h2>
        </Col>
        <Col tw="md:w-2/3 flex flex-wrap pt-6 md:pt-16">
          <div tw="w-full md:w-2/3 pt-12 md:pt-0 md:pl-24 relative pb-32">
            <ActiveTrackProvider>{documentToReactComponents(body, formattingOptions(assets()))}</ActiveTrackProvider>
          </div>
        </Col>
      </Container>
    </StyledLayout>
  )
}

const StyledLayout = styled(Layout)`
  iframe {
    width: 100%;
    height: 800px;
  }
  img {
    @media (min-width: 960px) {
      position: absolute;
      transform: translateX(-100%) translateX(-40px);
      margin-top: 6px;
      width: calc(100vw / 2);
      max-width: none;
      max-width: 700px;
    }
  }
  p {
    ${tw`text-base leading-relaxed`}
  }
  hr {
    ${tw`border-0 border-t border-solid border-gray-500 mt-12 mb-12`}
  }
  h3 {
    ${tw`text-xl py-8 font-normal`}
  }
`
export default withLocation(IndexPage)
