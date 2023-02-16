import React from "react"
import slugify from "slugify"
import { graphql } from "gatsby"
import Container, { Col } from "../components/Container"
import RelatedCaseStudies from "../components/RelatedCaseStudies"
import DetailedCredits from "../components/DetailedCredits"
import { ISection, getSections } from "../models/section"
import Section from "../components/Section"
import Layout from "../components/Layout"
import Video from "../components/Video"
import styled from "@emotion/styled"
import ActiveTrackProvider from "../contexts/ActiveTrackContext"
import PageLink from "../components/PageLink"
import tw from "twin.macro"
import ICaseStudy from "../models/case-study"
import { Helmet } from "react-helmet"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import formattingOptions from "../utils/formattingOptions"
import assets from "../staticQueries/assets"

const CaseStudyPage: React.FC<ICaseStudy> = ({ data }) => {
  const caseStudyAssets = assets()

  const content = data.caseStudy.nodes[0]
  const sections = content.sections ? getSections(content.sections) : []

  console.log(content.image)
  return (
    <ActiveTrackProvider>
      <StyledLayout title={`Case Study: ${content.title}`}>
        <Helmet>
          <script src="https://unpkg.com/wavesurfer.js"></script>
        </Helmet>
        {content.videoUrl ? (
          <div tw="lg:-mt-32 relative z-10">
            <Video
              nativeControls={false}
              autoplay={false}
              src={content.videoUrl}
              poster={content.image.localFile.childImageSharp.fluid}
              color={content.overlayColor}
            />
          </div>
        ) : (
          <div
            tw="lg:-mt-32 mb-24 h-70vh relative z-10 bg-cover bg-center"
            style={{
              backgroundImage: `url(${content.image.localFile.childImageSharp.fluid.src})`,
            }}
          />
        )}
        <Container className="caseStudy-content" style={content.sections ? {} : { paddingBottom: "8rem" }}>
          <Col tw="md:w-1/4 flex flex-wrap md:block pb-12 md:pb-0 text-gray-500">
            {content.client && (
              <div tw="sm:w-1/2 md:w-full pr-8">
                <label tw="text-xs pt-9 uppercase tracking-widest mb-4">Client</label>
                <p>{content.client}</p>
              </div>
            )}
            {content.credit && (
              <div tw="sm:w-1/2 md:w-full pr-8">
                <label tw="text-xs pt-9 uppercase tracking-widest mb-4">{content.creditLabel ?? "Studio"}</label>
                <p>{content.credit}</p>
              </div>
            )}
            {content.credit2 && (
              <div tw="sm:w-1/2 md:w-full pr-8">
                <label tw="text-xs pt-9 uppercase tracking-widest mb-4">{content.credit2Label ?? "Studio"}</label>
                <p>{content.credit2}</p>
              </div>
            )}
            <div tw="sm:w-1/2 md:w-full pr-8">
              <label tw="text-xs pt-9 uppercase tracking-widest mb-4">Role</label>
              <p>{content.role}</p>
            </div>
            {content.category?.map((item) => {
              <div tw="sm:w-1/2 md:w-full pr-8">
                <label tw="text-xs pt-9 uppercase tracking-widest mb-4">Category</label>
                <p>
                  <PageLink
                    tw="text-gray-500 hover:text-white"
                    to={`/work/?category=${item.slug}`}
                  >
                    {item.categoryName}
                  </PageLink>
                </p>
              </div>
            })}
          </Col>
          <Col tw="md:w-3/4">
            <h1 tw="text-3xl font-normal mb-12">{content.title}</h1>
            <div className="description" tw="pb-12">
                {documentToReactComponents(JSON.parse(content.body.raw), formattingOptions(caseStudyAssets))}
            </div>
          </Col>
        </Container>
        {content.sections && sections.map((section: ISection, i: number) => <Section key={i} {...section} />)}
        {((content.detailedCredits1Title && content.detailedCredits1Body) 
          ||
          (content.detailedCredits2Title && content.detailedCredits2Body)) && (
          <Container>
            <Col tw="md:flex pt-24">
              {content.detailedCredits1Title && content.detailedCredits1Body && (
                <DetailedCredits heading={content.detailedCredits1Title} body={content.detailedCredits1Body.raw} />
              )}
              {content.detailedCredits2Title && content.detailedCredits2Body && (
                <DetailedCredits heading={content.detailedCredits2Title} body={content.detailedCredits2Body.raw} />
              )}
            </Col>
          </Container>
        )}
        {content.relatedStudies && (
          <RelatedCaseStudies heading="Related Case Studies" studies={content.relatedStudies} />
        )}
      </StyledLayout>
    </ActiveTrackProvider>
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
      nodes {
        id
        title
        client
        credit
        creditLabel
        credit2
        credit2Label
        role
        overlayColor
        category {
          slug
          categoryName
        }
        relatedStudies {
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 2400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          slug
          title
        }
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
        sections {
          body {
            raw
          }
          title
          buttonText
          link
          mediaControls
          mediaUrl
          mediaAsset {
            id
            title
            localFile {
              publicURL
            }
            file {
              contentType
              fileName
            }
          }
          stacked
        }
        detailedCredits1Title
        detailedCredits2Body { raw }
        detailedCredits2Title
        detailedCredits1Body { raw }
      }
    }
  }
`
