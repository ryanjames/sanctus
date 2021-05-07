import React from "react"
import { graphql } from "gatsby"
import Container, { Col } from "../components/Container"
import Layout from "../components/Layout"
import Video from "../components/Video"
import styled from "@emotion/styled"
import ActiveTrackProvider from "../contexts/ActiveTrackContext"
import PageLink from "../components/PageLink"
import tw from "twin.macro"
import { getCaseStudy } from "../models/case-study"
import Img, { FluidObject } from "gatsby-image"
import { Helmet } from "react-helmet"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import formattingOptions from "../utils/formattingOptions"
import assets from "../staticQueries/assets"

/*
import { renderRichText } from "gatsby-source-contentful/rich-text"

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

*/

type Props = {
  data: {
    caseStudy: {
      edges: string[]
    }
  }
  search?: {
    play: string
  }
}

const CaseStudyPage: React.FC<Props> = ({ data }) => {
  const caseStudy = getCaseStudy(data.caseStudy.edges[0])
  const caseStudyAssets = assets()

  const content = JSON.parse(caseStudy.body)

  return (
    <StyledLayout>
      <Helmet>
        <script src="https://unpkg.com/wavesurfer.js"></script>
      </Helmet>
      {caseStudy.video ? (
        <div tw="lg:-mt-32 relative z-10">
          <Video autoplay={false} src={caseStudy.video} poster={caseStudy.image} color={caseStudy.color} />
        </div>
      ) : (
        <div
          tw="lg:-mt-32 mb-24 h-40vh relative z-10 bg-cover bg-center"
          style={{
            backgroundImage: `url(${caseStudy.image.src})`,
          }}
        />
      )}
      <Container className="caseStudy-content" tw="pb-32">
        <Col tw="md:w-1/4 flex flex-wrap md:block pb-12 md:pb-0 text-gray-500">
          <div tw="sm:w-1/2 md:w-full pr-8">
            <label tw="text-xs pt-9 uppercase tracking-widest mb-4">Client</label>
            <p>{caseStudy.client}</p>
          </div>
          <div tw="sm:w-1/2 md:w-full pr-8">
            <label tw="text-xs pt-9 uppercase tracking-widest mb-4">Studio</label>
            <p>{caseStudy.studio}</p>
          </div>
          <div tw="sm:w-1/2 md:w-full pr-8">
            <label tw="text-xs pt-9 uppercase tracking-widest mb-4">Role</label>
            <p>{caseStudy.role}</p>
          </div>
          <div tw="sm:w-1/2 md:w-full pr-8">
            <label tw="text-xs pt-9 uppercase tracking-widest mb-4">Category</label>
            <p>
              <PageLink tw="text-gray-500 hover:text-white" to={`/work/?category=${caseStudy.category.slug}`}>
                {caseStudy.category.title}
              </PageLink>
            </p>
          </div>
        </Col>
        <Col tw="md:w-3/4">
          <h1 tw="text-3xl font-normal mb-12">{caseStudy.title}</h1>
          <div className="description" tw="pb-12">
            <ActiveTrackProvider>
              {documentToReactComponents(content, formattingOptions(caseStudyAssets))}
            </ActiveTrackProvider>
          </div>
        </Col>
      </Container>
    </StyledLayout>
  )
}

const StyledLayout = styled(Layout)`
  ${tw``}
  .client-badge svg path {
    fill: #111;
  }
  .video-gradient {
    background: linear-gradient(rgba(28, 30, 40, 0.8), rgba(28, 30, 40, 0));
  }
  .caseStudy-content {
    .description {
      p {
        ${tw`text-base leading-relaxed`}
      }
      h3 {
        ${tw`text-xl py-8 font-normal`}
      }
    }
  }
`
export default CaseStudyPage

export const pageQuery = graphql`
  query CaseStudyQuery($id: String!) {
    caseStudy: allContentfulCaseStudy(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          title
          client
          studio
          role
          overlayColor
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 2400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          videoUrl
          category {
            title
            slug
          }
          body {
            raw
          }
          slug
        }
      }
    }
  }
`
