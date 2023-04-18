import React from "react"
// import PageLink from "../components/PageLink"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Layout from "../components/Layout"
import Container, { Col } from "../components/Container"
import withLocation from "../utils/withLocation"
import siteContent from "../staticQueries/siteContent"
import formattingOptions from "../utils/formattingOptions"
import Cta from "../components/Cta"
import Img, { FluidObject } from "gatsby-image"
import assets from "../staticQueries/assets"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import ActiveTrackProvider from "../contexts/ActiveTrackContext"

type Props = {
  location: {
    search: string
  }
  data: {
    home: {
      edges: any
    }
  }
}

const AboutPage: React.FC<Props> = ({ data }) => {
  const content = siteContent().pages["About"]
  const demoReelPoster = data.home.edges[0].node.demoReelPoster.localFile.childImageSharp.fluid
  const body = content.body?.raw ? JSON.parse(content.body.raw) : undefined
  const subheading = content.subheading?.raw ? JSON.parse(content.subheading.raw) : undefined
  return (
    <StyledLayout title="About" page="about" description={content.seoDescription}>
      <Container tw="pb-12">
        <Col tw="md:w-1/3 pt-16">
          <h2 tw="text-5xl text-hippie-blue leading-tight">{content.heading}</h2>
        </Col>
        <Col tw="md:w-2/3 flex flex-wrap pt-6 md:pt-16">
          <div tw="w-full md:w-2/3 pt-12 md:pt-0 md:pl-24 relative pb-12">
            {documentToReactComponents(subheading, formattingOptions(assets()))}
          </div>
        </Col>
        {body && (
          <Col>
            <ActiveTrackProvider>{documentToReactComponents(body, formattingOptions(assets()))}</ActiveTrackProvider>
          </Col>
        )}
        {content.collage && (
          <Col>
            <StyledCollage data-count={content.collage.length % 2 == 0 ? "even" : "odd"}>
              {content.collage.map((image, i) => {
                return <img src={image.localFile.publicURL} />
              })}
            </StyledCollage>
          </Col>
        )}
      </Container>
      <Cta heading="Let’s Collaborate" background={demoReelPoster} button={{ link: "/contact", label: "Contact Us" }} />
    </StyledLayout>
  )
}

const StyledCollage = styled.div`
  display: flex;
  flex-wrap: wrap;
  img {
    margin-bottom: 0;
    width: 100%;
    height: auto;
  }
  @media (min-width: 640px) {
    img {
      width: 50%;
    }
    &[data-count="odd"] {
      img:first-child {
        width: 100%;
      }
    }
  }
`

const StyledLayout = styled(Layout)`
  p {
    ${tw`text-base leading-relaxed`}
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    li {
      margin: 0;
    }
  }
  hr {
    ${tw`border-0 border-t border-solid border-gray-500 mt-12 mb-12`}
  }
  h3 {
    ${tw`text-2xl py-4 font-normal`}
  }
`
export default withLocation(AboutPage)

export const pageQuery = graphql`
  query AboutQuery {
    home: allContentfulHomePage {
      edges {
        node {
          demoReelPoster {
            localFile {
              childImageSharp {
                fluid(maxWidth: 2400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`