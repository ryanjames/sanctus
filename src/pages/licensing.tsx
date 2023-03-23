import React from "react"
// import PageLink from "../components/PageLink"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Layout from "../components/Layout"
import Container, { Col } from "../components/Container"
import LicensingForm from "../components/LicensingForm"
import siteContent from "../staticQueries/siteContent"
import formattingOptions from "../utils/formattingOptions"
import assets from "../staticQueries/assets"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import PageLink from "../components/PageLink"
import ActiveTrackProvider from "../contexts/ActiveTrackContext"

const IndexPage: React.FC = () => {
  const content = siteContent().pages["Licensing"]
  const body = content.body?.raw ? JSON.parse(content.body.raw) : undefined
  const subheading = content.subheading?.raw ? JSON.parse(content.subheading.raw) : undefined

  const queryParameters =  typeof window !== "undefined" ?  new URLSearchParams(window.location.search) : undefined
  const thanks = queryParameters && queryParameters.get("thanks")

  return (
    <StyledLayout title="Licensing" page="licensing" description={content.seoDescription}>
      <Container>
        {thanks ? (
          <Col tw="flex justify-center items-center flex-col w-full" className="thanks">
            <h2 tw="text-5xl text-hippie-blue leading-tight">{content.heading}</h2>
            <h3>Thanks for getting in touch. We'll get back to you shortly.</h3>
            <PageLink to="/contact">
              <button tw="cursor-pointer" type="submit">
                Back to form
              </button>
            </PageLink>
          </Col>
        ) : (
          <>
            <Col tw="md:w-1/3 pt-16">
              <h2 tw="text-5xl text-hippie-blue leading-tight">{content.heading}</h2>
            </Col>
            <Col tw="md:w-2/3 flex flex-wrap pt-6 md:pt-16">
              <div tw="w-full md:w-2/3 pt-2 md:pl-24 relative">
                <h2 tw="text-2xl">
                  {documentToReactComponents(subheading, formattingOptions(assets()))}
                </h2>
                {body && (
                  <ActiveTrackProvider>{documentToReactComponents(body, formattingOptions(assets()))}</ActiveTrackProvider>
                )}
                <LicensingForm />
              </div>
            </Col>
          </>
        )}
      </Container>
    </StyledLayout>
  )
}

const StyledLayout = styled(Layout)`
  iframe {
    width: 100%;
    height: 800px;
  }
  .thanks {
    min-height: calc(100vh - 340px);
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
  button {
    background: #679CB2;
    border-radius: 6px;
    appearance: none;
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 8px 24px;
  }
  p {
    ${tw`text-base leading-relaxed`}
  }
  h3 {
    ${tw`text-xl py-8 font-normal`}
  }
`
export default IndexPage
