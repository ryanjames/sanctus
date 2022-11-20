import React from "react"
import slugify from "slugify"
import { graphql } from "gatsby"
import Container, { Col } from "../components/Container"
import Layout from "../components/Layout"
import Video from "../components/Video"
import styled from "@emotion/styled"
import ActiveTrackProvider from "../contexts/ActiveTrackContext"
import caseStudyCategories, { CaseStudyCategoryShape } from "../staticQueries/caseStudyCategories"
import PageLink from "../components/PageLink"
import tw from "twin.macro"
import { getCaseStudy } from "../models/case-study"
import { Helmet } from "react-helmet"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import formattingOptions from "../utils/formattingOptions"
import assets from "../staticQueries/assets"

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

  let caseStudyCategory = ""
  caseStudyCategories().forEach((category: CaseStudyCategoryShape) => {
    if (category.caseStudies.some(i => i.id.includes(caseStudy.id))) {
      caseStudyCategory = category.categoryName
    }
  })

  console.log(caseStudy)

  return (
    <StyledLayout title={`Case Study: ${caseStudy.title}`}>
      <Helmet>
        <script src="https://unpkg.com/wavesurfer.js"></script>
      </Helmet>
      {caseStudy.video ? (
        <div tw="lg:-mt-32 relative z-10">
          <Video
            nativeControls={true}
            autoplay={false}
            src={caseStudy.video}
            poster={caseStudy.image}
            color={caseStudy.color}
          />
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
          {caseStudy.client && (
            <div tw="sm:w-1/2 md:w-full pr-8">
              <label tw="text-xs pt-9 uppercase tracking-widest mb-4">Client</label>
              <p>{caseStudy.client}</p>
            </div>
          )}
          {caseStudy.credit && (
            <div tw="sm:w-1/2 md:w-full pr-8">
              <label tw="text-xs pt-9 uppercase tracking-widest mb-4">{caseStudy.creditLabel ?? "Studio"}</label>
              <p>{caseStudy.credit}</p>
            </div>
          )}
          {caseStudy.credit2 && (
            <div tw="sm:w-1/2 md:w-full pr-8">
              <label tw="text-xs pt-9 uppercase tracking-widest mb-4">{caseStudy.credit2Label ?? "Studio"}</label>
              <p>{caseStudy.credit2}</p>
            </div>
          )}
          <div tw="sm:w-1/2 md:w-full pr-8">
            <label tw="text-xs pt-9 uppercase tracking-widest mb-4">Role</label>
            <p>{caseStudy.role}</p>
          </div>
          {caseStudyCategory !== "" && (
            <div tw="sm:w-1/2 md:w-full pr-8">
              <label tw="text-xs pt-9 uppercase tracking-widest mb-4">Category</label>
              <p>
                <PageLink
                  tw="text-gray-500 hover:text-white"
                  to={`/work/?category=${slugify(caseStudyCategory, { lower: true, strict: true })}`}
                >
                  {caseStudyCategory}
                </PageLink>
              </p>
            </div>
          )}
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
      hr {
        ${tw`border-0 border-t border-solid border-gray-500 mt-12 mb-12`}
      }
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
          credit
          creditLabel
          credit2
          credit2Label
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
          body {
            raw
          }
          slug
        }
      }
    }
  }
`
